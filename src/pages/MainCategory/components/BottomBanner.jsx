function BottomBanner({ text }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-700">{text}</p>
    </div>
  );
}

export default BottomBanner;
