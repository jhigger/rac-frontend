import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src="/images/brand_logo.svg"
      width={240}
      height={76}
      alt="Logo"
      priority
    />
  );
};

export default Logo;
