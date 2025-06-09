import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const testImage =
  "https://vztpjn0djt.ufs.sh/f/RAHCy45jEyblJqofivppCLoeWTwm1FMjXbhRqOVzG6KH4rxy";
