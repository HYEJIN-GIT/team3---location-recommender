import {  Map, MapMarker } from "react-kakao-maps-sdk";

const MapPage = () => {
  return (
    <section className="py-5">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        지도 페이지입니다.
      </h1>
      <Map center={{ lat: 37.5665, lng: 126.9780 }}
           level={3}
           style={{ width: "1200px", height: "700px" }}
      >
        <MapMarker position={{ lat: 37.5665, lng: 126.9780 }}>
          <div style={{color:"#000"}}>시청</div>
        </MapMarker>              
      </Map>      
    </section>
  );
};

export default MapPage;
