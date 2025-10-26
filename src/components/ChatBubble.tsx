import React, { useState } from "react";
import { cn, preprocessLaTeX } from "@/lib/utils";
import Markdown from "react-markdown";
import { CaretDownIcon, CircleIcon } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion } from "motion/react";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

interface NormalChatBubbleProps {
  type: "sent" | "received";
  loading?: false;
  text: string;
  timestamp?: Date;
  reasoning?: string;
}

interface LoadingChatBubbleProps {
  type: "sent" | "received";
  loading: true;
  text?: never;
  timestamp?: never;
  reasoning?: never;
}

export type ChatBubbleProps = NormalChatBubbleProps | LoadingChatBubbleProps;

export default function ChatBubble({
  type,
  text,
  timestamp,
  reasoning,
  loading,
}: ChatBubbleProps) {
  const [reasoningOpen, setReasoningOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-4 w-full",
        type === "sent" && "flex-row-reverse",
      )}
    >
      <div
        className={cn(
          "peer flex flex-col gap-2 p-4 rounded-3xl max-w-[90%] md:max-w-2/3",
          type === "sent"
            ? "bg-stone-700 rounded-br-none"
            : "bg-stone-900 rounded-bl-none",
        )}
      >
        {loading ? (
          <div className="flex gap-1 text-stone-500 animate-pulse">
            <CircleIcon size={4} weight="fill" />
            <CircleIcon size={4} weight="fill" />
            <CircleIcon size={4} weight="fill" />
          </div>
        ) : (
          <>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {preprocessLaTeX(text)}
            </Markdown>
            {reasoning && (
              <>
                <div
                  className="flex w-fit gap-1 text-stone-500 hover:text-stone-400 text-xs items-center cursor-pointer transition-all select-none"
                  onClick={() => setReasoningOpen((prev) => !prev)}
                >
                  <span>Reasoning</span>
                  <CaretDownIcon
                    className={cn(
                      "transition-all",
                      reasoningOpen && "rotate-180",
                    )}
                  />
                </div>
                <AnimatePresence mode="sync">
                  {reasoningOpen && (
                    <motion.div
                      key="reasoning"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden w-full"
                    >
                      <div className="bg-stone-800 p-4 rounded-xl w-full text-sm">
                        <Markdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {preprocessLaTeX(reasoning)}
                        </Markdown>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </>
        )}
      </div>
      {!loading && timestamp && (
        <span className="text-stone-600 text-xs opacity-0 peer-hover:opacity-100 transition-all">
          {`${timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
        </span>
      )}
    </div>
  );
}
