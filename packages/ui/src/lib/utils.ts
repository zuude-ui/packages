import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const testImage =
  "https://personal-work-ali.s3.us-west-2.amazonaws.com/A_meteor_hit_the_earth.webp";
