import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Ratings from "./Ratings";

// importa o ícone (se você colocou dentro de src/icons/pin.png)
import pinIcon from "../icons/106121.png";

// cria o ícone customizado
const customIcon = new L.Icon({
  iconUrl: pinIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function Map() {
  const [reviews, setReviews] = useState({});

  const pontos = [
    { id: 1, name: "Refil Central", coords: [-23.55, -46.63] },
    { id: 2, name: "Refil Norte", coords: [-23.48, -46.62] },
    { id: 3, name: "Refil Sul", coords: [-23.65, -46.70] },
  ];

  const handleAddReview = (pointId, review) => {
    setReviews((prev) => ({
      ...prev,
      [pointId]: [...(prev[pointId] || []), review],
    }));
  };

  return (
    <div>
      <h1>ecoRefil</h1>
      <MapContainer
        center={[-23.55, -46.63]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pontos.map((ponto) => (
          <Marker key={ponto.id} position={ponto.coords} icon={customIcon}>
            <Popup>
              <h2>{ponto.name}</h2>
              <Ratings point={ponto} onSubmit={handleAddReview} />

              <h4>Avaliações:</h4>
              <ul>
                {(reviews[ponto.id] || []).map((r, i) => (
                  <li key={i}>
                    {r.comment} - {r.stars}⭐
                  </li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
