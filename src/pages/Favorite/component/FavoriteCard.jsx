import React,{ useState}from 'react'
import { useNavigate} from 'react-router-dom'
import { PLACE_CATEGORY_STYLE_BY_CODE } from '../../../constants/placeCategories';
import {  codeName } from '../../../utils/getCodeName';
import { useFavoriteStore } from '../../../hooks/useFavoriteStore';


const FavoriteCard = ({item,rank}) => {


  
  const {removeFavorite,updateRating}  = useFavoriteStore()
  
  const code =   codeName(item.category_name);
  const style = PLACE_CATEGORY_STYLE_BY_CODE[code];
  const [toast,setToast] = useState(false)

  const navigate = useNavigate()
  const goToDetail = () => {
    navigate("/detail", {
      state: { place: item } 
    });
  };



  return (
    <div className='m-4' >
      <div className="block md:hidden">

      <div className="card bg-base-100 shadow-md">

{/* 이미지/아이콘 */}
<figure>
  <div
    className="w-full h-40 flex items-center justify-center text-5xl bg-amber-50 cursor-pointer"
    onClick={goToDetail}
  >
    {item.category_name?.includes("카페") ? "☕️" 
    : item.category_name?.includes("음식점") ? "🍲"
    : item.category_name?.includes("관광명소") ? "🎯"
    : "🎨"}
  </div>
</figure>

<div className="card-body p-4">

  {/* 제목 + 별점 */}
  <div className="flex justify-between items-center">
    <h2 className="font-bold text-lg truncate">
      {item.place_name}
    </h2>

    <div className="rating rating-sm">
      {[1,2,3,4,5].map((star)=>(
        <input
          key={star}
          type="radio"
          name={`rating-${item.id}-mobile`}
          className="mask mask-star-2 bg-orange-400"
          checked={item.rating === star}
          onChange={()=>updateRating(item.id, star)}
        />
      ))}
    </div>
  </div>

  {/* 카테고리 */}
  <span className={`w-fit px-2 py-1 text-xs rounded-xl ${style?.badge}`}>
    {item.category_name?.split(">").pop()}
  </span>

  {/* 주소 */}
  <div className="text-sm text-gray-500 truncate">
    {item.address_name}
  </div>

  {/* 거리 */}
  <div className="text-sm text-gray-400">
    📍 {item.distance}m
  </div>

  {/* 버튼 */}
  <div className="flex gap-2 mt-3">
    <button 
      className="btn btn-sm flex-1"
      onClick={goToDetail}
    >
      상세보기
    </button>

    <button 
      className="btn btn-sm  flex-1"
      onClick={()=>removeFavorite(item.id)}
    >
      삭제
    </button>
  </div>

</div>
</div>


      </div>


  <div className="hidden md:block">
      <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <span className='rounded-lg  m-4 bg-gray-300 p-1  text-gray-900 h-9 w-9 text-center absolute left-0 top-0'>{rank+1}</span>
    <div className='flex justify-center items-center m-4'>
    <div className='bg-amber-50 text-4xl m-4 p-20 cursor-pointer' onClick={goToDetail}>
  {item.category_name?.includes("카페") ? "☕️" 
  : item.category_name?.includes("음식점")?"🍲"
  :item.category_name?.includes("관광명소")?"🎯":
  "🎨"} 

</div>
    </div>

  </figure>
  
  <div className="card-body">
    <div className='flex justify-between mt-3'>
      <div className='flex'>
       <h2 className="card-title">{item.place_name}</h2>
        <span className={`m-2 ml-3 p-1 text-xs rounded-2xl ${style?.badge}`}>
        {item.category_name?.split(">").pop()}
        </span>
      </div>
    
<div className="rating mr-5 mt-2">
  {[1, 2, 3, 4, 5].map((star) => (
   
    <input
      key={star}
      type="radio"
      name={`rating-${item.id}-pc`} 
      className="mask mask-star-2 bg-orange-400"
      checked={item.rating === star}
      onChange={() => updateRating(item.id, star)}
    />
  ))}
</div>


    </div>
    
    <div className='text-gray-500'>{item.address_name}</div>
    <div className='text-gray-500'>📞 {item.phone.length===0?"전화번호가 없습니다" :item.phone}</div>
    <div className='text-gray-500'>현재 위치에서 {item.distance}m</div>
    <div className="card-actions justify-baseline mt-auto">
  
    

    </div>
    <div className="card-actions justify-end mt-auto">
        <button className="btn btn-ghost " onClick={goToDetail}>바로가기</button>
        <button className=" btn btn-ghost" onClick={()=>removeFavorite(item.id)}>즐겨찾기 삭제</button>
    </div>
  </div>
</div>
</div>
    </div>
  )
}

export default FavoriteCard
