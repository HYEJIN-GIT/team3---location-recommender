const NearbyPlaceList = ({
  places,
  placesLoading,
  placesError,
  formatDistance,
  getCategoryName,
  getCategoryStyle,
  onPlaceClick,
}) => {
  return (
    <aside className="h-[700px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-bold text-slate-900">근처 장소 {places.length}곳</h2>
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
                onClick={() => onPlaceClick(place)}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-left transition hover:border-slate-400 hover:bg-white"
              >
                <span className="block text-sm font-bold text-slate-950">
                  {place.place_name}
                </span>
                <span className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className={`rounded-full px-2 py-0.5 ${getCategoryStyle(place).badge}`}>
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
  );
};

export default NearbyPlaceList;
