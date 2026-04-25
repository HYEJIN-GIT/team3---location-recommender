import React from 'react'

const FavoriteCard = () => {
  return (
    <div className='m-4'>
      <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <span className='rounded-lg  m-4 bg-gray-300 p-1  text-gray-900 h-9 w-9 text-center absolute left-0 top-0'>1</span>
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  
  <div className="card-body">
    <div className='flex'>
    <h2 className="card-title">카페 어디어디</h2>
    <span className='m-2 ml-3 bg-red-300 p-1 text-xs text-red-900 rounded-2xl w-10 text-center'>카페</span>
    </div>
    
    <p>서울시 성동구 서울숲 22길 땡떙</p>
    <div className="card-actions justify-end ">
        <div>
        <div className='mb-8 mr-2'>12번 방문 </div>
        <button className="btn ">♥︎</button>
        </div>
     
    </div>
  </div>
</div>
    </div>
  )
}

export default FavoriteCard
