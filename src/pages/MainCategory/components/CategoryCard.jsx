function CategoryCard({ icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 ease-out hover:scale-[1.03] hover:bg-[#faf7ff]"
    >
      <span className="text-5xl leading-none transition-transform duration-200 ease-out group-hover:-translate-y-1">
        {icon}
      </span>
      <p className="max-h-0 overflow-hidden text-xl font-bold tracking-tight text-slate-800 opacity-0 transition-all duration-200 ease-out group-hover:mt-3 group-hover:max-h-10 group-hover:opacity-100">
        {title}
      </p>
    </button>
  );
}

export default CategoryCard;
