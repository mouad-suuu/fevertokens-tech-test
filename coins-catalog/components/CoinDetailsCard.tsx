import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CryptoData } from "@/types";
import Image from "next/image";

interface CoinDetailsCardProps {
  coin: CryptoData;
}

export const CoinDetailsCard: React.FC<CoinDetailsCardProps> = ({ coin }) => (
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
        <strong>Current Price:</strong> ${coin.market_data.current_price.usd}
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
);
