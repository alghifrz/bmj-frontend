import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-sm">
      <Image
        src="/logo.png"
        alt="Buana Medika Jaya"
        width={192}
        height={63}
        priority
        className="h-12 w-auto sm:h-16"
      />
    </Link>
  );
}
