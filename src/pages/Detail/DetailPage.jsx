import { useLocation, useNavigate } from 'react-router-dom';
import './DetailPage.style.css';
import {  Map, MapMarker } from "react-kakao-maps-sdk";
import { useFavoriteStore } from "../../hooks/useFavoriteStore"
import { PLACE_CATEGORY_STYLE_BY_CODE, DEFAULT_PLACE_CATEGORY_STYLE, PLACE_CATEGORY_NAME_BY_CODE } from '../../constants/placeCategories';

const DetailPage = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  
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

  const categoryCode = place.category_group_code;

  const categoryStyle = PLACE_CATEGORY_STYLE_BY_CODE[categoryCode] || DEFAULT_PLACE_CATEGORY_STYLE;

  const formatDistance = (distance) => {
    if (!distance) return null;
    const d = Number(distance);
    return d >= 1000 ? `${(d / 1000).toFixed(1)}km` : `${d}m`;
  };

  //if (!place) return null;

  return (
    <div className="detail-container">

      {/* 상단 네비게이션/뒤로가기 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 
                    hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 
                    shadow-sm active:scale-95"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-medium cursor-pointer">뒤로가기</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 왼쪽 정보 섹션 */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">

            {/* 🔹 왼쪽 그룹 */}
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {place.place_name}
              </h1>

              {categoryCode && (
                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${categoryStyle.badge}`}
                >
                  {PLACE_CATEGORY_NAME_BY_CODE[categoryCode]}
                </span>
              )}
            </div>

            {/* ⭐ 오른쪽 */}
            <span
              onClick={() => toggleFavorite(place)}
              className={`text-2xl cursor-pointer transition-colors flex-shrink-0 ${
                isFavorite ? "text-yellow-400" : "text-gray-300"
              }`}
              style={{ userSelect: "none" }}
            >
              ★
            </span>

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
              <span className="text-[11px] text-gray-400">지번 주소</span>
            </div>

            {/* 도로명 주소 */}
            <div className="info-row">
              <span className="custom-icon">🏠</span>
              <p className="text-gray-700 font-medium">{place.road_address_name || "도로명 주소 없음"}</p>
              <span className="text-[11px] text-gray-400">도로명 주소</span>
            </div>

            {/* 거리 정보 추가 */}
            {place.distance && (
              <div className="info-row bg-blue-50 p-3 rounded-lg inline-flex items-center">
                <span className="custom-icon">🏃</span>
                <div className="ml-2">
                  <p className="text-sm text-blue-600 font-semibold">현재 위치에서 {formatDistance(place.distance)}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        
        <div className="w-full md:w-[400px]">
          {/* 지도 박스 */}
          <div className="map-box">
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                <Map center={{ lat, lng}}
                    level={3}
                    style={{ width: "100%", height: "100%" }}
                >
                    <MapMarker position={{ lat, lng}}>
                    {/* <div style={{color:"#000"}}>{place.place_name}</div> */}
                    </MapMarker>              
                </Map>      
             </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default DetailPage;
