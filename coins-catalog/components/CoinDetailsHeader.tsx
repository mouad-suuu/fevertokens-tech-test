import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CoinDetailsHeaderProps {
  logoSrc: string;
  coinName: string;
}

export const CoinDetailsHeader: React.FC<CoinDetailsHeaderProps> = ({
  logoSrc,
  coinName,
}) => (
  <div className="flex items-center">
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
  </div>
);
