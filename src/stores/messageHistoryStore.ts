import { createStore } from "zustand";
import { Message } from "@/lib/types";

export type MessageHistoryState = {
  messageHistory: Message[];
};

export type MessageHistoryAction = {
  setMessageHistory: (
    messageHistory: MessageHistoryState["messageHistory"],
  ) => void;
  updateMessageHistory: (newMessage: Message) => void;
};

export type MessageHistoryStore = MessageHistoryState & MessageHistoryAction;

export const messageHistoryDefaultInitState: MessageHistoryState = {
  messageHistory: [],
};

export const createMessageHistoryStore = (
  initState: MessageHistoryState = messageHistoryDefaultInitState,
) => {
  return createStore<MessageHistoryStore>()((set) => ({
    ...initState,
    setMessageHistory: (messageHistory) =>
      set(() => ({ messageHistory: messageHistory })),
    updateMessageHistory: (newMessage) =>
      set((state) => ({
        messageHistory: [newMessage, ...state.messageHistory],
      })),
  }));
};
