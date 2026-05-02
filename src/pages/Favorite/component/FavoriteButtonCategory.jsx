import React from 'react'
import { PLACE_CATEGORY_STYLE_BY_CODE } from '../../../constants/placeCategories';
const FavoriteButtonCategory = ({active,setActive}) => {


  const buttonCategories = [
    { label: "전체", code: "ALL" },
    { label: "카페", code: "CE7" },
    { label: "음식점", code: "FD6" },
    { label: "문화시설", code: "CT1" },
    { label: "관광", code: "AT4" },
  ];
 
  return (
    <div className="m-4">
      {buttonCategories.map((item, index) => {
        const style =
          PLACE_CATEGORY_STYLE_BY_CODE[item.code] ||
          "bg-gray-600 text-gray-700";

        return (
          
          <button
            key={index}
            onClick={() => setActive(item.code)}
            className={`
              cursor-pointer
              btn 
              m-2 px-6 py-2 rounded-2xl text-sm   
              transition-all duration-200
               hover:scale-105 active:scale-95
               hover:brightness-95
             
               ${
               item.code === "ALL"
               ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                 : style.badge
               }


              ${active === item.code ? " brightness-95 border-a scale-105 cursor-pointer " : ""}
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
  
}

export default FavoriteButtonCategory
