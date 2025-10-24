import { createStore } from "zustand";

export type CurrentChatMessage = {
  question: string;
  questionTimestamp: Date;
  response?: string;
  responseTimestamp?: Date;
};

export type LatestChatMessageResponse = {
  response: string;
  responseTimestamp: Date;
};

export type CurrentChatState = {
  currentChat: CurrentChatMessage[];
};

export type CurrentChatAction = {
  updateCurrentChat: (newMessage: CurrentChatMessage) => void;
  updateLatestChatMessage: (chatResponse: LatestChatMessageResponse) => void;
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
            response: chatResponse.response,
            responseTimestamp: chatResponse.responseTimestamp,
          },
          ...state.currentChat.slice(1),
        ],
      })),
  }));
};
