import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BUSINESS_LOCATION, BUSINESS } from '@/lib/constants';
import { haversineDistance } from '@/lib/utils';
import { Navigation } from 'lucide-react';

// Fix default icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const businessIcon = L.divIcon({
  html: '<div style="font-size:32px">&#128062;</div>',
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const userIcon = L.divIcon({
  html: '<div style="font-size:32px">&#128205;</div>',
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface LocationMapProps {
  userLat?: number;
  userLng?: number;
  height?: string;
}

export default function LocationMap({ userLat, userLng, height = '320px' }: LocationMapProps) {
  const hasUser = userLat != null && userLng != null;
  const distance = hasUser
    ? haversineDistance(userLat!, userLng!, BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng)
    : null;

  const center = hasUser
    ? [(userLat! + BUSINESS_LOCATION.lat) / 2, (userLng! + BUSINESS_LOCATION.lng) / 2]
    : [BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng];

  const bounds: [number, number][] = hasUser
    ? [[userLat!, userLng!], [BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng]]
    : [[BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng]];

  return (
    <div className="space-y-3">
      <MapContainer
        center={center as [number, number]}
        zoom={hasUser ? 13 : 15}
        style={{ height, width: '100%' }}
        bounds={bounds as [number, number][]}
        boundsOptions={{ padding: [40, 40] }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={[BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng]} icon={businessIcon}>
          <Popup>
            <strong>Govinda Pet Center</strong>
            <br />
            {BUSINESS.address}
          </Popup>
        </Marker>
        {hasUser && (
          <>
            <Marker position={[userLat!, userLng!]} icon={userIcon}>
              <Popup>Your location</Popup>
            </Marker>
            <Polyline
              positions={[[userLat!, userLng!], [BUSINESS_LOCATION.lat, BUSINESS_LOCATION.lng]]}
              pathOptions={{ color: '#4a9d5e', dashArray: '8 8' }}
            />
          </>
        )}
      </MapContainer>

      {distance != null && (
        <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
          <span className="text-sm font-medium text-green-800">
            Approximate distance: {distance.toFixed(1)} km
          </span>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            <Navigation className="h-4 w-4" />
            Directions
          </a>
        </div>
      )}
    </div>
  );
}
