import { Link, useLocation } from "react-router-dom";

const PlacesPage = () => {
  const { state } = useLocation();
  const place = state?.place;

  if (!place) {
    return (
      <section className="py-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          선택한 장소
        </h1>
        <p className="mt-4 text-sm font-medium text-slate-600">
          지도에서 장소를 선택해주세요.
        </p>
        <Link to="/map" className="btn btn-neutral mt-5">
          지도로 가기
        </Link>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold text-slate-500">선택한 장소</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {place.place_name}
        </h1>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-bold text-slate-500">카테고리</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {place.category_name || "정보 없음"}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-slate-500">주소</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {place.road_address_name || place.address_name || "정보 없음"}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-slate-500">전화번호</dt>
            <dd className="mt-1 font-medium text-slate-900">
              {place.phone || "정보 없음"}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex gap-2">
          <Link to="/map" className="btn btn-outline">
            다시 고르기
          </Link>
          {place.place_url && (
            <a
              href={place.place_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-neutral"
            >
              카카오맵에서 보기
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlacesPage;
