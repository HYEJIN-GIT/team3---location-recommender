import BottomBanner from './components/BottomBanner';
import CategoryCard from './components/CategoryCard';
import {
  emptyCards,
  mainCategoryBannerText,
  mainCategoryTitle,
} from './constants/mainCategoryData';

function MainCategory() {
  return (
    <main className="min-h-screen bg-[#f1f9ff] px-6 py-10">
      <section className="mx-auto max-w-xl">
        <header className="mb-7">
          <h1 className="text-center text-5xl font-bold text-slate-900">{mainCategoryTitle}</h1>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {emptyCards.map((card) => (
            <CategoryCard key={card.id} />
          ))}
        </div>

        <BottomBanner text={mainCategoryBannerText} />
      </section>
    </main>
  );
}

export default MainCategory;
