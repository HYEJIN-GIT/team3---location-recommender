import FavoriteButtonCategory from "./component/FavoriteButtonCategory";
import FavoriteCard from "./component/FavoriteCard";
import FavoriteDropdown from "./component/FavoriteDropdown";
import FavoriteInput from "./component/FavoriteInput";

const FavoritePage = () => {
  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center mb-2">
       내 즐겨찾기
      </h1>
      <FavoriteInput></FavoriteInput>
      <FavoriteButtonCategory></FavoriteButtonCategory>
      <FavoriteDropdown></FavoriteDropdown>
      <FavoriteCard></FavoriteCard>
    </section>
  );
};

export default FavoritePage;
