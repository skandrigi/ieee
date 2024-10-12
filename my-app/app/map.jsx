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
        <MapContainer center={positions[positions.length - 1]} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((position, index) => (
                <Marker key={index} position={position}>
                    <Popup>
                        Location: <br />
                        {position[0] + ', ' + position[1]}
                    </Popup>
                </Marker>
            ))}
            <PanToMarker position={positions[positions.length - 1]} />
        </MapContainer>
    );
}