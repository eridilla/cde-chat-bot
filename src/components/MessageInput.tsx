"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/ssr";
import { sendChatMessage } from "@/actions/sendMessage";
import { useMessageHistoryStore } from "@/providers/messageHistoryStoreProvider";
import { useCurrentChatStore } from "@/providers/currentChatStoreProvider";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { updateMessageHistory } = useMessageHistoryStore((state) => state);
  const { updateCurrentChat, updateLatestChatMessage } = useCurrentChatStore(
    (state) => state,
  );

  const sendMessage = async (message: string) => {
    if (!message) return;

    updateCurrentChat({
      question: message,
      questionTimestamp: new Date(Date.now()),
    });

    await sendChatMessage(message).then((res) => {
      updateMessageHistory(res);
      updateLatestChatMessage({
        response: res.answer,
        responseTimestamp: res.timestamp,
      });
    });
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Send"
          title="Send"
          size="icon-xs"
          onClick={() => {
            sendMessage(message);
          }}
        >
          <PaperPlaneTiltIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
