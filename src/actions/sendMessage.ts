"use server";

import axios from "axios";
import { ApiMessage, TransformedMessage } from "@/lib/types";
import { transformMessage } from "@/lib/utils";

export const sendChatMessage = async (
  message: string,
): Promise<TransformedMessage> => {
  const res = await axios.post<ApiMessage>(`${process.env.API_URL}/chat`, {
    question: message,
  });

  return transformMessage(res.data);
};
