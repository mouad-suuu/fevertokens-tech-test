import create from "zustand";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterField: string;
  setFilterField: (field: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  percentageChangeRange: [number, number];
  setPercentageChangeRange: (range: [number, number]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  filterField: "name",
  setFilterField: (field) => set({ filterField: field }),
  priceRange: [0, Infinity],
  setPriceRange: (range) => set({ priceRange: range }),
  percentageChangeRange: [-Infinity, Infinity],
  setPercentageChangeRange: (range) => set({ percentageChangeRange: range }),
}));
