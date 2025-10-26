"use client";

import React from "react";
import { useCurrentChatStore } from "@/providers/currentChatStoreProvider";
import ChatBubble from "@/components/ChatBubble";
import { CompleteMessage, CurrentChatMessage } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { ScrollDownWrapper } from "@/components/ScrollDownWrapper";

export const ChatMessages = () => {
  const { currentChat } = useCurrentChatStore((state) => state);

  const isCompleteMessage = (
    message: CurrentChatMessage,
  ): message is CompleteMessage => "answer" in message;

  return (
    <AnimatePresence initial={true}>
      <ScrollDownWrapper>
        {currentChat.map((message) => {
          return (
            <motion.div
              key={message.questionTimestamp.toISOString()}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col-reverse gap-4"
            >
              {isCompleteMessage(message) ? (
                <ChatBubble
                  type="received"
                  text={message.answer}
                  reasoning={message.reasoning}
                  timestamp={message.responseTimestamp}
                />
              ) : (
                <ChatBubble type="received" loading />
              )}
              <ChatBubble
                type="sent"
                text={message.question}
                timestamp={message.questionTimestamp}
              />
            </motion.div>
          );
        })}
      </ScrollDownWrapper>
    </AnimatePresence>
  );
};
