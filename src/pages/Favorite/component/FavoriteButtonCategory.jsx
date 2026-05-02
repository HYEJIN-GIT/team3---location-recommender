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

    <div>

    {/* 모바일 */}
    <div className="block md:hidden overflow-x-auto px-2">
      <div className="flex gap-2 w-max">
        {buttonCategories.map((item, index) => {
          const style =
            PLACE_CATEGORY_STYLE_BY_CODE[item.code] ||
            "bg-gray-200 text-gray-700";

          return (
            <button
              key={index}
              onClick={() => setActive(item.code)}
              className={`
                whitespace-nowrap
                px-4 py-2 rounded-full text-xs
                transition-all duration-200
                
                ${
                  item.code === "ALL"
                    ? "bg-gray-200 text-gray-800"
                    : style.badge
                }

                ${
                  active === item.code
                    ? "scale-105 brightness-90 font-semibold"
                    : "opacity-80"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>

    {/* PC */}
    <div className="hidden md:block m-4">
      {buttonCategories.map((item, index) => {
        const style =
          PLACE_CATEGORY_STYLE_BY_CODE[item.code] ||
          "bg-gray-200 text-gray-700";

        return (
          <button
            key={index}
            onClick={() => setActive(item.code)}
            className={`
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

              ${
                active === item.code
                  ? "brightness-95 scale-105"
                  : ""
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>

  </div>
);
    
   
 
  
}

export default FavoriteButtonCategory
