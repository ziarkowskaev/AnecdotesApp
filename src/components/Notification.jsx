import React, { useEffect } from 'react';
import { useNotificationDispatch, useNotificationValue } from "../NotificationContex";
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();
  
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  }, [notification, dispatch]);

if(notification){
  return (
    <div style={notification}>
      {notification.message}
    </div>
  )

}
  
}

export default Notification
