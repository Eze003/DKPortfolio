import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#080808] pt-0 pb-0 w-full">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-14 w-full">
        <div className="relative rounded-t-[32px] sm:rounded-t-[40px] rounded-b-none border-t border-x border-b-0 border-white/[0.08] bg-[#0c0c0c] pt-6 sm:pt-7 md:pt-8 px-6 sm:px-10 lg:px-12 pb-1 sm:pb-2 overflow-hidden flex flex-col justify-between">
          {/* Top row */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 sm:gap-8">
            {/* Creator info & copyright */}
            <div>
              <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[18px] overflow-hidden mb-3.5 border border-white/[0.08] bg-zinc-800">
                <Image
                  src="/avatar.png"
                  alt="DIKE"
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.06em] text-zinc-500 uppercase m-0 sm:whitespace-nowrap">
                &copy;2026 BERRIE. ALL RIGHTS RESERVED. THEME BY TEMPLATEGUM
              </p>
            </div>

            {/* Navigation & Social columns */}
            <div className="flex gap-14 sm:gap-20 md:gap-24">
              {/* Pages */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase mb-2.5 sm:mb-3">
                  PAGES
                </h4>
                <ul className="space-y-2 sm:space-y-2.5 p-0 m-0 list-none">
                  {[
                    { label: "Projects", href: "/projects" },
                    { label: "Blogs", href: "/blogs" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-[13px] sm:text-[14px] font-normal text-zinc-300 hover:text-white transition-colors duration-200 no-underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social media */}
              <div>
                <h4 className="text-[11px] sm:text-xs font-medium tracking-[0.14em] text-zinc-500 uppercase mb-2.5 sm:mb-3">
                  SOCIAL MEDIA
                </h4>
                <ul className="space-y-2 sm:space-y-2.5 p-0 m-0 list-none">
                  {[
                    { label: "X", href: "https://x.com" },
                    { label: "Linkedin", href: "https://linkedin.com" },
                    { label: "Instagram", href: "https://instagram.com" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-[14px] font-normal text-zinc-300 hover:text-white transition-colors duration-200 no-underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Giant watermark name */}
          <div className="relative mt-5 sm:mt-7 md:mt-8 mb-0 pb-1 text-center select-none pointer-events-none w-full overflow-hidden">
            <span className="block text-[#1f1f1f] font-light tracking-tight text-[12.5vw] sm:text-[14vw] md:text-[14.5vw] lg:text-[145px] xl:text-[165px] leading-none whitespace-nowrap">
              DIKE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
