import * as React from "react";
import Image from "next/image";

interface LogoProps {
    width: number;
    height: number;
}

function Logo({ width, height }: LogoProps) {
    return (
        <Image
            alt="logo"
            src="/logo512.png"
            width={width}
            height={height}
        />
    );
};

export default Logo;
