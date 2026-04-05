import { extractMemories } from "./model/memory-service";

export const useExtractMemory = () => {
  const extract = async (userId: string, chatId: string) => {
    try {
      const memories = await extractMemories(userId, chatId);
      return memories;
    } catch (error) {
      console.error("Failed to extract memories:", error);
      throw error;
    }
  };

  return { extract };
};
