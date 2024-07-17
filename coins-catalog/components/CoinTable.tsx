import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CryptoData } from "@/types";
import Image from "next/image";
import { useSearchStore } from "@/store/searchStore";

interface CoinTableProps {
  coins: CryptoData[];
}

export function CoinTable({ coins }: CoinTableProps) {
  const { searchTerm, filterField, priceRange, percentageChangeRange } =
    useSearchStore();

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24h Change</TableHead>
          <TableHead>Market Cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCoins.map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <Link href={`/coins/${coin.id}`} className="flex items-center">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="w-6 h-6 mr-2"
                />
                {coin.name}
              </Link>
            </TableCell>
            <TableCell>{coin.symbol.toUpperCase()}</TableCell>
            <TableCell>${coin.current_price.toFixed(2)}</TableCell>
            <TableCell
              className={
                coin.price_change_percentage_24h > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </TableCell>
            <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
