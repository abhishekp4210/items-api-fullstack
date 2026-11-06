import { Clock, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './RecentItems.css';

function RecentItems({ items }) {
  const [copiedId, setCopiedId] = useState(null);

  const copyId = async (id) => {
    await navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (items.length === 0) {
    return (
      <section className="recent-section" id="recent">
        <div className="recent-header">
          <Clock size={20} />
          <h2 className="recent-title">Recent Items</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">
            <Clock size={32} />
          </div>
          <p className="empty-text">No items yet</p>
          <p className="empty-subtext">Create or fetch an item above to see it here</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-section" id="recent">
      <div className="recent-header">
        <Clock size={20} />
        <h2 className="recent-title">Recent Items</h2>
        <span className="recent-count">{items.length}</span>
      </div>
      <div className="items-grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="item-card"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="item-card-header">
              <div className="item-id-row">
                <span className="item-id-label">ID</span>
                <code className="item-id">{item.id}</code>
                <button
                  className="copy-id-btn"
                  onClick={() => copyId(item.id)}
                  title="Copy ID"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
              <time className="item-time">
                {new Date(item.createdAt).toLocaleString()}
              </time>
            </div>
            <div className="item-card-body">
              <pre className="item-data">{JSON.stringify(item.data, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentItems;
