import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const nearbyCategories = ["FD6", "CE7", "CT1", "AT4", "CS2", "MT1"];

const fetchNearbyPlaces = async ({ coordinate, radius }) => {
  const responses = await Promise.all(
    nearbyCategories.map((category) =>
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

export const useNearbyPlacesQuery = ({ coordinate, radius }) => {
  return useQuery({
    queryKey: ["nearby-places", coordinate, radius],
    queryFn: () => fetchNearbyPlaces({ coordinate, radius }),
    enabled: Boolean(coordinate?.lat && coordinate?.lng && radius),
  });
};
