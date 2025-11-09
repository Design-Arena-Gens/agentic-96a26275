import { AnimatePresence, motion } from "framer-motion";
import { AgentResponse } from "../lib/types";
import { SkeletonBlock } from "./SkeletonBlock";

type PersonaLensProps = {
  response: AgentResponse;
  loading?: boolean;
};

export function PersonaLens({ response, loading }: PersonaLensProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-white">Persona Signal Lens</h2>
        <p className="text-sm text-slate-300">
          Persona-specific messaging और conversion playbook यहाँ दिखाई देता है।
          इसका उपयोग DM scripts और creative angles refine करने के लिए करें।
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
            {response.personas.map((persona) => (
              <motion.div
                key={persona.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">
                    {persona.label}
                  </h3>
                  <span className="rounded-full border border-cyan-500/40 bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-100">
                    Buying Signal
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  {persona.description}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-cyan-200/90">
                  Signal: {persona.buyingSignal}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  Conversion Play: {persona.conversionPlay}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
