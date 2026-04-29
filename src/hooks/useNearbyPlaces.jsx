import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { NEARBY_PLACE_CATEGORY_CODES } from "../constants/placeCategories";

const PLACE_SEARCH_PAGE_SIZE = 15;
const MAX_NEARBY_PLACE_COUNT = 180;
const MAX_PLACE_COUNT_PER_SEARCH_POINT = 45;
const EARTH_RADIUS_IN_METERS = 6371000;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const getDistanceInMeters = (from, to) => {
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);
  const latDistance = toRadians(to.lat - from.lat);
  const lngDistance = toRadians(to.lng - from.lng);
  const haversine =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDistance / 2) ** 2;

  return 2 * EARTH_RADIUS_IN_METERS * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

const getOffsetCoordinate = ({ coordinate, distance, bearing }) => {
  const bearingRadians = toRadians(bearing);
  const latRadians = toRadians(coordinate.lat);
  const lngRadians = toRadians(coordinate.lng);
  const angularDistance = distance / EARTH_RADIUS_IN_METERS;
  const offsetLat = Math.asin(
    Math.sin(latRadians) * Math.cos(angularDistance) +
      Math.cos(latRadians) * Math.sin(angularDistance) * Math.cos(bearingRadians),
  );
  const offsetLng =
    lngRadians +
    Math.atan2(
      Math.sin(bearingRadians) * Math.sin(angularDistance) * Math.cos(latRadians),
      Math.cos(angularDistance) - Math.sin(latRadians) * Math.sin(offsetLat),
    );

  return {
    lat: (offsetLat * 180) / Math.PI,
    lng: (offsetLng * 180) / Math.PI,
  };
};

const getSearchCoordinates = ({ coordinate, radius, categoryCode }) => {
  if (!categoryCode) return [coordinate];

  const offsetDistance = radius * 0.45;
  const bearings = [0, 45, 90, 135, 180, 225, 270, 315];

  return [
    coordinate,
    ...bearings.map((bearing) =>
      getOffsetCoordinate({
        coordinate,
        distance: offsetDistance,
        bearing,
      }),
    ),
  ];
};

const fetchCategoryPlaces = async ({ category, searchCoordinate, radius, limit }) => {
  const places = [];
  const maxPages = Math.ceil(limit / PLACE_SEARCH_PAGE_SIZE);

  for (let page = 1; page <= maxPages; page += 1) {
    const response = await api.get("/search/category.json", {
      params: {
        category_group_code: category,
        x: searchCoordinate.lng,
        y: searchCoordinate.lat,
        radius,
        sort: "distance",
        page,
        size: PLACE_SEARCH_PAGE_SIZE,
      },
    });

    places.push(...response.data.documents);

    if (response.data.meta?.is_end || places.length >= limit) break;
  }

  return places.slice(0, limit);
};

const fetchNearbyPlaces = async ({ coordinate, radius, categoryCode }) => {
  const categoryCodes = categoryCode ? [categoryCode] : NEARBY_PLACE_CATEGORY_CODES;
  const searchCoordinates = getSearchCoordinates({ coordinate, radius, categoryCode });
  const limitPerCategory = categoryCode
    ? MAX_PLACE_COUNT_PER_SEARCH_POINT
    : Math.ceil(MAX_NEARBY_PLACE_COUNT / categoryCodes.length);
  const placesByCategory = await Promise.all(
    categoryCodes.flatMap((category) =>
      searchCoordinates.map((searchCoordinate) =>
        fetchCategoryPlaces({
          category,
          searchCoordinate,
          radius,
          limit: limitPerCategory,
        }),
      ),
    ),
  );

  const placeMap = new Map();

  placesByCategory.flat().forEach((place) => {
    const distanceFromCurrentLocation = Math.round(
      getDistanceInMeters(coordinate, {
        lat: Number(place.y),
        lng: Number(place.x),
      }),
    );

    if (distanceFromCurrentLocation <= radius) {
      placeMap.set(place.id, {
        ...place,
        distance: String(distanceFromCurrentLocation),
      });
    }
  });

  return Array.from(placeMap.values()).sort(
    (a, b) => Number(a.distance || 0) - Number(b.distance || 0),
  ).slice(0, MAX_NEARBY_PLACE_COUNT);
};

export const useNearbyPlacesQuery = ({ coordinate, radius, categoryCode, enabled = true }) => {
  return useQuery({
    queryKey: ["nearby-places", coordinate, radius, categoryCode],
    queryFn: () => fetchNearbyPlaces({ coordinate, radius, categoryCode }),
    enabled: enabled && Boolean(coordinate?.lat && coordinate?.lng && radius),
  });
};
