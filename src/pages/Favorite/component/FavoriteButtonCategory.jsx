import React, { useEffect } from 'react'


const FavoriteButtonCategory = ({active,setActive}) => {


  const buttonCategories = [
    { label: "전체", code: "ALL" },
    { label: "카페", code: "CE7" },
    { label: "음식점", code: "FD6" },
    { label: "문화시설", code: "CT1" },
    { label: "관광", code: "AT4" },
  ];

  return (
    <div className='m-4'>

      
        {
            buttonCategories.map((item,index)=>(
                <button
               
                onClick={()=>setActive(item.code)}
                 className={`btn btn-outline btn-warning ${active === item ? "btn-active":""} m-2`} key={index}>{item.label}</button>
            ))
        }
    
    </div>
  )
}

export default FavoriteButtonCategory
