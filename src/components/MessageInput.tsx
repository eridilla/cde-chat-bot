"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CircleNotchIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react/ssr";
import { sendChatMessage } from "@/actions/sendMessage";
import { useMessageHistoryStore } from "@/providers/messageHistoryStoreProvider";
import { useCurrentChatStore } from "@/providers/currentChatStoreProvider";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
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

    setSending(true);

    await sendChatMessage(message).then((res) => {
      updateMessageHistory({
        question: res.question,
        answer: res.answer,
        reasoning: res.reasoning,
        responseTimestamp: res.responseTimestamp,
      });
      updateLatestChatMessage(res);

      setMessage("");
      setSending(false);
    });
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            void sendMessage(message);
          }
        }}
        placeholder="Send a message..."
        disabled={sending}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Send"
          title="Send"
          size="icon-xs"
          onClick={() => void sendMessage(message)}
          disabled={sending}
        >
          {sending ? (
            <CircleNotchIcon className="animate-spin" />
          ) : (
            <PaperPlaneTiltIcon />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
