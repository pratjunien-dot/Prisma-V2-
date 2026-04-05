import { useState } from "react";
import { useChatStore } from "./model/chat.store";
import { ChatMessage } from "../../entities/message/model/types";
import { GeminiAdapter } from "../../shared/api/gemini/GeminiAdapter";
import { db } from "../../shared/api/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../auth/use-auth";

export const useChat = () => {
  const { activePersona, messages, setMessages } = useChatStore();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !activePersona) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      chatId: "temp",
      userId: user?.uid || "anonymous",
      role: "user",
      content,
      createdAt: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    // Save user message to Firestore
    if (user) {
      try {
        await addDoc(collection(db, `users/${user.uid}/chats/temp/messages`), userMsg);
      } catch (error) {
        console.error("Error saving user message:", error);
      }
    }

    try {
      const response = await GeminiAdapter.generateResponse(
        content,
        `Tu es ${activePersona.name}. Ton ton est ${activePersona.traits.ton} et ton lexique est ${activePersona.traits.lexicon}.`
      );

      const modelMsg: ChatMessage = {
        id: crypto.randomUUID(),
        chatId: "temp",
        userId: user?.uid || "anonymous",
        role: "model",
        content: response,
        createdAt: new Date(),
      };

      setMessages([...newMessages, modelMsg]);

      // Save model message to Firestore
      if (user) {
        try {
          await addDoc(collection(db, `users/${user.uid}/chats/temp/messages`), modelMsg);
        } catch (error) {
          console.error("Error saving model message:", error);
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { activePersona, messages, sendMessage, isLoading };
};
