"use client"; // Make sure the component is treated as a client component

import { useState, useEffect } from 'react';
import Notifications from './notifications';
import MyMap from './map';

export default function Dashboard() {
    const [notifications, setNotifications] = useState([]);
    const [positions, setPositions] = useState([{ position: [30.6212, -96.3404], timestamp: new Date().toLocaleString() }]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ws = new WebSocket('wss://ntfy.sh/JM4j2e0yT6akacaQ/ws');
            ws.onmessage = (event) => {
                const notification = JSON.parse(event.data);
                console.log('Received notification:', notification);
                setNotifications((prevNotifications) => [...prevNotifications, notification]);

                if (notification.lat && notification.lng) {
                    const newPosition = {
                        position: [notification.lat, notification.lng],
                        timestamp: new Date().toLocaleString(),
                    };
                    // Add the new position
                    setPositions((prevPositions) => [...prevPositions, newPosition]);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return () => {
                ws.close();
            };
        }
    }, []);

    const handleNotificationClick = (notification) => {
        if (notification.lat && notification.lng) {
            const newPosition = {
                position: [notification.lat, notification.lng],
                timestamp: new Date().toLocaleString(),
            };
            // Add the new position from the clicked notification
            setPositions((prevPositions) => [...prevPositions, newPosition]);
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
