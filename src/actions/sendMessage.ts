"use server";

import axios from "axios";
import { ApiMessage, Message } from "@/lib/types";
import { transformMessage } from "@/lib/utils";

export const sendChatMessage = async (message: string): Promise<Message> => {
  const res = await axios.post<ApiMessage>(`${process.env.API_URL}/chat`, {
    question: message,
  });

  return transformMessage(res.data);
};
