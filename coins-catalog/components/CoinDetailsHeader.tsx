// CoinDetailsHeader.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CoinDetailsHeaderProps {
  logoSrc: string;
  coinName: string;
}

export function CoinDetailsHeader({
  logoSrc,
  coinName,
}: CoinDetailsHeaderProps) {
  return (
    <div>
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
      <div className="flex items-center "></div>
    </div>
  );
}
