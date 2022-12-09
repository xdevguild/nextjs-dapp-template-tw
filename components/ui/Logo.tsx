import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 relative select-none">
        <span className="text-4xl font-black text-white">
          MultiversX Dapp Template
        </span>
      </div>
    </Link>
  );
};
