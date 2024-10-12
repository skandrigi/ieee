import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useState, useEffect } from 'react';
export default function MyMap({ position, zoom }) {
    const [timestamp, setTimestamp] = useState("");

    useEffect(() => {
        const currentTime = new Date().toLocaleString(); 
        setTimestamp(currentTime);
      }, []);

    return (
        <div style={{ height: '100vh' }}>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Location: <br/>
                        {position[0] +', ' + position[1]} <br/>
                        Timestamp: {timestamp}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
