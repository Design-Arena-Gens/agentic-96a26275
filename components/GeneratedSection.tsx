import { AnimatePresence, motion } from "framer-motion";
import { GeneratedItem } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type GeneratedSectionProps = {
  headline: string;
  description: string;
  items: GeneratedItem[];
  loading?: boolean;
};

export function GeneratedSection({
  headline,
  description,
  items,
  loading
}: GeneratedSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">{headline}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-4">
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="mt-6 grid gap-4">
            {items.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="gradient-border rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{item.body}</p>
                {item.cta && (
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                    {item.cta}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
