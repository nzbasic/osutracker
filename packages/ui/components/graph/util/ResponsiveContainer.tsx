"use client";

import { ParentSize } from "@visx/responsive";
import React from "react";

interface ResponsiveContainerProps {
    className?: string;
    children: JSX.Element;
}

export interface ResponsiveChildProps {
    width?: number;
    height?: number;
    left?: number;
    top?: number;
}

function ResponsiveContainer({
    className,
    children,
}: ResponsiveContainerProps) {
    return (
        <div className={className}>
            <ParentSize ignoreDimensions={["top", "left"]}>
                {({ width, height }) =>
                    React.cloneElement(children, { width, height })
                }
            </ParentSize>
        </div>
    );
}

export default ResponsiveContainer;
