import clsx from "clsx";          // Correct import for clsx
import { twMerge } from "tailwind-merge";   // Correct import for tailwind-merge

export function cn(...inputs) {
  return twMerge(clsx(inputs));  // Merges classes and resolves conflicts
}
