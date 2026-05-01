import { NavLink } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
const navItems = [

  { to: "/favorite", label: "즐겨찾기" },
 
];

const Header = () => {
  const authenticate = useAuthStore((state) => state.authenticate);
  const logout = useAuthStore((state) => state.logout);
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-base-100/85 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="navbar min-h-[72px] px-0">
          <div className="navbar-start">
          <img src="src/layout/Pasted Graphic.png" width={50}></img>
            <NavLink
              to="/"
              className="cursor-pointer px-0  mt-2 text-lg font-extrabold text-slate-900 hover:bg-transparent"
            >
            
              오늘은 어디로
            </NavLink>
          </div>

          <div className="navbar-end">
            <nav aria-label="주요 메뉴">
              <ul className="menu menu-horizontal gap-2 rounded-box bg-base-100/70 p-1 shadow-sm">
                
                
                
                
                {navItems.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-full bg-slate-100 font-semibold text-slate-800 hover:bg-slate-100"
                          : "rounded-full font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
                 <li>
                 {authenticate ? (
  <button
    onClick={logout}
    className="rounded-full text-500 px-3"
  >
    로그아웃
  </button>
) : (
  <NavLink to="/login">로그인</NavLink>
)}
      </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
