import React from 'react';
import {ScrollArea,ScrollBar} from "./components/ui/scroll-area";


export default function Notifications({ notifications }) {
    return (
        <div className="items-center text-center">
            <h1 className="text-xl bg-red-900 py-4 text-white font-bold border-b-4 border-black">Location History</h1>
            <ScrollArea className="h-64 w-full overflow-auto relative">
                <div className="pr-4">
                    {notifications.length > 0 ? (
                        <ul>
                            {notifications.slice().reverse().map((notification, index) => (
                                <div className="py-2 border-b-[1px] border-black" key={index}>
                                    <li>{notification.body || notification.message}</li>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No notifications yet</p>
                    )}
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    );
}