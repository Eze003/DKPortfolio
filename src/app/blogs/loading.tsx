import { Footer } from "@/components/Footer";

export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        <div
          aria-hidden="true"
          className="h-10 w-36 rounded bg-white/[0.08] animate-pulse mb-8 sm:mb-10"
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2 lg:gap-2"
          aria-label="Loading blogs"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="rounded-[22px] sm:rounded-[26px] border border-white/[0.08] bg-[#0c0c0c] p-2.5 sm:p-3"
            >
              <div className="aspect-[4/3] sm:aspect-[16/10] min-h-[275px] sm:min-h-[280px] md:min-h-[320px] rounded-[16px] sm:rounded-[20px] bg-white/[0.06] animate-pulse" />
              <div className="px-1 pt-3.5 pb-2 space-y-3">
                <div className="h-4 w-1/4 rounded bg-white/[0.05] animate-pulse" />
                <div className="h-6 w-5/6 rounded bg-white/[0.08] animate-pulse" />
                <div className="h-6 w-2/3 rounded bg-white/[0.08] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
