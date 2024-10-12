"use client";
import React, { useState, useEffect } from 'react';
import Notifications from './notifications';
import MyMap from './map';

export default function Dashboard() {
    const [notifications, setNotifications] = useState([]);
    const [position, setPosition] = useState([30.6212, -96.3404]);

    useEffect(() => {
        const ws = new WebSocket('wss://ntfy.sh/JM4j2e0yT6akacaQ/ws');
        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log('Received notification:', notification);
            setNotifications((prevNotifications) => [...prevNotifications, notification]);

            if (notification.lat && notification.lng) {
                setPosition([notification.lat, notification.lng]); 
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
            setPosition([notification.lat, notification.lng]); 
        }
    };

    return (
        <div className="flex">
            <div className="min-h-screen w-[15%] bg-yellow-100 border border-black">
                <Notifications 
                    notifications={notifications} 
                    onNotificationClick={handleNotificationClick} 
                />
            </div>
            <div className="w-[85%]">
                <MyMap position={position} zoom={18} />
            </div>
        </div>
    );
}
