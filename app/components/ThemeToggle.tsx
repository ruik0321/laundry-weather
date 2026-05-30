"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  function toggleTheme() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors"
    >
      <FontAwesomeIcon
        icon={isDark ? faSun : faMoon}
        className={isDark ? "text-yellow-400" : "text-blue-400"}
      />
    </button>
  );
}