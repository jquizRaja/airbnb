"use client";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      LiveMode: {theme}
      {theme === "dark" ? (
        <button
          className="border-2 bg-white text-black"
          onClick={() => setTheme("light")}
        >
          🌙
        </button>
      ) : (
        <button
          className="border-2 bg-black text-white"
          onClick={() => setTheme("dark")}
        >
          🔆
        </button>
      )}
    </div>
  );
};

export default ThemeSwitcher;
