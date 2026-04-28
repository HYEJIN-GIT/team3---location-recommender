import { useEffect, useState } from "react";

const defaultLocation = { lat: 37.5665, lng: 126.978 };
const geolocationNotSupportedMessage = "현재 위치를 지원하지 않는 브라우저입니다.";

export const useCurrentLocation = () => {
  const supportsGeolocation =
    typeof navigator !== "undefined" && Boolean(navigator.geolocation);
  const [location, setLocation] = useState(defaultLocation);
  const [isDefaultLocation, setIsDefaultLocation] = useState(true);
  const [error, setError] = useState(
    supportsGeolocation ? null : geolocationNotSupportedMessage,
  );

  useEffect(() => {
    if (!supportsGeolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setIsDefaultLocation(false);
      },
      () => {
        setError("현재 위치를 가져오지 못해 서울시청 기준으로 보여줍니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 1000 * 60 * 5,
      },
    );
  }, [supportsGeolocation]);

  return { location, isDefaultLocation, error };
};
