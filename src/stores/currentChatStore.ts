import { createStore } from "zustand";
import { CurrentChatMessage, TransformedMessage } from "@/lib/types";

export type CurrentChatState = {
  currentChat: CurrentChatMessage[];
};

export type CurrentChatAction = {
  updateCurrentChat: (newMessage: CurrentChatMessage) => void;
  updateLatestChatMessage: (chatResponse: TransformedMessage) => void;
};

export type CurrentChatStore = CurrentChatState & CurrentChatAction;

export const currentChatDefaultInitState: CurrentChatState = {
  currentChat: [],
};

export const createCurrentChatStore = (
  initState: CurrentChatState = currentChatDefaultInitState,
) => {
  return createStore<CurrentChatStore>()((set) => ({
    ...initState,
    updateCurrentChat: (newMessage) =>
      set((state) => ({
        currentChat: [newMessage, ...state.currentChat],
      })),
    updateLatestChatMessage: (chatResponse) =>
      set((state) => ({
        currentChat: [
          {
            ...state.currentChat[0],
            answer: chatResponse.answer,
            reasoning: chatResponse.reasoning,
            responseTimestamp: chatResponse.responseTimestamp,
          },
          ...state.currentChat.slice(1),
        ],
      })),
  }));
};
