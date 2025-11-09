"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentResponse, defaultAgentResponse } from "../lib/types";
import { AudienceStrategy } from "../components/AudienceStrategy";
import { GeneratedSection } from "../components/GeneratedSection";
import { InsightsGrid } from "../components/InsightsGrid";
import { LeadCard } from "../components/LeadCard";
import { PersonaLens } from "../components/PersonaLens";
import { ProTips } from "../components/ProTips";
import { ScenarioPlanner } from "../components/ScenarioPlanner";
import { clsx } from "clsx";

type FormState = {
  productName: string;
  category: string;
  price: string;
  condition: "new" | "used";
  description: string;
  targetLocation: string;
  budget: string;
  inventory: string;
  shippingOption: "delivery" | "pickup" | "both";
  sellerStrength: string;
};

const initialFormState: FormState = {
  productName: "",
  category: "",
  price: "",
  condition: "new",
  description: "",
  targetLocation: "",
  budget: "",
  inventory: "",
  shippingOption: "both",
  sellerStrength: ""
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [response, setResponse] = useState<AgentResponse>(defaultAgentResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubmitDisabled = useMemo(() => {
    return (
      !form.productName ||
      !form.category ||
      !form.description ||
      !form.targetLocation ||
      !form.price
    );
  }, [form]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled || isLoading) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Unable to generate marketplace growth plan.");
      }

      const data = (await res.json()) as AgentResponse;
      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-10">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400/70">
            फेसबुक मार्केटप्लेस ग्रोथ एजेंट
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-slate-50 lg:text-4xl">
            अपनी Facebook Marketplace लिस्टिंग को AI के साथ 10x तेज़ी से बढ़ाएं।
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            यह एजेंट आपके प्रोडक्ट के लिए उच्च-परफॉर्मिंग विज्ञापन लिखता है,
            ऑडियंस टार्गेटिंग तय करता है, संभावित खरीदारों की सूची बनाता है और
            बिक्री बढ़ाने के लिए लाइव एक्शन प्लान तैयार करता है। बस product
            details भरें और बाकी काम एजेंट संभालेगा।
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          onSubmit={handleSubmit}
          className="group flex flex-col gap-5 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Product Intelligence Input
            </h2>
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-xs font-medium tracking-wide",
                isSubmitDisabled
                  ? "bg-slate-800 text-slate-400"
                  : "bg-primary-500/20 text-primary-300 ring-1 ring-inset ring-primary-500/40"
              )}
            >
              {isSubmitDisabled ? "स्वरूप पूर्ण करें" : "सब कुछ तैयार"}
            </span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Product Name*
              <input
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.productName}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    productName: event.target.value
                  }))
                }
                placeholder="उदाहरण: iPhone 13 Pro Max"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Category*
              <select
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    category: event.target.value
                  }))
                }
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion & Lifestyle</option>
                <option value="home">Home & Furniture</option>
                <option value="automotive">Automotive</option>
                <option value="fitness">Sports & Fitness</option>
                <option value="beauty">Beauty & Personal Care</option>
                <option value="collectibles">Collectibles</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Price (INR)*
              <input
                type="number"
                min="0"
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.price}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    price: event.target.value
                  }))
                }
                placeholder="उदाहरण: 69999"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Condition
              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                {(["new", "used"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={clsx(
                      "rounded-lg px-3 py-1 text-sm font-semibold transition",
                      form.condition === value
                        ? "bg-primary-500 text-white shadow"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    )}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, condition: value }))
                    }
                  >
                    {value === "new" ? "Brand New" : "Pre-Loved"}
                  </button>
                ))}
              </div>
            </label>

            <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-200">
              Product Description*
              <textarea
                rows={3}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value
                  }))
                }
                placeholder="USP, key specs, warranty, freebies आदि लिखें..."
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Target City / Area*
              <input
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.targetLocation}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    targetLocation: event.target.value
                  }))
                }
                placeholder="उदाहरण: Mumbai, Andheri West"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Weekly Ad Budget (INR)
              <input
                type="number"
                min="0"
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.budget}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    budget: event.target.value
                  }))
                }
                placeholder="उदाहरण: 4000"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Available Inventory
              <input
                type="number"
                min="1"
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.inventory}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    inventory: event.target.value
                  }))
                }
                placeholder="उदाहरण: 12"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Fulfilment Option
              <select
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.shippingOption}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    shippingOption: event.target.value as FormState["shippingOption"]
                  }))
                }
              >
                <option value="both">Delivery + In-person</option>
                <option value="delivery">Delivery only</option>
                <option value="pickup">Pickup only</option>
              </select>
            </label>

            <label className="sm:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-200">
              Seller Strength (testimonials, quick replies, etc.)
              <textarea
                rows={2}
                className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-base text-white outline-none ring-primary-500 focus:ring-2"
                value={form.sellerStrength}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    sellerStrength: event.target.value
                  }))
                }
                placeholder="उदाहरण: 4.9 rating, same-day delivery, No questions asked return"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled || isLoading}
            className={clsx(
              "mt-2 inline-flex items-center justify-center rounded-2xl border border-slate-500/40 px-5 py-3 text-base font-semibold text-white transition",
              isSubmitDisabled || isLoading
                ? "cursor-not-allowed bg-slate-800 text-slate-500"
                : "bg-primary-500 hover:bg-primary-400"
            )}
          >
            {isLoading ? "Generating strategy..." : "Generate GTM Blueprint"}
          </button>

          <AnimatePresence>
            {error && (
              <motion.div
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-3 text-sm text-red-200"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="flex flex-col gap-6">
          <GeneratedSection
            headline="Hyper-Relevant Ad Copy"
            description="AI आपके product USP को highlight करते हुए तीन विज्ञापन ready करता है। एक headline, primary text और CTA शामिल है ताकि आप सीधे Facebook campaign manager में पेस्ट कर सकें।"
            items={response.adCopy}
            loading={isLoading}
          />
          <AudienceStrategy items={response.audienceStrategy} loading={isLoading} />
        </div>
      </section>

      <InsightsGrid response={response} loading={isLoading} />

      <section className="grid gap-6 lg:grid-cols-2">
        <PersonaLens response={response} loading={isLoading} />
        <ScenarioPlanner response={response} loading={isLoading} />
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
        <h2 className="text-xl font-semibold text-white">
          Qualified Lead Radar
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          ये lead cards फेसबुक समूहों, व्हाट्सएप community और स्थानीय buyers
          segments से generated persona-आधारित सुझाव हैं। संपर्क करने से पहले
          हमेशा वास्तविक availability confirm करें।
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {response.leads.map((lead) => (
            <LeadCard key={lead.email} lead={lead} loading={isLoading} />
          ))}
        </div>
      </section>

      <ProTips response={response} loading={isLoading} />
    </main>
  );
}
