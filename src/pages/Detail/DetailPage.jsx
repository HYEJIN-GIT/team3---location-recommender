import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DetailPage.style.css';
import {  Map, MapMarker } from "react-kakao-maps-sdk";
import { useFavoriteStore } from "../../hooks/useFavoriteStore"
//'../store/useFavoriteStore'

const DetailPage = () => {

  const { state } = useLocation();
  
  const place = state?.place;
  console.log("place:", place);

  // const [isFavorite, setIsFavorite] = useState(false);

   if (!place) return <div>잘못된 접근입니다.</div>;

  const lat = Number(place.y);
  const lng = Number(place.x);  

  console.log("place:", place);

  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  const isFavorite = favorites.some(
    (fav) => String(fav.id) === String(place.id)
  );

  //if (!place) return null;

  return (
    <div className="detail-container">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 왼쪽 정보 섹션 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{place.place_name}</h1>
            <span 
              onClick={() => toggleFavorite(place)}
              className={`text-2xl cursor-pointer transition-colors ${isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}
              style={{ userSelect: 'none' }}
            >
            ★
            </span>
            {/* <span className="text-xl text-yellow-400">★</span> */}
          </div>
          <p className="text-sm text-gray-500 mb-8 pb-4 border-b border-gray-100">{place.category_name}</p>

          <div className="space-y-6">
            {/* 전화번호 */}
            <div className="info-row">
              <span className="custom-icon">📞</span>
              <div>
                <p className="text-xl font-bold text-gray-800 tracking-tight">{place.phone || "전화번호 없음"}</p>
                {/* <p className="text-xs text-gray-400">약국</p> */}
              </div>
            </div>

            {/* 지번 주소 */}
            <div className="info-row">
              <span className="custom-icon">📍</span>
              <p className="text-gray-700 font-medium">{place.address_name}</p>
            </div>

            {/* 도로명 주소 */}
            <div className="info-row">
              <span className="custom-icon">🏠</span>
              <p className="text-gray-700 font-medium">{place.road_address_name || "도로명 주소 없음"}</p>
            </div>

            {/* 좌표 */}
            <div className="info-row">
              <span className="custom-icon">🔗</span>
              <p className="text-gray-500 text-sm">{lng}, {lat}</p>
            </div>
          </div>
        </div>

        {/* 오른쪽 지도 및 링크 섹션 */}
        <div className="w-full md:w-[400px]">
          {/* 지도 박스 */}
          <div className="map-box">
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                <Map center={{ lat, lng}}
                    level={3}
                    style={{ width: "100%", height: "100%" }}
                >
                    <MapMarker position={{ lat, lng}}>
                    <div style={{color:"#000"}}>{place.place_name}</div>
                    </MapMarker>              
                </Map>      
             </div>
          </div>
          
          {/* <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Links</h3>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-gray-400">🌐</span>
              <span className="text-sm text-blue-600 border-b border-transparent group-hover:border-blue-600 transition-all">
                http://place.map.kakao.com/16618597
              </span>
            </div>
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default DetailPage;
