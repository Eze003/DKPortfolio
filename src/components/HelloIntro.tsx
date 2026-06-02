"use client";

import { useEffect, useState } from "react";

const LETTERS = ["h", "e", "l", "l", "o"] as const;
const LETTER_STAGGER_MS = 380;
const HOLD_AFTER_MS = 500;
const FADE_OUT_MS = 700;

type HelloIntroProps = {
  onComplete: () => void;
};

export function HelloIntro({ onComplete }: HelloIntroProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const lastLetterStart =
      (LETTERS.length - 1) * LETTER_STAGGER_MS + 500;
    const fadeStart = lastLetterStart + HOLD_AFTER_MS;

    const fadeTimer = setTimeout(() => setExiting(true), fadeStart);
    const doneTimer = setTimeout(
      onComplete,
      fadeStart + FADE_OUT_MS,
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`hello-intro fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${exiting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      aria-hidden={exiting}
    >
      <div className="hello-intro__glow pointer-events-none absolute inset-0" />
      <p
        className="hello-intro__text relative text-6xl text-white sm:text-7xl md:text-8xl"
        aria-label="hello"
      >
        {LETTERS.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="hello-intro__letter inline-block"
            style={{ animationDelay: `${index * LETTER_STAGGER_MS}ms` }}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
