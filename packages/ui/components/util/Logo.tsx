import * as React from "react";
import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
}

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Image
      alt="logo"
      src="/logo512.png"
      width={props.width}
      height={props.height}
    />
  );
};
