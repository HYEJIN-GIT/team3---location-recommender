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
import { useNearbyPlacesQuery } from "../../hooks/useNearbyPlaces";
import MapHeader from "./components/MapHeader";
import NearbyPlaceList from "./components/NearbyPlaceList";
import NearbyPlaceMap from "./components/NearbyPlaceMap";

const radiusFilters = [
  { label: "1km", value: 1000, mapLevel: 5 },
  { label: "5km", value: 5000, mapLevel: 8 },
  { label: "10km", value: 10000, mapLevel: 9 },
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

const MapPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kakaoAppKey = import.meta.env.VITE_KAKAO_SCRIPT_API_KEY;
  const [radius, setRadius] = useState(1000);
  const selectedCategory = searchParams.get("category");
  const selectedCategoryCode =
    PLACE_CATEGORY_CODE_BY_NAME[selectedCategory] ||
    (PLACE_CATEGORY_NAME_BY_CODE[selectedCategory] ? selectedCategory : null);
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

  const handlePlaceClick = (place) => {
    navigate("/detail", {
      state: { place },
    });
  };

  if (!kakaoAppKey) {
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-red-600">
          Kakao JavaScript API key is not configured.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-slate-600">Loading map...</p>
      </section>
    );
  }

  if (error) {
    console.error(error);
    return (
      <section className="py-5">
        <p className="text-sm font-medium text-red-600">Failed to load the map.</p>
      </section>
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
          onPlaceClick={handlePlaceClick}
        />

        <NearbyPlaceList
          places={places}
          placesLoading={placesLoading && shouldFetchPlaces}
          placesError={placesError}
          formatDistance={formatDistance}
          getCategoryName={getCategoryName}
          getCategoryStyle={getCategoryStyle}
          onPlaceClick={handlePlaceClick}
        />
      </div>
    </section>
  );
};

export default MapPage;
