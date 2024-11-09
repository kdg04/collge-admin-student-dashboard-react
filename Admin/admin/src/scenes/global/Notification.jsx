import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notification.css';

const Notification = () => {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8187/College/newmessagestatus');
      setHasUnreadMessages(response.data.newMsg);
    } catch (error) {
      console.error('Error fetching unread status:', error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();  // fetch once initially
    const intervalId = setInterval(fetchUnreadMessages, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div >
      {hasUnreadMessages && <span className="red-dot"></span>}
    </div>
  );
};

export default Notification;
