import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, generateArticle } from '../api/client';

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchArticles().then(setArticles).finally(() => setLoading(false));
  }, []);

  const handleGenerate = async () => {
    setBusy(true);
    const created = await generateArticle('software engineering');
    setArticles((prev) => [created, ...prev]);
    setBusy(false);
  };

  if (loading) return <p>Loading...</p>;

  // In ArticleListPage.jsx
    return (
    <div className="app-root">
        <div className="app-shell">
        <header className="app-header">
            <h1 className="app-title">Blog Generator</h1>
            <button
            onClick={handleGenerate}
            disabled={busy}
            className="primary-btn"
            >
            {busy ? "Generating..." : "Generate Article"}
            </button>
        </header>

        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul className="article-list">
            {articles.map((a) => (
                <li key={a.id} className="article-item">
                <div className="article-row">
                    <Link to={`/articles/${a.id}`} className="article-link">
                    {a.title}
                    </Link>
                    <span className="article-date">
                    {a.created_at && new Date(a.created_at).toLocaleString()}
                    </span>
                </div>
                </li>
            ))}
            </ul>
        )}
        </div>
    </div>
    );
}
