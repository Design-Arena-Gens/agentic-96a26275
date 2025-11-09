import { AnimatePresence, motion } from "framer-motion";
import { AgentResponse } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type ScenarioPlannerProps = {
  response: AgentResponse;
  loading?: boolean;
};

export function ScenarioPlanner({ response, loading }: ScenarioPlannerProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Deal Rescue Playbook</h2>
        <p className="text-sm text-slate-300">
          सबसे common objections और growth bottlenecks के लिए ready-made
          response plan। अपनी sales squad के साथ साझा करें।
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
            {response.scenarios.map((scenario) => (
              <motion.div
                key={scenario.trigger}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <h3 className="text-base font-semibold text-white">
                  {scenario.trigger}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {scenario.responsePlan.map((step) => (
                    <li
                      key={step}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs uppercase tracking-wide text-emerald-200/80">
                  Success Metric: {scenario.successMetric}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
