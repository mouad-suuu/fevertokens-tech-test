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
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function CoinTable({
  coins,
  currentPage,
  totalPages,
  setCurrentPage,
}: CoinTableProps) {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-2">Rank</TableHead>
            <TableHead className="px-2 py-2">Name</TableHead>
            <TableHead className="px-2 py-2">Symbol</TableHead>
            <TableHead className="px-2 py-2">Price</TableHead>
            <TableHead className="px-2 py-2">24h Change</TableHead>
            <TableHead className="px-2 py-2">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell className="px-2 py-2">
                {coin.market_cap_rank ?? "N/A"}
              </TableCell>
              <TableCell className="px-2 py-2">
                <Link href={`/coins/${coin.id}`} className="flex items-center">
                  <Image
                    src={coin.image} // Assuming coin.image is of type string
                    alt={coin.name}
                    width={40}
                    height={40}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name}
                </Link>
              </TableCell>
              <TableCell className="px-2 py-2">
                {coin.symbol.toUpperCase()}
              </TableCell>
              <TableCell className="px-2 py-2">
                {coin.current_price
                  ? `$${coin.current_price.toFixed(2)}`
                  : "N/A"}
              </TableCell>
              <TableCell
                className={`px-2 py-2 ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h
                  ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                  : "N/A"}
              </TableCell>
              <TableCell className="px-2 py-2">
                {coin.market_cap
                  ? `$${coin.market_cap.toLocaleString()}`
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
