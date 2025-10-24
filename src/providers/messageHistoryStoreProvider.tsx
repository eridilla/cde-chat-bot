"use client";

import {
  createMessageHistoryStore,
  MessageHistoryState,
  MessageHistoryStore,
} from "@/stores/messageHistoryStore";
import { createContext, ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";

export type MessageHistoryStoreStoreApi = ReturnType<
  typeof createMessageHistoryStore
>;

export const MessageHistoryStoreContext = createContext<
  MessageHistoryStoreStoreApi | undefined
>(undefined);

export interface MessageHistoryStoreProviderProps {
  initialData: MessageHistoryState;
  children: ReactNode;
}

export const MessageHistoryStoreProvider = ({
  initialData,
  children,
}: MessageHistoryStoreProviderProps) => {
  const [store] = useState(() => createMessageHistoryStore(initialData));

  return (
    <MessageHistoryStoreContext.Provider value={store}>
      {children}
    </MessageHistoryStoreContext.Provider>
  );
};

export const useMessageHistoryStore = <T,>(
  selector: (store: MessageHistoryStore) => T,
): T => {
  const messageHistoryStoreContext = useContext(MessageHistoryStoreContext);

  if (!messageHistoryStoreContext) {
    throw new Error(
      `useMessageHistoryStore must be used within MessageHistoryStoreProvider`,
    );
  }

  return useStore(messageHistoryStoreContext, selector);
};
