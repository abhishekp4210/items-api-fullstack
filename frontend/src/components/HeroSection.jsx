import { Database, ArrowDown } from 'lucide-react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-badge">
          <Database size={14} />
          <span>Serverless · AWS Lambda · DynamoDB</span>
        </div>
        <h1 className="hero-title">
          Store & Retrieve
          <br />
          <span className="hero-gradient">JSON Documents</span>
        </h1>
        <p className="hero-subtitle">
          A production-grade REST API powered by AWS. Create items with POST, fetch them with GET.
          Zero servers to manage. Scales to millions.
        </p>
        <div className="hero-actions">
          <a href="#dashboard" className="hero-btn hero-btn-primary">
            Open Dashboard
            <ArrowDown size={16} />
          </a>
          <a
            href="https://c9v6vv37jd.execute-api.ap-south-1.amazonaws.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            <span className="hero-code">GET</span>
            /items/&#123;id&#125;
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">~50ms</span>
            <span className="stat-label">Avg Latency</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Auto-Scale</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">$0</span>
            <span className="stat-label">At Idle</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
