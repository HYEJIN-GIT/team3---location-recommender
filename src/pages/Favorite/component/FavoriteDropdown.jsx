import React from 'react'

const FavoriteDropdown = () => {
  return (
    <div className='m-4'>
      <div className="dropdown dropdown-start">
  <div tabIndex={0} role="button" className="btn m-1">전체 보기 ▿</div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>최신순</a></li>
    <li><a>방문 많은 순</a></li>
  </ul>
</div>
    </div>
  )
}

export default FavoriteDropdown
