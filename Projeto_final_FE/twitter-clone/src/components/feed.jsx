import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/feed.css'; 

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/tweets')
      .then(response => {
        setFeed(response.data);
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
      });
  }, []);

  const handleLike = (tweetId) => {
    axios.post('http://localhost:3000/like', { tweetId })
      .then(response => {
        setFeed(prevFeed => {
          return prevFeed.map(tweet => {
            if (tweet.tweet_id === tweetId) {
              return { ...tweet, liked: true }; // Supondo que você adicione uma propriedade "liked" ao tweet
            }
            return tweet;
          });
        });
      })
      .catch(error => {
        console.error('Error liking tweet:', error);
      });
  };

  return (
    <div className="feed-container">
      <h2>Feed</h2>
      <ul className="caixa">
        {feed.map(tweet => (
          <li key={tweet.tweet_id}>
            <p>{tweet.text}</p>
            <div className="tweet-meta">
              {!tweet.liked && <button onClick={() => handleLike(tweet.tweet_id)}>Like</button>}
              <span>{tweet.createdAt}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
