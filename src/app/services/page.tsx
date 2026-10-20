import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const servicesList = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "I design clean, conversion-focused interfaces that help visitors understand your story, explore your work, and take action with confidence.",
    features: ["User flow planning", "Wireframes and visual systems"],
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    href: "/#contact",
  },
  {
    id: "web-design",
    title: "Web Design",
    description:
      "I craft responsive portfolio and business pages with strong hierarchy, polished sections, and layouts that make your expertise feel premium.",
    features: [
      "Landing pages and portfolios",
      "Interactive CMS & Framer setups",
    ],
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    href: "/#contact",
  },
  {
    id: "motion-design",
    title: "Motion Design",
    description:
      "Captivating 2D and 3D animations, product reels, and micro-interactions that bring static screens to life and drive engagement.",
    features: [
      "3D product animation & visualizers",
      "Kinetic typography & promotional video",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    href: "/#contact",
  },
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Complete visual identity systems, bespoke typography choices, and strategic guidelines crafted to give your business an iconic signature.",
    features: [
      "Logo marks & typography systems",
      "Comprehensive brand style guidelines",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    href: "/#contact",
  },
];

export const metadata = {
  title: "Services | DIKE Portfolio",
  description: "UI/UX Design, Web Design, Motion Design, and Brand Identity services.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      {/* ── Main Content Container ── */}
      <main className="w-full max-w-[830px] mx-auto px-6 sm:px-10 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
          Services
        </h1>

        {/* 1-Column Service Cards matching reference screenshot */}
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col md:flex-row items-center md:items-stretch gap-5 sm:gap-6 rounded-[30px] sm:rounded-[34px] border border-white/[0.08] bg-[#0c0c0c] p-2 sm:p-4 md:p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f]"
            >
              {/* Left: Thumbnail Image */}
              <div className="relative w-full md:w-[340px] lg:w-[360px] h-[260px] sm:h-[300px] md:h-[340px] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#161616] shrink-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Right: Content Column */}
              <div className="flex flex-col justify-between flex-1 w-full py-1 sm:py-2">
                <div>
                  <h3 className="text-2xl sm:text-[28px] md:text-[30px] font-semibold text-white tracking-tight mb-3 sm:mb-3.5">
                    {service.title}
                  </h3>
                  <p className="text-[15px] sm:text-base md:text-[16px] text-zinc-400 font-normal leading-relaxed mb-6 sm:mb-7">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-3 sm:space-y-3.5 mb-7 sm:mb-8 p-0 m-0 list-none">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-[14.5px] sm:text-[15.5px] text-[#fffc] font-normal"
                      >
                        <span className="flex h-5 w-5 sm:h-[22px] sm:w-[22px] shrink-0 items-center justify-center rounded-full bg-[#fffc] text-black shadow-sm">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* More Details Button (pure white, slightly increased size) */}
                <div className="pt-2">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-3.5 rounded-full bg-[#ffffff] pl-5.5 sm:pl-6.5 pr-2 sm:pr-2.5 py-2.5 text-[14.5px] sm:text-[15.5px] font-medium text-black shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] no-underline"
                  >
                    <span>More Details</span>
                    <span className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black text-[#ffffff] transition-transform duration-200 group-hover:translate-x-0.5">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer at the end of the page */}
      <Footer />
    </div>
  );
}
