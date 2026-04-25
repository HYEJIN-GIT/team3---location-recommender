import React from 'react'

const FavoriteInput = () => {
  return (
    <div className='flex justify-center'>
      <label  className="input input-warning w-200 mt-5" >
 
  <input type="search" required placeholder="장소 이름으로 검색" className='pl-2'/>
</label>

<button className="btn btn-soft btn-warning mt-5 m-2 text-gray-800">
<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>

</button>
    </div>
  )
}

export default FavoriteInput
