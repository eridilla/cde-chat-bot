"use client";

import React from "react";
import { useMessageHistoryStore } from "@/providers/messageHistoryStoreProvider";
import ChatBubble from "@/components/ChatBubble";
import { ScrollDownWrapper } from "@/components/ScrollDownWrapper";

export const HistoryMessages = () => {
  const { messageHistory } = useMessageHistoryStore((state) => state);

  return (
    <>
      <ScrollDownWrapper>
        {messageHistory.map((message) => (
          <div
            key={message.responseTimestamp.toISOString()}
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
          </div>
        ))}
      </ScrollDownWrapper>
    </>
  );
};
