import { AnimatePresence, motion } from "framer-motion";
import { AgentResponse } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type ProTipsProps = {
  response: AgentResponse;
  loading?: boolean;
};

export function ProTips({ response, loading }: ProTipsProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">
          Command Centre Suggestions
        </h2>
        <p className="text-sm text-slate-300">
          Agent weekly sprints, automation reminders और creative refresh cadence
          provide करता है। इन्हें अपने Notion या CRM में sync करें।
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
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {response.proTips.map((tip) => (
              <motion.div
                key={tip.category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <h3 className="text-base font-semibold text-white">
                  {tip.category}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {tip.recommendations.map((recommendation) => (
                    <li className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2" key={recommendation}>
                      {recommendation}
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
