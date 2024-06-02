import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/sidebar.css'; 

const Sidebar = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {

        setFollowers(response.data);
        
console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching followers:', error);
      });
  }, []);

    const handleFollow = (followedId) => {
    const followerId = localStorage.getItem('user_id');
    const followDate = new Date();

    axios.post('http://localhost:3000/follow', {
      follower_id: followerId,
      followed_id: followedId,
      follow_date: followDate,
    })
    .then(response => {
      console.log('Followed successfully');
      alert('Followed successfully');
    })
    .catch(error => {
      console.error('Error following user:', error);
      alert('Followed Unsuccesfull');
    });
  };

  return (
    <div className="sidebar-container">
      <h3>People you might know!!</h3>
      <ul className="followers-list">
        {followers.map(user => (
          <li key={user.user_id} className="follower-item">
            <p className='utilizador'>{user.username}</p>
            <button className='botao' onClick={() => handleFollow(user.user_id)}>Follow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;