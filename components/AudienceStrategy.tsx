import { AnimatePresence, motion } from "framer-motion";
import { AudienceStrategyItem } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type AudienceStrategyProps = {
  items: AudienceStrategyItem[];
  loading?: boolean;
};

export function AudienceStrategy({ items, loading }: AudienceStrategyProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">
          Audience & Placement Strategy
        </h2>
        <p className="text-sm text-slate-300">
          इनसाइट्स बताती हैं कि किस प्रकार के buyers को target करना और किस प्रकार के
          creatives चलाना high intent traffic देगा।
        </p>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-4">
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
      ) : (
        <AnimatePresence>
          <div className="mt-6 grid gap-4">
            {items.map((item) => (
              <motion.div
                key={item.segment}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-white">
                    {item.segment}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-cyan-200/80">
                    {item.budgetSplit}
                  </p>
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  {item.positioning}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {item.creatives.map((creative) => (
                    <li
                      key={creative}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
                    >
                      {creative}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
