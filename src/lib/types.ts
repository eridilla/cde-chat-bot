export type ApiMessage = {
  question: string;
  answer: string;
  timestamp: string;
};

export type PendingMessage = {
  question: string;
  questionTimestamp: Date;
};

export type CompleteMessage = {
  question: string;
  answer: string;
  reasoning: string;
  questionTimestamp: Date;
  responseTimestamp: Date;
};

export type CurrentChatMessage = PendingMessage | CompleteMessage;

export type TransformedMessage = Omit<CompleteMessage, "questionTimestamp">;
