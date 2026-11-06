# Items API (Lambda + HTTP API + DynamoDB)

Items API is a full-stack project for creating and retrieving items. Its React frontend connects to a serverless AWS backend built with API Gateway, Python Lambda, and DynamoDB. Create an item to receive a generated ID, then use that ID to fetch it later.

**Live demo:** [Try Items API](https://staging.d10d1sfrty34cu.amplifyapp.com/)

```
.
├── template.yaml        # SAM template (function, table, API, log group, IAM)
├── src/app.py           # Lambda handler (Python 3.12)
└── events/              # sample payloads for sam local invoke
```

`POST /items` stores any JSON object and returns it with a generated `id`.
`GET /items/{id}` returns the stored item (404 if missing).

## Prerequisites

- AWS CLI v2 configured: `aws configure` (or `aws sso login`), then check with `aws sts get-caller-identity`
- AWS SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
- Docker (only needed for `sam build --use-container` and `sam local`)
- Python 3.12 locally (only if you build without a container)

## Deploy

```bash
sam validate --lint
sam build
sam deploy --guided      # first time: stack name e.g. items-api, region e.g. ap-south-1,
                         # accept defaults, say Y to save samconfig.toml
sam deploy               # every later deploy
```

The deploy output prints `ApiUrl`. Get it again any time:

```bash
aws cloudformation describe-stacks --stack-name items-api \
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" --output text
```

## Test the deployed API

```bash
API=<ApiUrl from the outputs>

# create
curl -s -X POST "$API/items" -H "Content-Type: application/json" \
  -d '{"name":"widget","price":19.99,"tags":["a","b"]}'

# fetch (use the id from the response above)
curl -s "$API/items/<id>"

# error cases
curl -s -X POST "$API/items" -d 'not json'        # 400
curl -s "$API/items/does-not-exist"                # 404
```

## Test locally

The handler needs a DynamoDB table. Simplest option is to point it at the deployed one.
Your AWS credentials are used inside the container.

```bash
echo '{"ItemsFunction":{"TABLE_NAME":"<TableName from outputs>","AWS_REGION":"ap-south-1"}}' > env.json

sam build
sam local invoke ItemsFunction -e events/post-item.json --env-vars env.json
# edit events/get-item.json with the returned id, then:
sam local invoke ItemsFunction -e events/get-item.json --env-vars env.json

# or run the whole API on localhost:3000
sam local start-api --env-vars env.json
curl -s -X POST localhost:3000/items -d '{"hello":"world"}'
```

## Logs and tail

```bash
sam logs --stack-name items-api --name ItemsFunction --tail
```

## Clean up

```bash
sam delete --stack-name items-api
```

## Notes

- IAM is limited to `PutItem` and `GetItem` on this one table.
- `arm64` is used because it's cheaper than x86 for the same performance. Remove the `Architectures` line if you build on a platform that can't target it.
- boto3 ships with the Lambda Python runtime, so there is no `requirements.txt`. Add `src/requirements.txt` if you bring in other libraries, and `sam build` will bundle them.
- The API is open to the internet. Before real use, add auth (a JWT authorizer or IAM auth on the HTTP API) and throttling.
