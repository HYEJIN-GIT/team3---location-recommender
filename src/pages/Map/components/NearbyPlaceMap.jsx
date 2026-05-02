import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";

const getTooltipLabel = (place) => place.place_name || "place";

const MapPin = ({ colorClass, hoverColorClass = "", ringColorClass, label, onClick }) => {
  const PinWrapper = onClick ? "button" : "span";

  return (
    <PinWrapper
      {...(onClick ? { type: "button", onClick } : { role: "img" })}
      aria-label={label}
      className={`relative h-11 w-9 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringColorClass}`}
      title={label}
    >
      <span
        className={`absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rotate-45 rounded-[50%_50%_0_50%] border-2 border-white shadow-lg transition ${colorClass} ${hoverColorClass}`}
      />
      <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white" />
    </PinWrapper>
  );
};

const NearbyPlaceMap = ({
  location,
  mapLevel,
  places,
  favoriteIds,
  onPlaceClick,
}) => {
  return (
    <div className="h-[700px] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
      <Map center={location} level={mapLevel} className="h-full w-full">
        <CustomOverlayMap position={location} zIndex={1100} yAnchor={1}>
          <div className="tooltip tooltip-top z-[9999]" data-tip="현재 위치">
            <MapPin
              colorClass="bg-red-500"
              hoverColorClass="hover:bg-red-400"
              ringColorClass="focus:ring-red-500"
              label="Current location"
            />
          </div>
        </CustomOverlayMap>

        {places.map((place) => {
          const isFavorite = favoriteIds.has(String(place.id));
          const markerColor = isFavorite ? "bg-yellow-400" : "bg-slate-950";
          const markerHoverColor = isFavorite ? "hover:bg-yellow-300" : "hover:bg-slate-700";
          const markerRingColor = isFavorite ? "focus:ring-yellow-400" : "focus:ring-slate-900";

          return (
            <CustomOverlayMap
              key={place.id}
              position={{ lat: Number(place.y), lng: Number(place.x) }}
              zIndex={1000}
              yAnchor={1}
            >
              <div
                className="tooltip tooltip-top z-[9999]"
                data-tip={getTooltipLabel(place)}
              >
                <MapPin
                  colorClass={markerColor}
                  hoverColorClass={markerHoverColor}
                  ringColorClass={markerRingColor}
                  label={`${getTooltipLabel(place)} details`}
                  onClick={() => onPlaceClick(place)}
                />
              </div>
            </CustomOverlayMap>
          );
        })}
      </Map>
    </div>
  );
};

export default NearbyPlaceMap;
