import { useState } from 'react';
import { Send, Plus, Loader2, Check } from 'lucide-react';
import { createItem } from '../api';
import './CreateItemPanel.css';

function CreateItemPanel({ onItemCreated, onError }) {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "My Widget",\n  "price": 29.99,\n  "tags": ["electronics", "new"]\n}');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const payload = JSON.parse(jsonInput);
      const item = await createItem(payload);
      onItemCreated(item);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      if (err instanceof SyntaxError) {
        onError('Invalid JSON — please check your syntax');
      } else {
        onError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
    } catch {
      onError('Cannot format — fix JSON syntax first');
    }
  };

  return (
    <div className="panel create-panel">
      <div className="panel-header">
        <div className="panel-icon create-icon">
          <Plus size={18} />
        </div>
        <div>
          <h2 className="panel-title">Create Item</h2>
          <p className="panel-subtitle">
            <span className="method-badge post">POST</span>
            /items
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="panel-body">
        <div className="input-group">
          <div className="input-label-row">
            <label htmlFor="json-input" className="input-label">JSON Payload</label>
            <button type="button" className="format-btn" onClick={formatJson}>
              Format
            </button>
          </div>
          <textarea
            id="json-input"
            className="json-textarea"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
            rows={8}
            placeholder='{ "key": "value" }'
          />
        </div>

        <button
          type="submit"
          className={`submit-btn ${success ? 'submit-btn-success' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner" />
              Sending…
            </>
          ) : success ? (
            <>
              <Check size={18} />
              Created!
            </>
          ) : (
            <>
              <Send size={18} />
              Create Item
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateItemPanel;
