import React, { useState } from 'react';
import axios from 'axios';
import './css/tweetForm.css';

const TweetForm = () => {
    const [text, setText] = useState('');
    const [imgFile, setImgFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id'); 
        if (!user_id) {
            alert('Please log in to post a tweet');
            return;
        }

        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('text', text);
        if (imgFile) {
            formData.append('img', imgFile);
        }

        try {
            const response = await axios.post('http://localhost:3000/tweets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Tweet posted successfully');
            setText('');
            setImgFile(null);
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
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="files">Select files</label>
                    <input
                        id="files"
                        type="file"
                        multiple={false}
                        onChange={(e) => setImgFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">Post Tweet</button>
            </form>
        </div>
    );
};

export default TweetForm;
