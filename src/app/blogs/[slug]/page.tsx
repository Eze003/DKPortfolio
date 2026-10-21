import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";

interface BlogPost {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  paragraphs: string[];
}

const blogsDatabase: Record<string, BlogPost> = {
  "typography-arsenal": {
    id: "typography-arsenal",
    slug: "typography-arsenal",
    tag: "TYPOGRAPHY",
    title:
      "Why Typography Is the Most Underestimated Tool in a Designer's Arsenal",
    subtitle:
      "Before you reach for a new color or a new layout, ask yourself: have you truly mastered what your type is doing? Typography is not decoration — it is structure, voice, and emotion simultaneously.",
    date: "Apr 3, 2026",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "There is a version of design education that teaches typography as a module — something you learn in semester two between color theory and layout principles, then apply dutifully and forget to love. That version produces designers who treat type as a container for words rather than a medium in its own right.",
      "I want to make a case for typography as the single most expressive tool available to a visual designer. Not because I am a type nerd (though I am), but because I have watched it do things that no color choice, no layout trick, and no illustration style could replicate.",
      "Let me start with an observation: every brand that has achieved genuine cultural resonance in the last decade has had a distinctive typographic voice. Think about it — the sharp geometry of Helvetica Neue on an Apple product page, the warm irregularity of Canva's display face, the confident utility of Airbnb's Cereal. You could cover the logo and still know the brand. That is typography working at its highest level.",
      "But typography is not just about brand recognition. It is about rhythm, hierarchy, and pace. A well-set paragraph of body copy controls how fast you read. The leading, the measure, the tracking — these are not aesthetic choices. They are physiological ones. Bad leading causes eye fatigue. A measure that is too wide forces uncomfortable saccades. Tight tracking in a small-scale serif becomes unreadable and creates a feeling of claustrophobia on the page.",
      "The designers I admire most are the ones who understand type at a structural level. They know that a bold weight H1 creates expectation for a lighter weight H2 — not because a style guide told them so, but because visual weight creates momentum, and momentum needs resolution. They know that all-caps tracking needs to expand while lowercase tracking needs to breathe.",
      "When you treat typography as the foundation rather than an afterthought, your interfaces stop looking like arranged components and start feeling like cohesive, intentional literature.",
    ],
  },
  "design-process": {
    id: "design-process",
    slug: "design-process",
    tag: "PROCESS",
    title:
      "The Design Process That Actually Works: A Behind-the-Scenes Look",
    subtitle:
      "A pragmatic look behind the curtain of modern digital production—why linear workflows always break down and how iterative feedback loops generate real momentum.",
    date: "May 12, 2026",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "Great design isn't born from sudden inspiration—it's forged through intentional exploration, ruthless prioritization, and rapid validation.",
      "Most design processes fail because they treat discovery, wireframing, and high-fidelity rendering as strictly linear milestones. In reality, modern product design is an ongoing conversation where technical constraints, client objectives, and user feedback continuously reshape the initial hypothesis.",
      "By keeping wireframes lightweight and establishing a scalable design token architecture early, teams can test interactions faster without burning cycles on premature polish.",
      "The goal of a healthy process is not to avoid mistakes, but to make mistakes so cheap and quick that the right solution emerges naturally before code is ever written.",
    ],
  },
  "color-systems": {
    id: "color-systems",
    slug: "color-systems",
    tag: "COLOR & SYSTEMS",
    title:
      "Color Theory Is Not Enough: How We Actually Build Color Systems",
    subtitle:
      "Why traditional color wheels fall short in software and how functional color ramps, semantic tokens, and contrast ratios build dependable interfaces.",
    date: "Mar 18, 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "Traditional color wheels teach complementary and analogous harmonies, but digital product systems require perceptual uniformity and rigorous contrast ratios across dark and light surfaces.",
      "When constructing modern UI palettes, we separate raw hues from functional semantic tokens (surface, text, border, interactive states). This abstraction enables seamless theming and effortless accessibility compliance.",
      "Testing colors in isolation is a trap. Always evaluate your palettes within high-density component compositions under varying ambient light conditions and across real OLED displays.",
    ],
  },
  "user-research": {
    id: "user-research",
    slug: "user-research",
    tag: "UX RESEARCH",
    title:
      "What User Research Actually Looks Like When You Do It Right",
    subtitle:
      "Ditching vanity metrics and scripted interviews for actionable behavioral observations that reveal genuine user intent and pain points.",
    date: "Feb 7, 2026",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "Effective user research doesn't ask users what features they want—it observes where they hesitate, what friction they work around, and what emotional state they bring to the workflow.",
      "Quantitative analytics reveal what is happening in your product, but only qualitative observation explains why. Conducting five focused contextual interviews will consistently uncover 80% of critical usability hurdles.",
      "When insights are translated into actionable design principles rather than slide decks, product teams make confident decisions with radical velocity.",
    ],
  },
};

// Aliases for slug variations from Framer templates
const slugAliases: Record<string, string> = {
  "why-typography-is-the-most-underestimated-tool": "typography-arsenal",
  "why-typography-is-the-most-underestimated-tool-in-a-designers-arsenal":
    "typography-arsenal",
  "building-color-systems": "color-systems",
  "color-theory-is-not-enough": "color-systems",
  "the-design-process-that-actually-works": "design-process",
  "what-user-research-actually-looks-like": "user-research",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalId = slugAliases[slug] || slug;
  const post = blogsDatabase[canonicalId];

  if (!post) return { title: "Blog Not Found | DIKE Portfolio" };
  return {
    title: `${post.title} | DIKE Portfolio`,
    description: post.subtitle,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalId = slugAliases[slug] || slug;
  const post = blogsDatabase[canonicalId];

  if (!post) {
    notFound();
  }

  // Get other blog posts for "Read More" section
  const readMorePosts = Object.values(blogsDatabase)
    .filter((item) => item.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-between overflow-x-hidden">
      {/* ── Main Content Container ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-medium tracking-tight text-white leading-[1.15] max-w-4xl mb-5 sm:mb-6">
          {post.title}
        </h1>

        {/* Lead Subtitle Paragraph */}
        <p className="text-base sm:text-lg md:text-[18.5px] text-zinc-400 font-normal leading-relaxed max-w-3xl mb-10 sm:mb-14">
          {post.subtitle}
        </p>

        {/* Big Featured Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] md:h-[480px] lg:h-[540px] overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#161616] mb-12 sm:mb-16">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-8 sm:space-y-10 text-zinc-400 text-base sm:text-[17.5px] leading-relaxed max-w-4xl mb-20 sm:mb-28">
          {post.paragraphs.map((paragraph, index) => (
            <p key={index} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* ── Read More Section ── */}
        <section className="pt-10 sm:pt-14 border-t border-white/[0.08]">
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-normal sm:font-medium tracking-tight text-white mb-8 sm:mb-10">
            Read More
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2 lg:gap-2">
            {readMorePosts.map((otherPost) => (
              <Link
                key={otherPost.id}
                href={`/blogs/${otherPost.slug}`}
                className="group relative flex flex-col justify-between rounded-[26px] sm:rounded-[30px] border border-white/[0.08] bg-[#0c0c0c] p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-white/20 hover:bg-[#0f0f0f] no-underline cursor-pointer"
              >
                {/* Top: Thumbnail Image */}
                <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#161616]">
                  <Image
                    src={otherPost.image}
                    alt={otherPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 650px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Bottom: Info Column */}
                <div className="flex flex-col flex-1 justify-between pt-4 sm:pt-5">
                  <div>
                    {/* Category / Tag Pill */}
                    <div className="inline-block rounded-full border border-white/[0.1] bg-[#141414] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium tracking-wider text-zinc-400 uppercase w-fit mb-3">
                      {otherPost.tag}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-[23px] font-medium tracking-tight text-[#fffc] leading-snug group-hover:text-white transition-colors duration-200">
                      {otherPost.title}
                    </h3>
                  </div>

                  {/* Published Date */}
                  <p className="text-xs sm:text-[13px] text-zinc-500 font-normal m-0 pt-4 sm:pt-6">
                    {otherPost.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Component at the end of the page */}
      <Footer />
    </div>
  );
}
