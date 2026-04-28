import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DetailPage.style.css';
import {  Map, MapMarker } from "react-kakao-maps-sdk";

const DetailPage = () => {

  const { state } = useLocation();
  
  const place = state?.placeData;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (place) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const saved = favorites.some(fav => fav.id === place.id);
      setIsFavorite(saved);
    }
  }, [place]); 

  const toggleFavorite = () => {
    //if (!place) return;
    
    //테스트용
    const currentPlace = place || {
      id: "16618597", // 예시 ID
      place_name: "장생당약국"
    };    

    //console.log("현재 약국 데이터:", place);
    //console.log("현재 ID:", place.id, "타입:", typeof place.id);

    const placeId = String(currentPlace.id);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    //const isExisting = favorites.some(fav => String(fav.id) === String(place.id));
    const isExisting = favorites.some(fav => String(fav.id) === placeId);

    let newFavorites;
    if (isExisting) {
      // 삭제
      //newFavorites = favorites.filter(fav => String(fav.id) !== String(place.id));
      newFavorites = favorites.filter(fav => String(fav.id) !== placeId);
      console.log("즐겨찾기 삭제");
    } else {
      // 추가
      newFavorites = [...favorites, { 
        //id: place.id, 
        id: currentPlace.id,
        //name: place.place_name || place.name 
      }];
      console.log("즐겨찾기 추가");
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isExisting); 

    console.table(JSON.parse(localStorage.getItem('favorites')));
  };

  //if (!place) return null;


  return (
    <div className="detail-container">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 왼쪽 정보 섹션 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">장생당약국</h1>
            <span 
              onClick={toggleFavorite}
              className={`text-2xl cursor-pointer transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}
              style={{ userSelect: 'none' }}
            >
            ★
            </span>
            {/* <span className="text-xl text-yellow-400">★</span> */}
          </div>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-100">의료,건강 &gt; 약국</p>

          <div className="space-y-6">
            {/* 전화번호 */}
            <div className="info-row">
              <span className="custom-icon">📞</span>
              <div>
                <p className="text-xl font-bold text-gray-800 tracking-tight">02-558-5476</p>
                <p className="text-xs text-gray-400">약국</p>
              </div>
            </div>

            {/* 지번 주소 */}
            <div className="info-row">
              <span className="custom-icon">📍</span>
              <p className="text-gray-700 font-medium">서울 강남구 대치동 943-16</p>
            </div>

            {/* 도로명 주소 */}
            <div className="info-row">
              <span className="custom-icon">🏠</span>
              <p className="text-gray-700 font-medium">서울 강남구 테헤란로84길 17</p>
            </div>

            {/* 좌표 */}
            <div className="info-row">
              <span className="custom-icon">🔗</span>
              <p className="text-gray-500 text-sm">127.0589707..., 37.506051...</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 지도 및 링크 섹션 */}
        <div className="w-full md:w-72">
          {/* 지도 박스 */}
          <div className="map-box">
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                <Map center={{ lat: 37.5665, lng: 126.9780 }}
                    level={3}
                    style={{ width: "800px", height: "600px" }}
                >
                    <MapMarker position={{ lat: 37.5665, lng: 126.9780 }}>
                    <div style={{color:"#000"}}>시청</div>
                    </MapMarker>              
                </Map>      
             </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Links</h3>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-gray-400">🌐</span>
              <span className="text-sm text-blue-600 border-b border-transparent group-hover:border-blue-600 transition-all">
                http://place.map.kakao.com/16618597
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailPage;
