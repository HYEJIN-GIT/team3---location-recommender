function CategoryCard({ icon, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-32 w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-3 shadow-sm transition-transform duration-200 ease-out hover:bg-[#faf7ff] sm:min-h-36 sm:gap-2 sm:rounded-2xl sm:py-4 [@media(hover:hover)_and_(pointer:fine)]:h-40 [@media(hover:hover)_and_(pointer:fine)]:min-h-40 [@media(hover:hover)_and_(pointer:fine)]:gap-0 [@media(hover:hover)_and_(pointer:fine)]:py-0 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.03]"
    >
      <span className="text-3xl leading-none transition-transform duration-200 ease-out sm:text-4xl [@media(hover:hover)_and_(pointer:fine)]:text-5xl [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-1">
        {icon}
      </span>
      <p
        className="line-clamp-2 w-full max-w-full break-keep px-1 text-center text-xs font-bold tracking-tight text-slate-800 sm:text-sm [@media(hover:hover)_and_(pointer:fine)]:line-clamp-none [@media(hover:hover)_and_(pointer:fine)]:max-h-0 [@media(hover:hover)_and_(pointer:fine)]:overflow-hidden [@media(hover:hover)_and_(pointer:fine)]:p-0 [@media(hover:hover)_and_(pointer:fine)]:text-xl [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:transition-all [@media(hover:hover)_and_(pointer:fine)]:duration-200 [@media(hover:hover)_and_(pointer:fine)]:ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:mt-3 [@media(hover:hover)_and_(pointer:fine)]:group-hover:max-h-10 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100"
      >
        {title}
      </p>
    </button>
  );
}

export default CategoryCard;
