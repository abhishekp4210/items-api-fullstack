import { useState } from 'react';
import { Search, Loader2, Copy, Check, ExternalLink } from 'lucide-react';
import { getItem } from '../api';
import './FetchItemPanel.css';

function FetchItemPanel({ onItemFetched, onError }) {
  const [itemId, setItemId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!itemId.trim()) {
      onError('Please enter an Item ID');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const item = await getItem(itemId.trim());
      setResult(item);
      onItemFetched(item);
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="panel fetch-panel">
      <div className="panel-header">
        <div className="panel-icon fetch-icon">
          <Search size={18} />
        </div>
        <div>
          <h2 className="panel-title">Fetch Item</h2>
          <p className="panel-subtitle">
            <span className="method-badge get">GET</span>
            /items/&#123;id&#125;
          </p>
        </div>
      </div>

      <div className="panel-body">
        <form onSubmit={handleFetch} className="fetch-form">
          <div className="input-group">
            <label htmlFor="item-id-input" className="input-label">Item ID</label>
            <div className="id-input-wrapper">
              <input
                id="item-id-input"
                type="text"
                className="id-input"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="e.g. d049ce5d-ceb0-485b-..."
                spellCheck={false}
              />
              <button type="submit" className="fetch-btn" disabled={loading}>
                {loading ? <Loader2 size={18} className="spinner" /> : <Search size={18} />}
              </button>
            </div>
          </div>
        </form>

        {result && (
          <div className="result-block">
            <div className="result-header">
              <span className="result-status">200 OK</span>
              <div className="result-actions">
                <button className="icon-btn" onClick={copyToClipboard} title="Copy JSON">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <a
                  href={`https://c9v6vv37jd.execute-api.ap-south-1.amazonaws.com/items/${result.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  title="Open in browser"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <pre className="result-json">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchItemPanel;
