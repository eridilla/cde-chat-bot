"use client";

import React from "react";
import { useCurrentChatStore } from "@/providers/currentChatStoreProvider";
import ChatBubble from "@/components/ChatBubble";
import { CompleteMessage, CurrentChatMessage } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { ScrollDownWrapper } from "@/components/ScrollDownWrapper";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr";
import { animationSettings } from "@/lib/utils";

export const ChatMessages = () => {
  const { currentChat } = useCurrentChatStore((state) => state);

  const isCompleteMessage = (
    message: CurrentChatMessage,
  ): message is CompleteMessage => "answer" in message;

  return (
    <AnimatePresence initial={true}>
      <ScrollDownWrapper>
        {currentChat.length > 0 ? (
          currentChat.map((message) => {
            return (
              <motion.div
                key={message.questionTimestamp.toISOString()}
                layout
                {...animationSettings}
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
          })
        ) : (
          <motion.div
            {...animationSettings}
            className="flex flex-col gap-4 w-full h-full items-center justify-center text-center"
          >
            <h1>How may I help you today?</h1>
            <p className="text-stone-400">Start by typing a message below</p>
            <ArrowDownIcon size={24} className="text-stone-400" />
          </motion.div>
        )}
      </ScrollDownWrapper>
    </AnimatePresence>
  );
};
