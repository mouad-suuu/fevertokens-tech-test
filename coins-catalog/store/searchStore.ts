import { create } from "zustand";

type SearchStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term: any) => set({ searchTerm: term }),
}));
