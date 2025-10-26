import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiMessage, TransformedMessage } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformMessage = (
  apiMessage: ApiMessage,
): TransformedMessage => {
  const { answer, reasoning } = parseModelResponse(apiMessage.answer);

  return {
    question: apiMessage.question,
    answer,
    reasoning,
    responseTimestamp: new Date(apiMessage.timestamp),
  };
};

const parseModelResponse = (
  message: string,
): { answer: string; reasoning: string } => {
  const reasoningMatch = message.match(/<reasoning>(.*?)<\/reasoning>/s);
  const reasoning = reasoningMatch ? reasoningMatch[1].trim() : "";
  const answer = message.replace(/<reasoning>.*?<\/reasoning>/s, "").trim();

  return { reasoning, answer };
};

export const preprocessLaTeX = (content: string) => {
  const blockProcessedContent = content.replace(
    /\\\[(.*?)\\]/gs,
    (_, equation) => `$${equation}$`,
  );

  return blockProcessedContent.replace(
    /\\\((.*?)\\\)/gs,
    (_, equation) => `$${equation}$`,
  );
};

export const animationSettings = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.2, ease: "easeOut" as const },
};
