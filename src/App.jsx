import { Navigate, Route, Routes } from "react-router-dom";
import GlobalLayout from "./layout/GlobalLayout";
import DetailPage from "./pages/Detail/DetailPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import MainCategory from "./pages/MainCategory/MainCategory";
import MapPage from "./pages/Map/MapPage";

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route index element={<MainCategory />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        {/* 디테일은 url 파라미터로 변경할 예정 */}
        <Route path="/detail" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
