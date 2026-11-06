import { Zap } from 'lucide-react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="header-logo" aria-label="Items API Home">
          <div className="logo-icon">
            <Zap size={20} />
          </div>
          <span className="logo-text">Items<span className="logo-accent">API</span></span>
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          <a href="#dashboard" className="nav-link">Dashboard</a>
          <a href="#recent" className="nav-link">Recent Items</a>
          <div className="nav-divider" />
          <a
            href="https://c9v6vv37jd.execute-api.ap-south-1.amazonaws.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-badge"
          >
            <span className="status-dot" />
            Live
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
