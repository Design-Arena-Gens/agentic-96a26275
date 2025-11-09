import { Lead } from "../lib/types";

type LeadCardProps = {
  lead: Lead;
  loading?: boolean;
};

export function LeadCard({ lead, loading }: LeadCardProps) {
  if (loading) {
    return (
      <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="h-4 w-2/3 rounded bg-slate-700/70" />
        <div className="mt-3 h-3 w-1/2 rounded bg-slate-800/70" />
        <div className="mt-3 h-3 w-3/4 rounded bg-slate-800/70" />
        <div className="mt-3 h-3 w-full rounded bg-slate-800/70" />
      </div>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-inner">
      <h3 className="text-base font-semibold text-white">{lead.name}</h3>
      <p className="text-xs uppercase tracking-wide text-cyan-200/80">
        {lead.segment}
      </p>

      <div className="mt-3 space-y-1 text-sm text-slate-300">
        <p>
          <span className="text-slate-400">Email:</span> {lead.email}
        </p>
        <p>
          <span className="text-slate-400">Phone:</span> {lead.phone}
        </p>
      </div>

      <p className="mt-3 text-sm text-slate-300">{lead.persuasionHook}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-200/80">
        Next Step: {lead.nextStep}
      </p>
    </article>
  );
}
