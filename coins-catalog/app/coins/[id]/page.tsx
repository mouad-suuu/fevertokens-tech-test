// CoinDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { TypeById } from "@/types/typeById";
import { CoinDetailsHeader } from "@/components/CoinDetailsHeader";
import { CoinDetailsCard } from "@/components/CoinDetailsCard";
import { PriceChart } from "@/components/PriceChart";
import { Card } from "@/components/ui/card";

export default function CoinDetails({ params }: { params: { id: string } }) {
  const [coin, setCoin] = useState<TypeById | null>(null);
  const [priceHistory, setPriceHistory] = useState<
    { date: string; price: number }[]
  >([]);

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const [coinRes, historyRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`),
          fetch(
            `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=30`
          ),
        ]);

        if (!coinRes.ok || !historyRes.ok) {
          throw new Error("Failed to fetch coin data");
        }

        const coinData = await coinRes.json();
        const historyData = await historyRes.json();

        console.log("Fetched coin data:", coinData); // Log coin data
        console.log("Coin image URL:", coinData.image); // Log image URL
        console.log("Fetched price history:", historyData); // Log price history

        setCoin(coinData);
        setPriceHistory(
          historyData.prices.map(([timestamp, price]: [number, number]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price,
          }))
        );
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    }

    fetchCoinData();
  }, [params.id]);

  if (!coin) return <div>Loading...</div>;

  return (
    <div className="space-y-6 mt-2 ml-2">
      <CoinDetailsHeader logoSrc={coin.image.large} coinName={coin.name} />

      <div className="flex flex-wrap">
        <div className="flex-1 min-w-[400px] p-5">
          <CoinDetailsCard coin={coin} />
        </div>

        <div className="flex-1 min-w-[400px] p-5">
          <Card>
            <h2 className="text-2xl font-bold m-5">
              Price History (Last 30 Days)
            </h2>
            <div className="mb-4">
              <PriceChart data={priceHistory} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
