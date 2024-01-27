import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "~/contexts/AuthContext";

const Logo = () => {
  const { user } = useAuthContext();

  const href = user ? "/" : "/login";

  return (
    <Link href={href}>
      <Image
        src="/images/brand_logo.svg"
        width={240}
        height={76}
        alt="Logo"
        priority
      />
    </Link>
  );
};

export default Logo;
