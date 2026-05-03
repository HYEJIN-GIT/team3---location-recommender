const ListSkeleton = () => {
  return (
    <ul className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-md border border-slate-200 bg-white px-3 py-3"
        >
          <div className="skeleton h-4 w-3/5 rounded-full bg-slate-200" />
          <div className="mt-3 flex items-center gap-2">
            <div className="skeleton h-5 w-16 rounded-full bg-slate-200" />
            <div className="skeleton h-3 w-10 rounded-full bg-slate-200" />
          </div>
          <div className="skeleton mt-3 h-3 w-4/5 rounded-full bg-slate-200" />
        </li>
      ))}
    </ul>
  );
};

const EmptyState = ({ title, description, tone = "neutral" }) => {
  const toneClass =
    tone === "error"
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <div className={`rounded-lg border px-4 py-5 text-center ${toneClass}`}>
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-1 text-xs font-medium opacity-80">{description}</p>
    </div>
  );
};

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
        {placesLoading && <ListSkeleton />}

        {!placesLoading && placesError && (
          <EmptyState
            tone="error"
            title="장소를 불러오지 못했어요"
            description="잠시 후 다시 시도하거나 거리를 바꿔보세요."
          />
        )}

        {!placesLoading && !placesError && places.length === 0 && (
          <EmptyState
            title="표시할 장소가 없어요"
            description="거리 범위를 넓히면 더 많은 장소를 볼 수 있어요."
          />
        )}

        {!placesLoading && !placesError && places.length > 0 && (
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
        )}
      </div>
    </aside>
  );
};

export default NearbyPlaceList;
