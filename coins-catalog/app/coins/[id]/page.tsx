"use client";

import { useState, useEffect } from "react";
import { CryptoData } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PriceChart } from "@/components/PriceChart";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoinDetails({ params }: { params: { id: string } }) {
  const [coin, setCoin] = useState<CryptoData | null>(null);
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

        console.log("Fetched coin data:", coinData); // Add this line
        console.log("Fetched price history:", historyData); // Add this line

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
      <Link href="/">
        <Button variant="outline">
          <Image
            src="/icon.png"
            alt="Logo"
            width={20}
            height={20}
            className="rounded-full mr-1"
          />
          Home
        </Button>
      </Link>

      <div className="flex flex-wrap">
        <div className="flex-1 min-w-[400px] p-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image
                  src={coin.image || coin.thumb}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="w-6 h-6 mr-2"
                />
                {coin.name} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Symbol:</strong> {coin.symbol.toUpperCase()}
              </p>
              <p className="mb-2">
                <strong>Current Price:</strong> $
                {coin.market_data.current_price.usd}
              </p>
              <p className="mb-2">
                <strong>Market Cap:</strong> $
                {coin.market_data.market_cap.usd.toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Market Cap Rank:</strong> {coin.market_cap_rank}
              </p>
              <p className="mb-2">
                <strong>24h Price Change:</strong> $
                {coin.market_data.price_change_24h.toFixed(2)}
              </p>
              <p className="mb-2">
                <strong>Circulating Supply:</strong>{" "}
                {coin.market_data.circulating_supply.toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>All-time High:</strong> ${coin.market_data.ath.usd}
              </p>
              <p className="mb-2">
                <strong>All-time Low:</strong> ${coin.market_data.atl.usd}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 min-w-[400px] p-5  ">
          <Card>
            {" "}
            {"     "}
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
