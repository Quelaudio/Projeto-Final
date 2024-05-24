// src/components/TweetList.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tweet from './tweet';

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await axios.get('http://localhost:5000/tweets');
      setTweets(response.data);
    };

    fetchTweets();
  }, []);

  return (
    <div className="tweet-list">
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
