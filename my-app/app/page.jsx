"use client"; // Make sure the component is treated as a client component

import { useState, useEffect } from 'react';
import Notifications from './notifications';
import MyMap from './map';

export default function Dashboard() {
    const [notifications, setNotifications] = useState([]);
    const [positions, setPositions] = useState([[30.6212, -96.3404]]); // Default initial position

    // Use useEffect to connect to the WebSocket and handle notifications
    useEffect(() => {
        const ws = new WebSocket('wss://ntfy.sh/JM4j2e0yT6akacaQ/ws');
        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log('Received notification:', notification);
            setNotifications((prevNotifications) => [...prevNotifications, notification]);

            if (notification.lat && notification.lng) {
                // Add new positions to the positions array
                setPositions((prevPositions) => [...prevPositions, [notification.lat, notification.lng]]);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleNotificationClick = (notification) => {
        if (notification.lat && notification.lng) {
            // Add the new position to the positions array when a notification is clicked
            setPositions((prevPositions) => [...prevPositions, [notification.lat, notification.lng]]);
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div className="absolute top-0 right-0 w-[20%] h-[45%] bg-yellow-100 border border-black z-10 overflow-y-auto">
                <Notifications notifications={notifications} onNotificationClick={handleNotificationClick} />
            </div>

            <div className="absolute inset-0 z-0">
                <MyMap positions={positions} zoom={18} />
            </div>
        </div>
    );
} 
