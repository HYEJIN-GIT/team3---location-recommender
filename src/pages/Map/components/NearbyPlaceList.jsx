const NearbyPlaceList = ({
  places,
  placesLoading,
  placesError,
  formatDistance,
  getCategoryName,
  getCategoryStyle,
  favoriteIds,
  onPlaceClick,
  onFavoriteToggle,
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
          {places.map((place) => {
            const isFavorite = favoriteIds.has(String(place.id));

            return (
              <li
                key={place.id}
                className="flex overflow-hidden rounded-md border border-slate-200 bg-slate-50 transition hover:border-slate-400 hover:bg-white"
              >
                <button
                  type="button"
                  onClick={() => onPlaceClick(place)}
                  className="min-w-0 flex-1 px-3 py-3 text-left"
                >
                  <span className="block truncate text-sm font-bold text-slate-950">
                    {place.place_name}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span className={`rounded-full px-2 py-0.5 ${getCategoryStyle(place).badge}`}>
                      {getCategoryName(place)}
                    </span>
                    <span>{formatDistance(place.distance)}</span>
                  </span>
                  <span className="mt-1 block truncate text-xs text-slate-500">
                    {place.road_address_name || place.address_name}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={`${place.place_name || "place"} ${
                    isFavorite ? "remove from favorites" : "add to favorites"
                  }`}
                  onClick={() => onFavoriteToggle(place)}
                  className={`grid w-12 shrink-0 place-items-center border-l border-slate-200 bg-white text-2xl leading-none transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset ${
                    isFavorite
                      ? "text-yellow-400 focus:ring-yellow-400"
                      : "text-slate-300 focus:ring-slate-900"
                  }`}
                  title="Toggle favorite"
                >
                  <span aria-hidden="true">&#9733;</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default NearbyPlaceList;
