import React from 'react'

const FavoriteDropdown = ({dropdownList,setDropdownList}) => {
  return (
    <div className='m-4'>
      <div className="dropdown dropdown-start">
  <div tabIndex={0} role="button" className="btn m-1">{dropdownList} ▿</div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a onClick={()=>{setDropdownList("거리순")}}>가까운순</a></li>
    <li><a onClick={()=>{setDropdownList("별점순")}}> 별점높은순</a></li>
  </ul>
</div>
    </div>
  )
}

export default FavoriteDropdown
