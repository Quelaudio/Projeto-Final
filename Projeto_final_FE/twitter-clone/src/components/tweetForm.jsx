// TweetForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './tweetForm.css';

const TweetForm = () => {
    const [text, setText] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [datePub, setDatePub] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage
        if (!user_id) {
            alert('Please log in to post a tweet');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/tweets', {
                UserUserid: user_id, // Include the user ID in the request payload
                text,
                img_path: imgPath,
                date_pub: datePub
            });
            alert('Tweet posted successfully');
            setText(''); // Clear the input fields after successful submission
            setImgPath('');
            setDatePub('');
        } catch (error) {
            console.error('Error posting tweet', error);
            alert('Error posting tweet');
        }
    };

    return (
        <div className="tweetform-container">
            <h2>Post a Tweet</h2>
            <form className="tweetform" onSubmit={handleSubmit}>
                <div>
                    <label>Tweet</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image Path</label>
                    <input
                        type="text"
                        value={imgPath}
                        onChange={(e) => setImgPath(e.target.value)}
                    />
                </div>
                <div>
                    <label>Publication Date</label>
                    <input
                        type="date"
                        value={datePub}
                        onChange={(e) => setDatePub(e.target.value)}
                    />
                </div>
                <button type="submit">Post Tweet</button>
            </form>
        </div>
    );
};

export default TweetForm;
