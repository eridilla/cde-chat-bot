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
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { animationSettings } from "@/lib/utils";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { updateMessageHistory } = useMessageHistoryStore((state) => state);
  const {
    updateCurrentChat,
    updateLatestChatMessage,
    removeLatestChatMessage,
  } = useCurrentChatStore((state) => state);

  const sendMessage = async (message: string) => {
    if (!message) return;

    updateCurrentChat({
      question: message,
      questionTimestamp: new Date(Date.now()),
    });

    setSending(true);

    try {
      const res = await sendChatMessage(message);

      updateMessageHistory({
        question: res.question,
        answer: res.answer,
        reasoning: res.reasoning,
        responseTimestamp: res.responseTimestamp,
      });
      updateLatestChatMessage(res);

      setMessage("");
    } catch (error) {
      removeLatestChatMessage();

      console.error(error);
      toast.error(
        "Something went wrong, please try again later. Check console for details.",
        {
          closeButton: true,
        },
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence initial={true}>
      <motion.div {...animationSettings}>
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
      </motion.div>
    </AnimatePresence>
  );
};
