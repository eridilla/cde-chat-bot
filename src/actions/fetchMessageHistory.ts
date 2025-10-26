"use server";

import axios from "axios";
import { ApiMessage, TransformedMessage } from "@/lib/types";
import { transformMessage } from "@/lib/utils";

export type MessageHistoryResponse = {
  history: ApiMessage[];
};

export const fetchMessageHistory = async (): Promise<TransformedMessage[]> => {
  const res = await axios.get<MessageHistoryResponse>(
    `${process.env.API_URL}/history`,
  );

  return res.data.history.map(transformMessage);
};
