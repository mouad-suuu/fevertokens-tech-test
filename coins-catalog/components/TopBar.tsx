"use client";

import { useState, useEffect } from "react";
import { useSearchStore } from "@/store/searchStore";
import Image from "next/image";

export function TopBar() {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [localSearchTerm, setSearchTerm]);

  return (
    <div className="flex flex-auto items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="/icon.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="text-lg font-semibold">By Mouad Mennioui</div>
    </div>
  );
}
