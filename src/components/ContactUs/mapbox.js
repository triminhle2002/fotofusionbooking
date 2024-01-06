// Bạn có thể đặt component MapboxMap vào nơi bạn muốn hiển thị bản đồ
import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const MapboxMap = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 16.0599647,
    longitude: 108.2097793,
    zoom: 15


  });
  const handleWheel = (event) => {
    // Cập nhật giá trị zoom dựa trên sự kiện lăn chuột
    const newZoom = viewport.zoom - event.deltaY * 0.01;
    
    // Giới hạn giá trị zoom để tránh quá mức hoặc quá nhỏ
    const minZoom = 1;
    const maxZoom = 20;
    const boundedZoom = Math.min(Math.max(newZoom, minZoom), maxZoom);

    // Cập nhật viewport với giá trị zoom mới
    setViewport({
      ...viewport,
      zoom: boundedZoom
    });
  };
  return (
    <div style={{ height: "100vh" }}  onWheel={handleWheel}> 
    <MapGL
    
      {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
     // mapboxApiAccessToken=""
        mapboxAccessToken='pk.eyJ1IjoidGhpZW4xODEyMDEiLCJhIjoiY2xxdndmdjN3NDdudDJrbzB0MDVnZGNtZiJ9.0VT-obPWY9LpZkLsCAJ20g'
        onViewportChange={(newViewport) => setViewport(newViewport)}
      
    >
      {/* Đánh dấu vị trí trên bản đồ */}
      <Marker latitude={16.0599647} longitude={108.2097793} offsetLeft={-20} offsetTop={-10}>
        <div style={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>  FotoFushion <br /><span style={{ marginLeft: '5px', transform: 'rotate(180deg)' }}>📸</span></div>
      </Marker>
    </MapGL>
    </div>
  );
};

export default MapboxMap;
