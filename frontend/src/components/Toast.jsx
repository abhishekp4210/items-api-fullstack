import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

function Toast({ message, type = 'success', onClose }) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={18} className="toast-icon-error" />;
      case 'info':
        return <Info size={18} className="toast-icon-info" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} className="toast-icon-success" />;
    }
  };

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss notification">
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
