const MapHeader = ({
  isDefaultLocation,
  locationError,
  radius,
  radiusFilters,
  selectedFilter,
  selectedCategoryName,
  onRadiusChange,
}) => {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          내 근처 장소
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-600">
          {isDefaultLocation
            ? "현재 위치 확인 중입니다."
            : `현재 위치 기준 ${selectedFilter.label} 안의 ${
                selectedCategoryName ? `${selectedCategoryName} ` : ""
              }장소를 보여줍니다.`}
        </p>
        {locationError && (
          <p className="mt-2 text-sm font-medium text-amber-700">{locationError}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {radiusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onRadiusChange(filter.value)}
            className={`btn btn-sm ${radius === filter.value ? "btn-neutral" : "btn-outline"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapHeader;
