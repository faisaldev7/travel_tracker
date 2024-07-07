import styles from "./Map.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button"

export default function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0])

  const [lat, lng] = useUrlPosition()

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()

  useEffect(
    function(){
      if (lat && lng) setMapPosition([lat, lng])
    },
    [lat, lng]
  )

  useEffect(
    function(){
      if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    },
    [geolocationPosition]
  )

  return (
    <div className={styles.mapContainer}>
    {!geolocationPosition && (<Button type="position" onClick={getPosition}>
      {isLoadingPosition ? "Loading..." : "Use your location"}
    </Button>)}
    <MapContainer center={mapPosition} className={styles.map} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          position={[city.position.lat, city.position.lng]}
          key={city.id}
        >
          <Popup>
            <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>))}
      <ChangeCenter position={mapPosition} />
      <DetectClick />
    </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
}
