import React from 'react'
import { useState } from 'react'


const FavoriteButtonCategory = () => {
    const [active,setActive] = useState("전체")
const buttonCategories = ["전체","카페","식당","문화시설","관광장소"]
  return (
    <div className='m-4'>
        {
            buttonCategories.map((item,index)=>(
                <button
               
                onClick={()=>setActive(item)}
                 className={`btn btn-outline btn-warning ${active === item ? "btn-active":""} m-2`} key={index}>{item}</button>
            ))
        }
    
    </div>
  )
}

export default FavoriteButtonCategory
