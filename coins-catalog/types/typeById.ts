export interface TypeById {
  market_cap_rank: number;
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    market_cap_rank: number;
    price_change_24h: number;
    circulating_supply: number;
    ath: {
      usd: number;
    };
    atl: {
      usd: number;
    };
  };
}
