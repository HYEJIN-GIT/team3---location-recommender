import { useState } from "react";
import FavoriteButtonCategory from "./component/FavoriteButtonCategory";
import FavoriteCard from "./component/FavoriteCard";
import FavoriteDropdown from "./component/FavoriteDropdown";
import FavoriteInput from "./component/FavoriteInput";
import { useFavoriteStore } from "../../hooks/useFavoriteStore";
import {  codeName } from "../../utils/getCodeName";


const FavoritePage = () => {
   
  const { favorites } = useFavoriteStore();


  const [search, setSearch] = useState("")
  const [active, setActive] = useState("ALL")
  const [dropdownList,setDropdownList] = useState("거리순")

  
  const filter = favorites.filter(item => {
    const code =  codeName(item.category_name);
    return (
      item.place_name.toLowerCase().includes(search.toLowerCase()) &&
      (active === "ALL" || code === active)
    );
  });

  const sortedList = [...filter].sort((a, b) => {
    if (dropdownList === "거리순") {
      return (a.distance || 0) - (b.distance || 0);
    }
    if (dropdownList === "별점순") {
      return (b.rating || 0) - (a.rating || 0); 
    }
  })

 

  return (  
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center mb-2">
       내 즐겨찾기
      </h1>
    <FavoriteInput search={search} setSearch={setSearch}></FavoriteInput>
    <div className="flex justify-between">
    <FavoriteButtonCategory active={active} setActive={setActive}></FavoriteButtonCategory>
    <FavoriteDropdown dropdownList={dropdownList} setDropdownList={setDropdownList}></FavoriteDropdown>
    </div>
    
<div>

    
        
       
</div>


{
  sortedList.length === 0 ? 
  <div className="text-2xl font-bold tracking-tight text-gray-600 md:text2xl text-center m-8"> 즐겨찾기를 추가해주세요
  </div> :
   sortedList.map((item,index)=>(
    <FavoriteCard key={item.id} item={item} rank={index}></FavoriteCard>
  ))
}
    
    </section>
  );
};

export default FavoritePage;
