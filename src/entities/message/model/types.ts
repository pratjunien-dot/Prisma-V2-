export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  role: "user" | "model" | "system";
  content: string;
  createdAt: Date;
  personaId?: string;
}
