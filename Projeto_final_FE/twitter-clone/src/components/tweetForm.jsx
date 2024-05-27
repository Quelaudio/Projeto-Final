// TweetForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './tweetForm.css';

const TweetForm = () => {
    const [text, setText] = useState('');
    const [imgPath, setImgPath] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage
        if (!user_id) {
            alert('Please log in to post a tweet');
            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post('http://localhost:3000/tweets', {
                user_id, 
                text,
                img_path: imgPath,
                
            });
            alert('Tweet posted successfully');
            setText('');
            setImgPath('');
           
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
                <button type="submit">Post Tweet</button>
            </form>
        </div>
    );
};

export default TweetForm;
