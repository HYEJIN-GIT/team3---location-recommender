import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { NEARBY_PLACE_CATEGORY_CODES } from "../constants/placeCategories";

const fetchNearbyPlaces = async ({ coordinate, radius, selectedCategory }) => {
  const categories =
    selectedCategory && NEARBY_PLACE_CATEGORY_CODES.includes(selectedCategory)
      ? [selectedCategory]
      : NEARBY_PLACE_CATEGORY_CODES;

  const responses = await Promise.all(
    categories.map((category) =>
      api.get("/search/category.json", {
        params: {
          category_group_code: category,
          x: coordinate.lng,
          y: coordinate.lat,
          radius,
          sort: "distance",
          size: 15,
        },
      }),
    ),
  );

  const placeMap = new Map();

  responses
    .flatMap((response) => response.data.documents)
    .forEach((place) => {
      placeMap.set(place.id, place);
    });

  return Array.from(placeMap.values()).sort(
    (a, b) => Number(a.distance || 0) - Number(b.distance || 0),
  );
};

export const useNearbyPlacesQuery = ({ coordinate, radius, selectedCategory }) => {
  return useQuery({
    queryKey: ["nearby-places", coordinate, radius, selectedCategory],
    queryFn: () => fetchNearbyPlaces({ coordinate, radius, selectedCategory }),
    enabled: Boolean(coordinate?.lat && coordinate?.lng && radius),
  });
};
