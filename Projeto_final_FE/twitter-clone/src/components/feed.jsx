/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";



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

  return (
    <div>
      <h2>Feed</h2>
      <ul>
        {feed.map(tweets => (
          <li key={tweets.tweet_id}>{tweets.text} </li>
         
        ))}
      </ul>
    </div>
  );
};

export default Feed;
