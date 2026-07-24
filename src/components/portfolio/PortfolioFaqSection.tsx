import { useState } from "react";

const faqs = [
  {
    question: "What kinds of projects do you usually take on?",
    answer:
      "Brand systems, motion storytelling, packaging, social campaigns, and polished visual direction for launches and product storytelling.",
  },
  {
    question: "Can I request a custom direction for a new brand?",
    answer:
      "Yes. I can shape concepts around your audience, product, or campaign goals and build a direction that feels rooted in your identity.",
  },
  {
    question: "How do we begin?",
    answer:
      "Start with a short brief and a few references. From there, I turn it into a clear creative direction and a practical rollout plan.",
  },
];

export default function PortfolioFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#050505] px-6 pb-24 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-4xl border border-white/10 bg-zinc-950/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0055FF]">
            Frequently asked
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Questions that usually come up before a project starts.
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-[20px] border border-white/10 bg-white/3"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base font-medium text-white">
                    {item.question}
                  </span>
                  <span className="text-xl text-[#0055FF]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="px-5 pb-5 text-sm leading-7 text-zinc-400">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
