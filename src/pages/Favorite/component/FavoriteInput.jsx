import React, { useState } from 'react'
import { useFavoriteStore } from '../../../hooks/useFavoriteStore'


const FavoriteInput = ({search,setSearch}) => {



  return (
    <div>
    
      <div className='flex justify-center'>
      <label  className="input input-info w-300 mt-5 m-4" >
 
  <input type="search" required placeholder="장소 이름으로 검색" className='pl-2' value={search} onChange={(e)=>setSearch(e.target.value)}/>
</label>

</div>




 
    </div>
  
  )
}

export default FavoriteInput
