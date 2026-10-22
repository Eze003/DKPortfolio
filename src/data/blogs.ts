export interface BlogPost {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  paragraphs: string[];
}

export const initialBlogs: BlogPost[] = [
  {
    id: "design-process",
    slug: "design-process",
    tag: "PROCESS",
    title: "The Design Process That Actually Works: A Behind-the-Scenes Look",
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
  {
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
      "When you treat typography as the foundation rather than an afterthought, your interfaces stop looking like arranged components and start feeling like cohesive, intentional literature.",
    ],
  },
  {
    id: "color-systems",
    slug: "color-systems",
    tag: "COLOR & SYSTEMS",
    title: "Color Theory Is Not Enough: How We Actually Build Color Systems",
    subtitle:
      "Color theory teaches contrast and mood; production demands math, perceptual uniformity, and accessible semantic tokens across dark and light modes.",
    date: "Mar 18, 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "Most digital design systems start with a primary color, a few secondary accents, and an arbitrary ramp of greys. Within six months, teams find themselves wrestling with contrast ratios, unreadable dark mode components, and visual clutter.",
      "Building a resilient color palette requires perceptual uniformity. Using color models like OKLCH or HSL with tailored chroma curves ensures that a step 500 across blues, greens, and ambers exhibits predictable luminance.",
      "Semantic abstraction is key: components shouldn't reference 'blue-500' directly, but rather tokens like 'surface-action' or 'border-focus'. This allows systemic updates without breaking individual component styling.",
    ],
  },
  {
    id: "user-research",
    slug: "user-research",
    tag: "UX RESEARCH",
    title: "What User Research Actually Looks Like When You Do It Right",
    subtitle:
      "Moving beyond survey theatrics to uncover the genuine motivations, frictions, and mental models of real people interacting with digital products.",
    date: "Feb 7, 2026",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
    paragraphs: [
      "User research frequently gets bogged down by excessive formalism: lengthy question sheets, synthetic interview conditions, and confirmation bias.",
      "The most actionable insights come from observing contextual usage: watching where users hesitate, which shortcuts they attempt first, and what language they naturally use when describing a problem.",
      "Research should be an ongoing rhythm integrated into weekly design sprints rather than a monolithic gatekeeping phase that halts engineering momentum.",
    ],
  },
];
