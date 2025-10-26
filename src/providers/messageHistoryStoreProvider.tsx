"use client";

import {
  createMessageHistoryStore,
  MessageHistoryState,
  MessageHistoryStore,
} from "@/stores/messageHistoryStore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStore } from "zustand";
import { toast } from "sonner";

export type MessageHistoryStoreStoreApi = ReturnType<
  typeof createMessageHistoryStore
>;

export const MessageHistoryStoreContext = createContext<
  MessageHistoryStoreStoreApi | undefined
>(undefined);

export interface MessageHistoryStoreProviderProps {
  initialData: MessageHistoryState;
  error?: string | null;
  children: ReactNode;
}

export const MessageHistoryStoreProvider = ({
  initialData,
  error,
  children,
}: MessageHistoryStoreProviderProps) => {
  const [store] = useState(() => createMessageHistoryStore(initialData));

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error(
        "Something went wrong, please try again later. Check console for details.",
        { closeButton: true },
      );
    }
  }, [error]);

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
