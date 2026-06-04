"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-lg border bg-white/5 px-3 py-2 text-sm text-white outline-none transition cursor-pointer select-none
          ${error 
            ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10" 
            : "border-white/10 hover:border-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/10"
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? "text-white" : "text-white/30"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <ul
          className="absolute left-0 z-50 mt-1.5 max-h-60 w-full overflow-y-auto rounded-lg border border-white/10 bg-zinc-900/90 p-1 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
          role="listbox"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors cursor-pointer select-none
                  ${
                    isSelected
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }
                `}
                role="option"
                aria-selected={isSelected}
              >
                <span>{opt.label}</span>
                {isSelected && <FiCheck className="h-4 w-4 text-white" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
