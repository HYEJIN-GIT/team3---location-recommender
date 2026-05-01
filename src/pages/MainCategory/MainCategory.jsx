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
    <main className="h-[calc(100dvh-148px)] overflow-hidden px-6 py-1 md:h-[calc(100dvh-164px)]">
      <section className="mx-auto flex h-full w-full max-w-xl flex-col">
        <header className="mb-4">
          <p className="text-center text-lg font-bold text-slate-700">
            {message || mainCategoryBannerText}
          </p>
        </header>

        <div className="mt-10 flex-1">
          <div className="grid gap-3 sm:grid-cols-2">
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
            className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-[#faf7ff] text-slate-700 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-2xl leading-none">🗺️</span>
            <span className="text-base font-bold leading-none">내 주변 모든 곳 찾기</span>
          </button>
        </div>

        <p className="pt-4 pb-2 text-center text-base font-semibold text-slate-700">
        📍현재 위치를 기준으로 300m, 500m, 1km 안의 장소를 선택해 확인해보세요.
        </p>

      </section>
    </main>
  );
}

export default MainCategory;
