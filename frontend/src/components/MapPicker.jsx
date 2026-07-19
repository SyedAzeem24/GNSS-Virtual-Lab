import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ClickMarker({
  position,
  setPosition,
  setLatitude,
  setLongitude,
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));
    },
  });

  return <Marker position={position} />;
}

export default function MapPicker({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}) {
  const defaultLat = Number(latitude) || 33.6844;
  const defaultLng = Number(longitude) || 73.0479;

  const [position, setPosition] = useState([
    defaultLat,
    defaultLng,
  ]);

  useEffect(() => {
    const lat = Number(latitude) || 33.6844;
    const lng = Number(longitude) || 73.0479;

    setPosition([lat, lng]);
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{
        height: "350px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickMarker
        position={position}
        setPosition={setPosition}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
    </MapContainer>
  );
}