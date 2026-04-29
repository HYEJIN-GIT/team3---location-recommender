import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import {
  DEFAULT_PLACE_CATEGORY_STYLE,
  PLACE_CATEGORY_NAME_BY_CODE,
  PLACE_CATEGORY_STYLE_BY_CODE,
} from "../../constants/placeCategories";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useNearbyPlacesQuery } from "../../hooks/useNearbyPlaces";

const radiusFilters = [
  { label: "1km", value: 1000, mapLevel: 5 },
  { label: "5km", value: 5000, mapLevel: 8 },
  { label: "10km", value: 10000, mapLevel: 9 },
];

const formatDistance = (distance) => {
  const meters = Number(distance);

  if (!Number.isFinite(meters)) return "";
  if (meters < 1000) return `${meters}m`;

  return `${(meters / 1000).toFixed(1)}km`;
};

const getCategoryName = (place) => {
  return PLACE_CATEGORY_NAME_BY_CODE[place.category_group_code] || place.category_name || "place";
};

const getCategoryStyle = (place) => {
  return PLACE_CATEGORY_STYLE_BY_CODE[place.category_group_code] || DEFAULT_PLACE_CATEGORY_STYLE;
};

const MapPage = () => {
  const navigate = useNavigate();
  const kakaoAppKey = import.meta.env.VITE_KAKAO_SCRIPT_API_KEY;
  const [radius, setRadius] = useState(1000);
  const { location, isDefaultLocation, error: locationError } = useCurrentLocation();
  const {
    data: places = [],
    isLoading: placesLoading,
    isError: placesError,
  } = useNearbyPlacesQuery({
    coordinate: location,
    radius,
  });

  const [loading, error] = useKakaoLoader({
    appkey: kakaoAppKey,
  });

  const selectedFilter = useMemo(
    () => radiusFilters.find((filter) => filter.value === radius) ?? radiusFilters[0],
    [radius],
  );

  
  const handlePlaceClick = (place) => {
    navigate("/places", {
      state: { place },
    });
  };

  if (!kakaoAppKey) {
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-red-600">
          카카오 지도 JavaScript 키가 설정되지 않았습니다.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-slate-600">
          지도를 불러오는 중입니다.
        </p>
      </section>
    );
  }

  if (error) {
    console.error(error);
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-red-600">
          카카오 지도를 불러오지 못했습니다.
        </p>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            내 근처 장소
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-600">
            {isDefaultLocation
              ? "현재 위치 확인 중입니다."
              : `현재 위치 기준 ${selectedFilter.label} 안의 장소를 보여줍니다.`}
          </p>
          {locationError && (
            <p className="mt-2 text-sm font-medium text-amber-700">{locationError}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {radiusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setRadius(filter.value)}
              className={`btn btn-sm ${
                radius === filter.value ? "btn-neutral" : "btn-outline"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-[700px] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
          <Map center={location} level={selectedFilter.mapLevel} className="h-full w-full">
            <MapMarker position={location}>
              <div className="px-2 py-1 text-sm font-semibold text-slate-950">
                현재 위치
              </div>
            </MapMarker>

            {places.map((place) => (
              <MapMarker
                key={place.id}
                position={{ lat: Number(place.y), lng: Number(place.x) }}
                onClick={() => handlePlaceClick(place)}
              >
                <button
                  type="button"
                  onClick={() => handlePlaceClick(place)}
                  className={`rounded-md border px-2 py-1 text-sm font-semibold shadow-sm ${getCategoryStyle(place).marker}`}
                >
                  {place.place_name}
                </button>
              </MapMarker>
            ))}
          </Map>
        </div>

        <aside className="h-[700px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="text-base font-bold text-slate-900">
              근처 장소 {places.length}곳
            </h2>
          </div>

          <div className="h-[calc(700px-53px)] overflow-y-auto p-2">
            {placesLoading && (
              <p className="px-2 py-3 text-sm font-medium text-slate-600">
                근처 장소를 찾는 중입니다.
              </p>
            )}

            {placesError && (
              <p className="px-2 py-3 text-sm font-medium text-red-600">
                근처 장소를 불러오지 못했습니다.
              </p>
            )}

            {!placesLoading && !placesError && places.length === 0 && (
              <p className="px-2 py-3 text-sm font-medium text-slate-600">
                선택한 거리 안에 표시할 장소가 없습니다.
              </p>
            )}

            <ul className="space-y-2">
              {places.map((place) => (
                <li key={place.id}>
                  <button
                    type="button"
                    onClick={() => handlePlaceClick(place)}
                    className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:border-slate-400 hover:bg-white"
                  >
                    <span className="block text-sm font-bold text-slate-950">
                      {place.place_name}
                    </span>
                    <span className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span
                        className={`rounded-full px-2 py-0.5 ${getCategoryStyle(place).badge}`}
                      >
                        {getCategoryName(place)}
                      </span>
                      <span>{formatDistance(place.distance)}</span>
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {place.road_address_name || place.address_name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default MapPage;
