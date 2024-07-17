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

interface CoinTableProps {
  coins: CryptoData[];
}

export function CoinTable({ coins }: CoinTableProps) {
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
        {coins.map((coin) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <Link href={`/coins/${coin.id}`} className="flex items-center">
                <Image
                  src={coin.image || coin.thumb}
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
