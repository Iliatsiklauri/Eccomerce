export type sendMessageDto = {
  content: string;
  senderId: number | null;
  recieverId: number | null;
};
export type Message = {
  id: number;
  senderId: null | number;
  recieverId: null | number;
  content: string;
  createdAt: Date;
};
