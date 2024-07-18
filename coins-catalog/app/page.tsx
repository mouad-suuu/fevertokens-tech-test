"use client";
import { useState, useEffect } from "react";
import { CryptoData } from "@/types";
import { useSearchStore } from "@/store/searchStore";
import { CoinTable } from "@/components/CoinTable";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  const [coins, setCoins] = useState<CryptoData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;
  const { searchTerm, filterField, priceRange, percentageChangeRange } =
    useSearchStore();

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

  // Filter coins based on search criteria
  const filteredCoins = coins.filter((coin) => {
    const searchLower = searchTerm.toLowerCase();

    if (filterField === "id") {
      return coin.id.toLowerCase().includes(searchLower);
    }
    if (filterField === "symbol") {
      return coin.symbol.toLowerCase().includes(searchLower);
    }
    if (filterField === "name") {
      return coin.name.toLowerCase().includes(searchLower);
    }
    if (filterField === "price") {
      return (
        coin.current_price >= priceRange[0] &&
        coin.current_price <= priceRange[1]
      );
    }
    if (filterField === "percentage_change") {
      return (
        coin.price_change_percentage_24h >= percentageChangeRange[0] &&
        coin.price_change_percentage_24h <= percentageChangeRange[1]
      );
    }
    return true;
  });

  // Calculate total pages based on filtered coins
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  // Calculate the subset of coins to display on the current page
  const startIndex = (currentPage - 1) * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;
  const displayedCoins = filteredCoins.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TopBar />
      <div className="h-4 m-8">
        <CoinTable
          coins={displayedCoins}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={handlePageChange}
        />
      </div>
    </>
  );
}
