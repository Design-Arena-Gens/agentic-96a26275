export function SkeletonBlock() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="h-4 w-1/2 rounded bg-slate-700/70" />
      <div className="mt-3 h-3 w-full rounded bg-slate-800/70" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-800/70" />
    </div>
  );
}
