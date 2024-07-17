"use client";

import { useState, useEffect } from "react";
import { CryptoData } from "@/types";
import { useSearchStore } from "@/store/searchStore";
import { CoinTable } from "@/components/CoinTable";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  const [coins, setCoins] = useState<CryptoData[]>([]);
  const { searchTerm } = useSearchStore();

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch("/api/coins");
        if (!res.ok) {
          throw new Error("Failed to fetch coins");
        }
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    }

    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopBar />
      <div className="h-4 m-8">
        <CoinTable coins={filteredCoins} />
      </div>
    </>
  );
}
