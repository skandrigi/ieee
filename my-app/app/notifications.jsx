import React, { useState, useEffect } from 'react';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    // WebSocket connection to ntfy
    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket('wss://ntfy.sh/JM4j2e0yT6akacaQ/ws');

        // Handle receiving new notifications from the WebSocket
        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data); // Parse the WebSocket message
            console.log('Received notification:', notification);

            // Update notifications state with the new notification
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        };

        // Handle WebSocket errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup: close WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []); // Empty dependency array means this will run only on component mount and unmount

    return (
        <div>
            <h1>Notifications</h1>
            {notifications.length > 0 ? (
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index}>{notification.body || notification.message}</li>
                    ))}
                </ul>
            ) : (
                <p>No notifications yet</p>
            )}
        </div>
    );
}
