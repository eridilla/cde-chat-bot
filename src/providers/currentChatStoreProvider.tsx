"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";
import {
  createCurrentChatStore,
  CurrentChatStore,
} from "@/stores/currentChatStore";

export type CurrentChatStoreStoreApi = ReturnType<
  typeof createCurrentChatStore
>;

export const CurrentChatStoreContext = createContext<
  CurrentChatStoreStoreApi | undefined
>(undefined);

export interface CurrentChatStoreProviderProps {
  children: ReactNode;
}

export const CurrentChatStoreProvider = ({
  children,
}: CurrentChatStoreProviderProps) => {
  const [store] = useState(() => createCurrentChatStore());

  return (
    <CurrentChatStoreContext.Provider value={store}>
      {children}
    </CurrentChatStoreContext.Provider>
  );
};

export const useCurrentChatStore = <T,>(
  selector: (store: CurrentChatStore) => T,
): T => {
  const currentChatStoreContext = useContext(CurrentChatStoreContext);

  if (!currentChatStoreContext) {
    throw new Error(
      `useCurrentChatStore must be used within CurrentChatStoreProvider`,
    );
  }

  return useStore(currentChatStoreContext, selector);
};
