import { NextResponse } from "next/server";
import { CryptoData } from "@/types";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function fetchCoinDataWithRetry(
  url: string,
  retries: number
): Promise<Response> {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response;
    } else if (response.status === 429 && retries > 0) {
      console.warn(
        `Rate limited. Retrying in ${RETRY_DELAY / 1000} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchCoinDataWithRetry(url, retries - 1);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export async function GET() {
  try {
    const response = await fetchCoinDataWithRetry(COINGECKO_URL, MAX_RETRIES);
    const data: CryptoData[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return NextResponse.json(
      { error: "Error fetching coin data" },
      { status: 500 }
    );
  }
}
