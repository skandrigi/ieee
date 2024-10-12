import React from 'react';
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

export default function Notifications({ notifications, onNotificationClick }) {
    const locationNotifications = notifications.filter(notification => notification.lat && notification.lng);

    return (
        <div className="items-center text-center font-mono">
            <h1 className="text-xl bg-red-900 py-4 text-white font-bold border-b-4 border-black">Location History</h1>
            <ScrollArea className="h-64 w-full overflow-auto relative">
                <div className="pr-4">
                    {notifications.length > 0 ? (
                        locationNotifications.length > 0 ? (
                            <ul>
                                {locationNotifications.slice().reverse().map((notification, index) => (
                                    <div 
                                        key={index}
                                        className="py-2 border-b-[1px] border-black cursor-pointer hover:bg-yellow-300"
                                        onClick={() => onNotificationClick(notification)}
                                    >
                                        <li>{notification.body || notification.message}</li>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>No location history available</p>
                        )
                    ) : (
                        <p>No notifications yet</p>
                    )}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    );
}
