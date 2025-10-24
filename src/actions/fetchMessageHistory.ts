"use server";

import axios from "axios";
import { ApiMessage, Message } from "@/lib/types";
import { transformMessage } from "@/lib/utils";

export type MessageHistoryResponse = {
  history: ApiMessage[];
};

export const fetchMessageHistory = async (): Promise<Message[]> => {
  const res = await axios.get<MessageHistoryResponse>(
    `${process.env.API_URL}/history`,
  );

  return res.data.history.map(transformMessage);
};
