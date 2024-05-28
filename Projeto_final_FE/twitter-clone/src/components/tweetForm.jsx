/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import './css/tweetForm.css';

const TweetForm = () => {
    const [text, setText] = useState('');
    const [imgFile, setImgFile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user_id = localStorage.getItem('user_id'); 
        // if (!user_id) {
        //     alert('Please log in to post a tweet');
        //     return;
        // }

        // Verificar se o texto não está vazio
        if (text.trim() === '') {
            alert('Tweet text cannot be empty');
            return;
        }

        console.log('User ID:', user_id); // Verificação do user_id
        console.log('Tweet Text:', text); // Verificação do texto
        console.log('Selected Image:', imgFile); // Verificação do arquivo de imagem

        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('text', text);
        if (imgFile) {
            formData.append('img', imgFile);
        }

        console.log(JSON.stringify(formData));

        try {
            const response = await axios.post('http://localhost:3000/tweets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data); // Verificação da resposta do servidor
            alert('Tweet posted successfully');
            setText('');
            setImgFile('');
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
                        placeholder="What's happening?"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="files">Select an image</label>
                    <input
                        id="files"
                        type="file"
                        onChange={(e) => setImgFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">Post Tweet</button>
            </form>
        </div>
    );
};

export default TweetForm;
