import { useState } from "react";
import FavoriteButtonCategory from "./component/FavoriteButtonCategory";
import FavoriteCard from "./component/FavoriteCard";
import FavoriteDropdown from "./component/FavoriteDropdown";
import FavoriteInput from "./component/FavoriteInput";
import { useStore } from "../../store/useStore";
import { useFavoriteStore } from "../../hooks/useFavoriteStore";
import { PLACE_CATEGORY_NAME_BY_CODE} from "../../constants/placeCategories";
import { useLocation } from "react-router-dom";


const FavoritePage = () => {
 
  const { newFavorites} = useFavoriteStore()
  console.log(newFavorites)
  const [search, setSearch] = useState("")
  const [active, setActive] = useState("전체")
  const [distanceArea,setDistanceArea] = useState("방문순")
 
  const {examList}= useStore()
  let sorted = [...examList];

  if (distanceArea === "방문순") {
    sorted = [...examList].sort((a, b) => b.visitCount - a.visitCount);
  } else if (distanceArea === "거리순") {
    sorted = [...examList].sort((a, b) => a.distance - b.distance);
  }

  const filter = sorted.filter(item=>item.name.includes(search) &&
  (active === "전체" || item.category === active) 
)

  return (  
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center mb-2">
       내 즐겨찾기
      </h1>
    <FavoriteInput search={search} setSearch={setSearch}></FavoriteInput>
    <FavoriteButtonCategory active={active} setActive={setActive}></FavoriteButtonCategory>
    <FavoriteDropdown distanceArea={distanceArea} setDistanceArea={setDistanceArea}></FavoriteDropdown>
<div>
{
       filter.map((item,index)=>(
          <FavoriteCard item={item} rank={index} key={index}></FavoriteCard>
        ))
      }
    
</div>


    
    </section>
  );
};

export default FavoritePage;
