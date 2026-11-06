"""Items API: POST /items stores a JSON document, GET /items/{id} fetches it.

Runs behind an API Gateway HTTP API (payload format 2.0) and stores data in DynamoDB.
"""
import json
import logging
import os
import uuid
from datetime import datetime, timezone
from decimal import Decimal

import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(os.environ.get("LOG_LEVEL", "INFO"))

# Created outside the handler so warm invocations reuse the connection.
TABLE_NAME = os.environ["TABLE_NAME"]
table = boto3.resource("dynamodb").Table(TABLE_NAME)

MAX_BODY_BYTES = 100_000


class _DecimalEncoder(json.JSONEncoder):
    """DynamoDB returns numbers as Decimal, which json can't serialise by default."""

    def default(self, o):
        if isinstance(o, Decimal):
            return int(o) if o % 1 == 0 else float(o)
        return super().default(o)


def _response(status, body):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body, cls=_DecimalEncoder),
    }


def _create_item(event):
    raw = event.get("body") or ""
    if len(raw.encode("utf-8")) > MAX_BODY_BYTES:
        return _response(413, {"error": "Payload too large"})
    try:
        payload = json.loads(raw, parse_float=Decimal)
    except json.JSONDecodeError:
        return _response(400, {"error": "Body must be valid JSON"})
    if not isinstance(payload, dict) or not payload:
        return _response(400, {"error": "Body must be a non-empty JSON object"})

    item = {
        "id": str(uuid.uuid4()),
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "data": payload,
    }
    table.put_item(Item=item)
    logger.info("Created item %s", item["id"])
    return _response(201, item)


def _get_item(event):
    item_id = (event.get("pathParameters") or {}).get("id")
    if not item_id:
        return _response(400, {"error": "Missing item id"})
    result = table.get_item(Key={"id": item_id})
    item = result.get("Item")
    if not item:
        return _response(404, {"error": "Item not found"})
    return _response(200, item)


def lambda_handler(event, context):
    route = event.get("routeKey", "")
    logger.info("Request %s (request id %s)", route, context.aws_request_id)
    try:
        if route == "POST /items":
            return _create_item(event)
        if route == "GET /items/{id}":
            return _get_item(event)
        return _response(404, {"error": "Route not found"})
    except ClientError:
        logger.exception("DynamoDB call failed")
        return _response(502, {"error": "Storage error, please retry"})
    except Exception:
        logger.exception("Unhandled error")
        return _response(500, {"error": "Internal server error"})
