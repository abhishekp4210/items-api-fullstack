import { Heart, ExternalLink, Terminal, Shield, Zap } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Zap size={18} className="footer-logo-icon" />
              <span className="footer-title">Items API</span>
            </div>
            <p className="footer-desc">
              High-throughput, low-latency serverless REST API engineered with AWS Lambda, DynamoDB on demand, and React frontend.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Architecture</h4>
            <ul className="footer-links">
              <li><span className="tech-tag">AWS Lambda</span> Python 3.12 (ARM64)</li>
              <li><span className="tech-tag">Amazon DynamoDB</span> Pay-Per-Request</li>
              <li><span className="tech-tag">HTTP API Gateway</span> Payload v2.0</li>
              <li><span className="tech-tag">AWS SAM</span> Infrastructure as Code</li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Live Endpoints</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://c9v6vv37jd.execute-api.ap-south-1.amazonaws.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Root Endpoint <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <span className="endpoint-code">POST /items</span>
              </li>
              <li>
                <span className="endpoint-code">GET /items/&#123;id&#125;</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            Crafted with modern UI/UX Pro Max design standards. Fast, responsive, serverless.
          </p>
          <div className="footer-meta">
            <span className="region-badge">
              <span className="region-dot" /> ap-south-1 (Mumbai)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
