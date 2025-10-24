"use client";

import React from "react";
import { useCurrentChatStore } from "@/providers/currentChatStoreProvider";

export const ChatMessages = () => {
  const { currentChat } = useCurrentChatStore((state) => state);

  return (
    <div className="flex flex-col-reverse h-full gap-16 overflow-y-auto">
      {currentChat.map((message) => (
        <div
          key={message.questionTimestamp.toISOString()}
          className="flex flex-col gap-4"
        >
          <div className="flex w-full justify-end">
            <span className="max-w-2/3">
              {`${message.questionTimestamp.toLocaleString()} - ${message.question}`}
            </span>
          </div>
          {message.response ? (
            <div className="flex w-full justify-start">
              <span className="max-w-2/3">
                {`${message.response} - ${message.responseTimestamp?.toLocaleString()}`}
              </span>
            </div>
          ) : (
            <span>...</span>
          )}
        </div>
      ))}
    </div>
  );
};
