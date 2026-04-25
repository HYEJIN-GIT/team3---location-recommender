import { Outlet } from "react-router-dom";
import Header from "./Header";

const GlobalLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-8 md:py-10">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default GlobalLayout;
