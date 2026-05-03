import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import {
  DEFAULT_PLACE_CATEGORY_STYLE,
  NEARBY_PLACE_CATEGORY_CODES,
  PLACE_CATEGORY_NAME_BY_CODE,
  PLACE_CATEGORY_STYLE_BY_CODE,
} from "../../constants/placeCategories";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { useFavoriteStore } from "../../hooks/useFavoriteStore";
import { useNearbyPlacesQuery } from "../../hooks/useNearbyPlaces";
import MapHeader from "./components/MapHeader";
import NearbyPlaceList from "./components/NearbyPlaceList";
import NearbyPlaceMap from "./components/NearbyPlaceMap";

const radiusFilters = [
  { label: "300m", value: 300, mapLevel: 3 },
  { label: "500m", value: 500, mapLevel: 4 },
  { label: "1km", value: 1000, mapLevel: 5 },
];

const CATEGORY_CODE_BY_QUERY = NEARBY_PLACE_CATEGORY_CODES.reduce((categories, code) => {
  categories[code.toLowerCase()] = code;
  categories[PLACE_CATEGORY_NAME_BY_CODE[code].toLowerCase()] = code;
  return categories;
}, {});

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

const getSelectedCategoryCode = (categoryQuery) => {
  const normalizedCategory = categoryQuery.trim().replace(/^["']|["']$/g, "").toLowerCase();

  return CATEGORY_CODE_BY_QUERY[normalizedCategory];
};

const MapSkeleton = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="h-[700px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="relative h-full bg-slate-100">
          <div className="absolute inset-0 opacity-70">
            <div className="h-full w-full bg-[linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:56px_56px]" />
          </div>
          <div className="absolute left-6 top-6 space-y-3">
            <div className="skeleton h-5 w-40 rounded-full bg-slate-200" />
            <div className="skeleton h-3 w-64 rounded-full bg-slate-200" />
          </div>
          <div className="absolute left-1/2 top-1/2 h-12 w-10 -translate-x-1/2 -translate-y-1/2">
            <div className="h-9 w-9 rotate-45 rounded-[50%_50%_0_50%] bg-slate-300 shadow-lg" />
            <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-white" />
          </div>
        </div>
      </div>

      <aside className="h-[700px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="skeleton h-5 w-24 rounded-full bg-slate-200" />
        </div>
        <div className="space-y-2 p-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-md border border-slate-200 bg-white px-3 py-3">
              <div className="skeleton h-4 w-3/5 rounded-full bg-slate-200" />
              <div className="skeleton mt-3 h-3 w-4/5 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

const MapErrorState = ({ title, description, actionLabel, onAction }) => {
  return (
    <section className="py-5">
      <div className="grid min-h-[520px] place-items-center rounded-lg border border-red-100 bg-white px-6 py-12 text-center shadow-sm">
        <div className="max-w-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-2xl font-black text-red-500">
            !
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-950">{title}</h1>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{description}</p>
          {actionLabel && onAction && (
            <button type="button" onClick={onAction} className="btn btn-neutral mt-6">
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const MapPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kakaoAppKey = import.meta.env.VITE_KAKAO_SCRIPT_API_KEY;
  const [radius, setRadius] = useState(300);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const { location, isDefaultLocation, error: locationError } = useCurrentLocation();
  const categoryQuery = searchParams.get("category") ?? "";
  const selectedCategoryCode = categoryQuery ? getSelectedCategoryCode(categoryQuery) : undefined;
  const selectedCategoryName = selectedCategoryCode
    ? PLACE_CATEGORY_NAME_BY_CODE[selectedCategoryCode]
    : "";
  const shouldFetchPlaces = !categoryQuery || Boolean(selectedCategoryCode);
  const {
    data: places = [],
    isLoading: placesLoading,
    isError: placesError,
  } = useNearbyPlacesQuery({
    coordinate: location,
    radius,
    categoryCode: selectedCategoryCode,
    enabled: shouldFetchPlaces,
  });

  const [loading, error] = useKakaoLoader({
    appkey: kakaoAppKey,
  });

  const selectedFilter = useMemo(
    () => radiusFilters.find((filter) => filter.value === radius) ?? radiusFilters[0],
    [radius],
  );

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => String(favorite.id))),
    [favorites],
  );

  const handlePlaceClick = (place) => {
    navigate("/detail", {
      state: { place },
    });
  };

  if (!kakaoAppKey) {
    return (
      <MapErrorState
        title="지도 설정이 필요해요"
        description="Kakao JavaScript API 키가 설정되어 있지 않아 지도를 표시할 수 없습니다."
      />
    );
  }

  if (loading) {
    return (
      <section className="py-5">
        <div className="mb-5">
          <div className="skeleton h-10 w-40 rounded-full bg-slate-200" />
          <div className="skeleton mt-3 h-4 w-72 rounded-full bg-slate-200" />
        </div>
        <MapSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <MapErrorState
        title="지도를 불러오지 못했어요"
        description="네트워크 상태를 확인한 뒤 다시 시도해 주세요. 잠시 후에도 계속된다면 Kakao 지도 스크립트 설정을 확인해야 합니다."
        actionLabel="다시 시도"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <section className="py-5">
      <MapHeader
        isDefaultLocation={isDefaultLocation}
        locationError={locationError}
        radius={radius}
        radiusFilters={radiusFilters}
        selectedFilter={selectedFilter}
        selectedCategoryName={selectedCategoryName}
        onRadiusChange={setRadius}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <NearbyPlaceMap
          location={location}
          mapLevel={selectedFilter.mapLevel}
          places={places}
          favoriteIds={favoriteIds}
          onPlaceClick={handlePlaceClick}
        />

        <NearbyPlaceList
          places={places}
          placesLoading={placesLoading && shouldFetchPlaces}
          placesError={placesError || !shouldFetchPlaces}
          formatDistance={formatDistance}
          getCategoryName={getCategoryName}
          getCategoryStyle={getCategoryStyle}
          favoriteIds={favoriteIds}
          onPlaceClick={handlePlaceClick}
          onFavoriteToggle={toggleFavorite}
        />
      </div>
    </section>
  );
};

export default MapPage;
