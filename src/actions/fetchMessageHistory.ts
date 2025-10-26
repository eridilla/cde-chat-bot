"use server";

import axios from "axios";
import { ApiMessage, TransformedMessage } from "@/lib/types";
import { transformMessage } from "@/lib/utils";

export type MessageHistoryResponse = {
  history: ApiMessage[];
};

export type MessageHistoryResult = {
  history: TransformedMessage[];
  error?: string | null;
};

export const fetchMessageHistory = async (): Promise<MessageHistoryResult> => {
  try {
    const res = await axios.get<MessageHistoryResponse>(
      `${process.env.API_URL}/history`,
    );

    return { history: res.data.history.map(transformMessage) };
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : "Unknown error";

    return {
      history: [],
      error: `fetchMessageHistory | ${errorMessage}`,
    };
  }
};
