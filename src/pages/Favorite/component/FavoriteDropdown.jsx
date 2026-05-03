import React from 'react'

const FavoriteDropdown = ({ dropdownList, setDropdownList }) => {
  return (
    <div className='m-4'>

      {/* 모바일 */}
      <div className="block md:hidden">
        <button
          className="btn w-full"
          onClick={() => {
           
            setDropdownList(prev =>
              prev === "가까운순" ? "별점순" : "가까운순"
            )
          }}
        >
          {dropdownList} 변경
        </button>
      </div>

      {/* pc*/}
      <div className="hidden md:block">
        <div className="dropdown dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">
            {dropdownList} ▿
          </div>

          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
            <li>
              <a onClick={() => setDropdownList("가까운순")}>
                가까운순
              </a>
            </li>
            <li>
              <a onClick={() => setDropdownList("별점순")}>
                별점높은순
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default FavoriteDropdown