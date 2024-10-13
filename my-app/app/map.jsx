import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Custom icon for the latest marker
const latestMarkerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png', // A red marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

// Default icon for other markers
const defaultMarkerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default blue marker icon
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

function PanToMarker({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 18); // Fly to the provided position
        }
    }, [position, map]);

    return null;
}

export default function MyMap({ positions = [], zoom, selectedPosition }) {
    const defaultCenter = [30.6212, -96.3404];
    const lastPosition = positions.length > 0 ? positions[positions.length - 1].position : null;
    const center = lastPosition || defaultCenter;

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((item, index) => (
                item.position && (
                    <Marker
                        key={index}
                        position={item.position}
                        icon={index === positions.length - 1 ? latestMarkerIcon : defaultMarkerIcon} // Use custom icon for the latest marker
                    >
                        <Popup>
                            Location: <br />
                            {item.position[0] + ', ' + item.position[1]} <br />
                            Timestamp: {item.timestamp}
                        </Popup>
                    </Marker>
                )
            ))}
            {selectedPosition ? <PanToMarker position={selectedPosition} /> : <PanToMarker position={lastPosition} />}
        </MapContainer>
    );
}
