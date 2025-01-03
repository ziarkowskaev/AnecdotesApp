import React, { useEffect } from 'react';
import { useNotificationDispatch, useNotificationValue } from "../NotificationContex";
const Notification = () => {

  const notificationStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    marginBottom: '10px',
    border: '1px solid',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', 
    backgroundColor: '#28a745',
  };
  
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();
  
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  }, [notification, dispatch]);

  if(notification && notification.message){

    return (
      <div style={notificationStyle}>
        {notification.message}
      </div>
    )
  }
  
}

export default Notification
