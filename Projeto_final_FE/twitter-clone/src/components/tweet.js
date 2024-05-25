// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Tweet = () => {
//     const [tweets, setTweets] = useState([]);
//     const [content, setContent] = useState('');
//     const [userId, setUserId] = useState('');

//     useEffect(() => {
//         axios.get('/api/tweets')
//             .then(response => {
//                 setTweets(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the tweets!', error);
//             });
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('/api/tweets', { content, user_id: userId })
//             .then(response => {
//                 setTweets([...tweets, response.data]);
//                 setContent('');
//                 setUserId('');
//             })
//             .catch(error => {
//                 console.error('There was an error creating the tweet!', error);
//             });
//     };

//     return (
//         <div>
//             <h1>Tweets</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     placeholder="What's happening?"
//                     required
//                 />
//                 <input
//                     type="text"
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}
//                     placeholder="User ID"
//                     required
//                 />
//                 <button type="submit">Tweet
