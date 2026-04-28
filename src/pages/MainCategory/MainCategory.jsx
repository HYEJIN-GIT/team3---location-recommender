import { useEffect, useState } from 'react';
import BottomBanner from './components/BottomBanner';
import CategoryCard from './components/CategoryCard';
import {
  mainCategoryCards,
  mainCategoryBannerMessages,
  mainCategoryBannerText,
  mainCategoryTitle,
} from './constants/mainCategoryData';

function MainCategory() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(mainCategoryBannerMessages[Math.floor(Math.random() * mainCategoryBannerMessages.length)]);
  }, []);

  return (
    <main className="bg-[#f1f9ff] px-6 py-6">
      <section className="mx-auto max-w-xl">
        <header className="mb-7">
          <h1 className="text-center text-5xl font-bold text-slate-900">{mainCategoryTitle}</h1>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {mainCategoryCards.map((card) => (
            <CategoryCard key={card.id} icon={card.icon} title={card.title} />
          ))}
        </div>

        <BottomBanner text={message || mainCategoryBannerText} />
      </section>
    </main>
  );
}

export default MainCategory;
