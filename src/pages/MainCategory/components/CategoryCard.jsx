function CategoryCard({ icon, title }) {
  return (
    <article className="flex h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] hover:bg-[#faf7ff]">
      <span className="text-4xl leading-none">{icon}</span>
      <p className="text-xl font-bold tracking-tight text-slate-800">{title}</p>
    </article>
  );
}

export default CategoryCard;
