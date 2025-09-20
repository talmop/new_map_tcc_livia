import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import Ratings from "./Ratings";
import "leaflet/dist/leaflet.css";

// Ícones
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const pointIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Botão centralizar no usuário
function FlyToUser({ position }) {
  const map = useMap();
  const handleClick = () => {
    if (position) map.setView(position, 13);
  };
  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1000,
        background: "white",
        border: "1px solid #ccc",
        padding: "5px 10px",
        cursor: "pointer",
      }}
    >
      Minha Localização
    </button>
  );
}

// Captura duplo clique e cria ponto
function AddPoint({ onAddPoint }) {
  useMapEvents({
    dblclick(e) {
      const name = prompt("Digite o nome do ponto:");
      if (!name) return;

      const newPoint = {
        id: Date.now(),
        name,
        coords: [e.latlng.lat, e.latlng.lng],
        reviews: [],
      };
      onAddPoint(newPoint);
    },
  });
  return null;
}

function Map() {
  const [points, setPoints] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  // Carrega pontos do localStorage
  useEffect(() => {
    const savedPoints = JSON.parse(localStorage.getItem("points") || "[]");
    setPoints(savedPoints);
  }, []);

  // Salva pontos no localStorage sempre que points mudar
  const savePoints = (newPoints) => {
    localStorage.setItem("points", JSON.stringify(newPoints));
  };

  // Pega a localização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Erro ao obter localização:", err)
    );
  }, []);

  // Adiciona avaliação a um ponto específico
  const handleAddReview = (pointId, review) => {
    const updatedPoints = points.map((p) =>
      p.id === pointId ? { ...p, reviews: [...(p.reviews || []), review] } : p
    );
    setPoints(updatedPoints);
    savePoints(updatedPoints); // salva imediatamente
  };

  // Adiciona novo ponto
  const handleAddPoint = (newPoint) => {
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);
    savePoints(updatedPoints); // salva imediatamente
  };

  return (
    <div style={{ position: "relative" }}>
      <h1>ecoRefil</h1>
      <p>🖱️ Dê um duplo clique no mapa para adicionar um novo ponto.</p>

      <MapContainer
        center={userPosition || [-15.78, -47.93]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userPosition && <FlyToUser position={userPosition} />}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <h2>📍 Você está aqui</h2>
            </Popup>
          </Marker>
        )}

        {points.map((ponto) => (
          <Marker key={ponto.id} position={ponto.coords} icon={pointIcon}>
            <Popup>
              <h2>{ponto.name}</h2>
              <Ratings point={ponto} onSubmit={handleAddReview} />
              {ponto.reviews && ponto.reviews.length > 0 && (
                <h4>
                  Média:{" "}
                  {(
                    ponto.reviews.reduce((sum, r) => sum + r.stars, 0) /
                    ponto.reviews.length
                  ).toFixed(1)}{" "}
                  ⭐
                </h4>
              )}
            </Popup>
          </Marker>
        ))}

        <AddPoint onAddPoint={handleAddPoint} />
      </MapContainer>
    </div>
  );
}

export default Map;
