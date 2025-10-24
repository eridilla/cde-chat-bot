import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiMessage, Message } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformMessage = (apiMessage: ApiMessage): Message => ({
  ...apiMessage,
  timestamp: new Date(apiMessage.timestamp),
});
