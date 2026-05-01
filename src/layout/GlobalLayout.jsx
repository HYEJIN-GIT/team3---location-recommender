import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const GlobalLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="px-4 py-8 md:py-10 flex-1">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default GlobalLayout;
