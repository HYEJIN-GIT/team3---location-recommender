import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const getTooltipLabel = (place) => place.place_name || "place";

const NearbyPlaceMap = ({ location, mapLevel, places, onPlaceClick }) => {
  return (
    <div className="h-[700px] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
      <Map center={location} level={mapLevel} className="h-full w-full">
        <MapMarker position={location} />

        {places.map((place) => (
          <CustomOverlayMap
            key={place.id}
            position={{ lat: Number(place.y), lng: Number(place.x) }}
            yAnchor={1}
          >
            <div className="tooltip tooltip-top" data-tip={getTooltipLabel(place)}>
              <button
                type="button"
                aria-label={getTooltipLabel(place)}
                onClick={() => onPlaceClick(place)}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </button>
            </div>
          </CustomOverlayMap>
        ))}
      </Map>
    </div>
  );
};

export default NearbyPlaceMap;
