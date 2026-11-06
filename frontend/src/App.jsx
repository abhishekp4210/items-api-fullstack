import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CreateItemPanel from './components/CreateItemPanel';
import FetchItemPanel from './components/FetchItemPanel';
import RecentItems from './components/RecentItems';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

function App() {
  const [recentItems, setRecentItems] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleItemCreated = (item) => {
    setRecentItems((prev) => [item, ...prev].slice(0, 10));
    showToast(`Item created: ${item.id.slice(0, 8)}…`, 'success');
  };

  const handleItemFetched = (item) => {
    const exists = recentItems.some((r) => r.id === item.id);
    if (!exists) {
      setRecentItems((prev) => [item, ...prev].slice(0, 10));
    }
    showToast(`Item fetched: ${item.id.slice(0, 8)}…`, 'info');
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSection />
        <section className="panels-section" id="dashboard">
          <div className="panels-grid">
            <CreateItemPanel onItemCreated={handleItemCreated} onError={(msg) => showToast(msg, 'error')} />
            <FetchItemPanel onItemFetched={handleItemFetched} onError={(msg) => showToast(msg, 'error')} />
          </div>
        </section>
        <RecentItems items={recentItems} />
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
