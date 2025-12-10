import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleListPage from './pages/ArticleListPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import './index.css'; // make sure this line exists

function App() {
  return (
    <div className="app-root">
      <div className="app-shell">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ArticleListPage />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
