import Link from "next/link";

export default function PortfolioHeroSection() {
  return (
    <section className="relative overflow-hidden bg-transparent px-6 pb-16 pt-24 sm:px-8 lg:px-10">

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <span className="rounded-full border border-[#0055FF]/30 bg-[#0055FF]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0055FF]">
          2026 • Selected work
        </span>
        <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
          Explore my most remarkable projects.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
          A curated collection of identity systems, motion stories, and visual
          campaigns shaped to feel bold, modern, and unmistakably yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-[#0055FF]/40 hover:bg-[#0055FF]/10 hover:text-white"
          >
            Back home
          </Link>

        </div>
      </div>
    </section>
  );
}
