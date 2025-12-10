import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticle } from '../api/client';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(id).then(setArticle);
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="app-root">
      <div className="app-shell">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="article-detail-title">{article.title}</h1>
        <p className="article-detail-date">{new Date(article.created_at).toLocaleString()}</p>
        <div className="article-detail-body">{article.content}</div>
      </div>
    </div>
  );
}
