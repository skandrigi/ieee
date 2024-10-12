import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';

function PanToMarker({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 18); 
        }
    }, [position, map]);

    return null;
}

export default function MyMap({ positions, zoom }) {
    return (
        <MapContainer center={positions[positions.length - 1].position} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((item, index) => (
                <Marker key={index} position={item.position}>
                    <Popup>
                        Location: <br />
                        {item.position + ', ' + item.position} <br />
                        Timestamp: {item.timestamp}
                    </Popup>
                </Marker>
            ))}
            <PanToMarker position={positions[positions.length - 1].position} />
        </MapContainer>
    );
}
