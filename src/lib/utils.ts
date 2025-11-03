// src/utils.ts

/**
 * Convert a string to a URL-friendly slug.
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-")        // replace spaces with dashes
    .replace(/-+/g, "-");        // collapse multiple dashes
};
// src/lib/utils.ts

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}


/**
 * Format a date string to a readable format (e.g., Jul 14, 2025).
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Truncate a string to a specific length, appending ellipsis if needed.
 */
export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

/**
 * Capitalize the first letter of a string.
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
