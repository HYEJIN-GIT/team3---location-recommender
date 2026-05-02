import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CategoryCard from './components/CategoryCard';
import {
  mainCategoryCards,
  mainCategoryBannerMessages,
  mainCategoryBannerText,
} from './constants/mainCategoryData';

function MainCategory() {
  const navigate = useNavigate();
  const [message] = useState(
    () => mainCategoryBannerMessages[Math.floor(Math.random() * mainCategoryBannerMessages.length)]
  );

  return (
    <main className="mx-auto w-full min-w-0 max-w-xl px-3 py-1 pb-10 sm:px-6">
      <section className="flex w-full min-w-0 flex-col">
        <header className="mb-3 sm:mb-4">
          <p className="break-keep px-0.5 text-center text-[0.95rem] font-bold leading-snug text-balance text-slate-700 sm:text-lg sm:leading-normal">
            {message || mainCategoryBannerText}
          </p>
        </header>

        <div className="mt-4 min-w-0 sm:mt-10">
          <div className="mx-auto min-w-0 w-full max-sm:w-[86%] max-sm:max-w-[17.25rem] sm:max-w-none">
            <div className="grid min-w-0 gap-2 sm:grid-cols-2 sm:gap-3">
              {mainCategoryCards.map((card) => (
                <CategoryCard
                  key={card.id}
                  icon={card.icon}
                  title={card.title}
                  onClick={() => navigate(`/map?category=${card.category}`)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/map')}
              className="mt-5 flex min-h-12 w-full min-w-0 cursor-pointer flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-xl border border-slate-200 bg-[#faf7ff] px-2.5 py-2.5 text-slate-700 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] sm:mt-7 sm:min-h-14 sm:gap-x-2 sm:rounded-2xl sm:px-3 sm:py-0 sm:flex-nowrap"
            >
              <span className="shrink-0 text-xl leading-none sm:text-2xl">🗺️</span>
              <span className="min-w-0 text-center text-xs font-bold leading-tight sm:text-base sm:leading-none">
                내 주변 모든 곳 찾기
              </span>
            </button>
          </div>
        </div>

        <p className="mt-8 px-0.5 pt-2 pb-2 text-center text-xs font-semibold leading-relaxed text-slate-700 max-md:break-keep max-md:text-balance sm:mt-10 md:whitespace-nowrap md:text-base">
          📍현재 위치를 기준으로 300m, 500m, 1km 안의 장소를 선택해 확인해보세요.
        </p>
      </section>
    </main>
  );
}

export default MainCategory;
