import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';

function NewsFeed() {
  const [articles, setArticles] = useState([]); // To store news articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //API Key
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  //fetch Data
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      if (!apiKey) {
        setError("News API key is missing. Please check your .env configuration.");
        setLoading(false);
        return;
      }

      const apiUrl = `https://newsapi.org/v2/everything?q=nhs&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;


      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        if (response.data.status === 'ok') {
          setArticles(response.data.articles);
        } else {
          setError(response.data.message || 'Could not fetch news.');
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message || 'An error occurred while fetching news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

  }, [apiKey]);

  //Render
  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading news...</span>
        </Spinner>
        <p>Loading Health News...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error fetching news: {error}</Alert>;
  }

  if (articles.length === 0) {
    return <Alert variant="info">No health news articles found at the moment.</Alert>;
  }

  return (
    <div>
      {articles.map((article, index) => (
        <Card key={index} className="mb-3">
          {article.urlToImage && (
            <Card.Img variant="top" src={article.urlToImage} alt={article.title} style={{ maxHeight: '250px', objectFit: 'cover' }} />
          )}
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {article.source?.name} - {new Date(article.publishedAt).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>
              {article.description || 'No description available.'}
            </Card.Text>
            <Button variant="primary" href={article.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default NewsFeed;