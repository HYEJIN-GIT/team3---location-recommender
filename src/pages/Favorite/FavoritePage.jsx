import { useState } from "react";
import FavoriteButtonCategory from "./component/FavoriteButtonCategory";
import FavoriteCard from "./component/FavoriteCard";
// import FavoriteDropdown from "./component/FavoriteDropdown";
import FavoriteInput from "./component/FavoriteInput";
import { useFavoriteStore } from "../../hooks/useFavoriteStore";
import {  codeName } from "../../utils/getCodeName";


const FavoritePage = () => {
   
  const { favorites } = useFavoriteStore();


  const [search, setSearch] = useState("")
  const [active, setActive] = useState("ALL")

  
  const filter = favorites.filter(item => {
    const code =  codeName(item.category_name);
    return (
      item.place_name.toLowerCase().includes(search.toLowerCase()) &&
      (active === "ALL" || code === active)
    );
  });
  



  return (  
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center mb-2">
       내 즐겨찾기
      </h1>
    <FavoriteInput search={search} setSearch={setSearch}></FavoriteInput>
    <FavoriteButtonCategory active={active} setActive={setActive}></FavoriteButtonCategory>
    {/* <FavoriteDropdown distanceArea={distanceArea} setDistanceArea={setDistanceArea}></FavoriteDropdown> */}
<div>

    
        
       
</div>


{
  filter.length === 0 ? 
  <div className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center mb-2"> 즐겨찾기를 추가해주세요
  </div> :
   filter.map((item,index)=>(
    <FavoriteCard key={item.id} item={item} rank={index}></FavoriteCard>
  ))
}
    
    </section>
  );
};

export default FavoritePage;
