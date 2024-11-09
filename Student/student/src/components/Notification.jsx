import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Notification.css';
import { UserIDContext } from '../App';

const Notification = () => {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const { userID } = useContext(UserIDContext);

  const fetchUnreadMessages = async () => {
    try {
      console.log("userId from context in notification in fetchUnreadMessages: " + userID);
      const response = await axios.get(`http://localhost:8187/College/newUserMsgStatus?userId=${userID}`);
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
  }, [userID]);

  return (
    <div >
      {hasUnreadMessages && <span className="red-dot"></span>}
    </div>
  );
};

export default Notification;
