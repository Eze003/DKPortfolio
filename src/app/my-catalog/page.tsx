import Link from "next/link";
import { BookServiceButton } from "@/components/BookServiceButton";

const catalogItems = [
  {
    title: "Brand systems",
    description: "Identity kits, usage rules, and launch assets.",
  },
  {
    title: "Motion packs",
    description: "Explainer loops, transitions, and social-ready edits.",
  },
  {
    title: "Packaging concepts",
    description: "Flexible visual systems for product and retail storytelling.",
  },
];

export default function MyCatalogPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_50%),linear-gradient(135deg,_#060606,_#111111)] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            ← Back to portfolio
          </Link>
          <BookServiceButton label="Book a service" />
        </nav>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-black/40 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#10b981]">
              My catalog
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              A compact catalog of creative services, systems, and deliverables.
            </h1>
            <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">
              Use this as a quick overview of the ways creative work can be
              packaged—from standalone visuals to larger brand and campaign
              systems.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {catalogItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5"
              >
                <h2 className="text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
