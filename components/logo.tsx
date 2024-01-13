import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-center h-full w-32 sm:w-40">
      <img
        src="/logo.png"
        alt="logo"
        className="w-full"
      />
    </Link>
  );
}
 
export default Logo;