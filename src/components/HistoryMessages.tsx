"use client";

import React from "react";
import { useMessageHistoryStore } from "@/providers/messageHistoryStoreProvider";
import ChatBubble from "@/components/ChatBubble";
import { ScrollDownWrapper } from "@/components/ScrollDownWrapper";
import { AnimatePresence, motion } from "motion/react";
import { animationSettings } from "@/lib/utils";

export const HistoryMessages = () => {
  const { messageHistory } = useMessageHistoryStore((state) => state);

  return (
    <AnimatePresence initial={true}>
      <ScrollDownWrapper>
        {messageHistory.map((message) => (
          <motion.div
            key={message.responseTimestamp.toISOString()}
            {...animationSettings}
            className="flex flex-col gap-4"
          >
            <div className="w-full text-center text-sm text-stone-600">
              {message.responseTimestamp.toLocaleString()}
            </div>
            <ChatBubble type="sent" text={message.question} />
            <ChatBubble
              type="received"
              text={message.answer}
              reasoning={message.reasoning}
            />
          </motion.div>
        ))}
      </ScrollDownWrapper>
    </AnimatePresence>
  );
};
