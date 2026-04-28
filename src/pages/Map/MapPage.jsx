import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const mapCenter = { lat: 37.5665, lng: 126.978 };

const MapPage = () => {
  const kakaoAppKey = import.meta.env.VITE_KAKAO_SCRIPT_API_KEY;
  const [loading, error] = useKakaoLoader({
    appkey: kakaoAppKey,
  });

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
      <h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        지도 페이지입니다
      </h1>

      <div className="h-[700px] w-full max-w-[1200px] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
        <Map center={mapCenter} level={3} className="h-full w-full">
          <MapMarker position={mapCenter}>
            <div className="px-2 py-1 text-sm font-semibold text-slate-950">
              시청
            </div>
          </MapMarker>
        </Map>
      </div>
    </section>
  );
};

export default MapPage;
