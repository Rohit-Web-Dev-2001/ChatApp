import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  ZustandmessagesArray: [],
  setMessagesZustand: (ZustandmessagesArray) => set({ ZustandmessagesArray }),
}));

export default useConversation;
