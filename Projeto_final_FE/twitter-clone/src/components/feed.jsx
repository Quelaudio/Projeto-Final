import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/feed.css';
import Sidebar from './sideBar';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    axios.get('http://localhost:3000/tweets')
      .then(response => {
        setFeed(response.data);
        response.data.forEach(tweet => {
          fetchComments(tweet.tweet_id);
        });
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
      });
  }, []);

  const fetchComments = (tweet_id) => {
    axios.get(`http://localhost:3000/comments/${tweet_id}`)
      .then(response => {
        setComments(prevComments => ({
          ...prevComments,
          [tweet_id]: response.data
          
        }));
        
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleLike = (tweetId) => {
    axios.post('http://localhost:3000/likes', { tweet_id: tweetId, user_id: userId })
      .then(response => {
        setFeed(prevFeed => {
          return prevFeed.map(tweet => {
            if (tweet.tweet_id === tweetId) {
              return { ...tweet, liked: true };
            }
            return tweet;
          });
        });
      })
      .catch(error => {
        console.error('Error liking tweet:', error);
      });
  };

  const handleCommentChange = (tweetId, text) => {
    setNewComment(prev => ({ ...prev, [tweetId]: text }));
  };

  const handleCommentSubmit = (tweetId) => {
    const text = newComment[tweetId];
    axios.post('http://localhost:3000/comments', { user_id: userId, text, Date_comment: new Date(), tweet_id: tweetId })
      .then(response => {
        setComments(prevComments => ({
          ...prevComments,
          [tweetId]: [...(prevComments[tweetId] || []), response.data]
        }));
        setNewComment(prev => ({ ...prev, [tweetId]: '' }));
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className="feed-page">
      <div className="feed-container">
        <h2>Your Feed</h2>
        <ul className="caixa">
          {feed.map(tweet => (
            <React.Fragment key={tweet.tweet_id}>
              <li>
                <p>{tweet.text}</p>
                <div className="tweet-meta">
                  {!tweet.liked && <button className="botao_like" onClick={() => handleLike(tweet.tweet_id)}>Like</button>}
                  <span>{tweet.createdAt}</span>
                </div>
              </li>
              <div className="comments-section">
                <ul>
                  {(comments[tweet.tweet_id] || []).map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={newComment[tweet.tweet_id] || ''}
                  onChange={(e) => handleCommentChange(tweet.tweet_id, e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(tweet.tweet_id)}>Comment</button>
              </div>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feed;
