import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from "../../../store/useStore";

const FavoriteCard = ({item,rank}) => {
  const navigate = useNavigate()
  const goToDetail=()=>{
    navigate('/detail?q=디테일')
  }
  const {deleteFavorite} = useStore()

  const deleteList = (id)=>{
    deleteFavorite(id)
  }
  return (
    <div className='m-4 cursor-pointer' >
      <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <span className='rounded-lg  m-4 bg-gray-300 p-1  text-gray-900 h-9 w-9 text-center absolute left-0 top-0'>{rank+1}</span>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" 
      onClick={goToDetail}
      />
  </figure>
  
  <div className="card-body">
    <div className='flex'>
    <h2 className="card-title">{item.name}</h2>
    <span className='m-2 ml-3 bg-red-300 p-1 text-xs text-red-900 rounded-2xl w-15 text-center'>{item.category}</span>
    </div>
    
    <p>{item.address}</p>
    <div className="card-actions justify-end ">
        <div>
        <div className='mb-8 mr-2'>{item.visitCount}번 방문 </div>
        <button className="btn btn-ghost" onClick={goToDetail}>바로가기</button>

        <button className=" btn btn-ghost text-red-400" onClick={()=>deleteList(item.id)}>♥︎</button>
        </div>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default FavoriteCard
