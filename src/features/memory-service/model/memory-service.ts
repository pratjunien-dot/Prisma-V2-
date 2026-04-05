import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ChatMessage } from "../../../entities/message/model/types";
import { Memory } from "../../../entities/memory/model/types";

export const extractMemories = async (userId: string, chatId: string): Promise<Memory[]> => {
  const chatRef = doc(db, `users/${userId}/chats/${chatId}`);
  const chatSnap = await getDoc(chatRef);
  const messages = chatSnap.data()?.messages || [];
  
  const memories: Memory[] = messages
    .filter((msg: ChatMessage) => msg.role === "user")
    .map((msg: ChatMessage) => ({ fact: msg.content, timestamp: msg.createdAt }));
    
  await setDoc(doc(db, `users/${userId}/memories/${chatId}`), { memories });
  return memories;
};
