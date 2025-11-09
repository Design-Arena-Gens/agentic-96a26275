import { AnimatePresence, motion } from "framer-motion";
import { AgentResponse } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type InsightsGridProps = {
  response: AgentResponse;
  loading?: boolean;
};

export function InsightsGrid({ response, loading }: InsightsGridProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">
          Growth Control Tower
        </h2>
        <p className="text-sm text-slate-300">
          KPI अनुमान, funnel automation और revenue acceleration insights यहाँ
          दिखाई देंगे। इन्हें अपनी marketing ops sheet में sync करें।
        </p>
      </div>

      {loading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
      ) : (
        <AnimatePresence>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {response.growthInsights.map((insight) => (
              <motion.div
                key={insight.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-cyan-300/80">
                  {insight.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {insight.value}
                </p>
                <p className="mt-3 text-sm text-slate-300">{insight.detail}</p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
