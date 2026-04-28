import { Navigate, Route, Routes } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import DetailPage from "./pages/Detail/DetailPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import MainCategory from "./pages/MainCategory/MainCategory";
import MapPage from "./pages/Map/MapPage";
import PlacesPage from "./pages/Places/PlacesPage";
// import { useAddressToCoordinateQuery } from './hooks/useAddressToCoordinate'
// import { useCategorySearchPlaceQuery } from './hooks/useCategorySearchPlace'
// import { useCoordinateToAddressQuery } from './hooks/useCoordinateToAddress'
// import { useKeywordSearchPlaceQuery } from './hooks/useKeywordSearchPlace'

function App() {

  // const coordinate = { lat: 37.5665, lng: 126.9780 };

  // const { data: data1 } = useAddressToCoordinateQuery({ address: '인사동' });
  // const { data: data2 } = useCategorySearchPlaceQuery({ category: 'CE7' });
  // const { data: data3 } = useCoordinateToAddressQuery({ coordinate });
  // const { data: data4 } = useKeywordSearchPlaceQuery({ keyword: '인사동' });

  // console.log("data1:", data1);
  // console.log("data2:", data2);
  // console.log("data3:", data3);
  // console.log("data4:", data4);

  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route index element={<MainCategory />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        {/* 디테일은 url 파라미터로 변경할 예정 */}
        <Route path="/detail" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
