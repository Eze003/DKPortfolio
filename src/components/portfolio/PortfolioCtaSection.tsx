import Link from "next/link";

export default function PortfolioCtaSection() {
  return (
    <section className="bg-[#050505] px-6 pb-24 pt-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center rounded-4xl border border-[#0055FF]/20 bg-[radial-gradient(circle_at_top,rgba(0,85,255,0.15),transparent_50%),linear-gradient(135deg,#0d0d0d,#080808)] px-6 py-14 text-center shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0055FF]">
          Ready when you are
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
          If you want a project that feels sharp, focused, and memorable, let’s
          build it.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/portfolio"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-[#0055FF]/40 hover:bg-[#0055FF]/10 hover:text-white"
          >
            See my work
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[#0055FF] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#0040CC]"
          >
            Book a service
          </Link>
        </div>
      </div>
    </section>
  );
}
