"use client";

import BaseBrush from "@visx/brush/lib/BaseBrush";
import { Bounds } from "@visx/brush/lib/types";
import { scaleLinear, scaleTime } from "@visx/scale";
import { max, extent, min } from "d3-array";
import { BrushHandleRenderProps } from "@visx/brush/lib/BrushHandle";
import { Brush } from "@visx/brush";
import { Group } from "@visx/group";
import { PatternLines } from "@visx/pattern";
import { LinePath } from "@visx/shape";
import React, { PointerEvent, SVGProps } from "react";
import { localPoint } from "@visx/event";

interface Props<T extends object> {
    width?: number;
    height?: number;
    data: T[];
    xAccessor: (obj: T) => any;
    yAccessor: (obj: T) => any;
    onBrushChange: (data: [number, number]) => void;
    reversed?: boolean;
}

const PATTERN_ID = "brush_pattern";
const GRADIENT_ID = "brush_gradient";
export const accentColor = "#f6acc8";
export const background = "#584153";
export const background2 = "#af8baf";
const selectedBrushStyle: SVGProps<SVGRectElement> = {
    
};

type BrushPosition = {
    start: {
        x: number;
    };
    end: {
        x: number;
    };
};

type Points = [number, number | null] | undefined;

function DataBrush<T extends object>({
    width = 0,
    height = 0,
    data,
    xAccessor,
    yAccessor,
    onBrushChange,
    reversed,
}: Props<T>) {
    const [linePosition, setLinePosition] = React.useState<number>();
    const [highlightedPoints, setHighlightedPoints] = React.useState<Points>();
    const [initialBrushPosition, setInitialBrushPosition] =
        React.useState<BrushPosition | null>(null);
    const brushRef = React.useRef<BaseBrush | null>(null);

    const handleBrushChange = (domain: Omit<Bounds, "y0" | "y1"> | null) => {
        if (!domain) return;
        const { x0, x1 } = domain;

        // find index of closest points to x0 and x1
        const x0Index = data.findIndex((d) => xAccessor(d) >= x0);
        const x1Index = data.findIndex((d) => xAccessor(d) >= x1);

        if (x0Index === 0 && x1Index === data.length - 1) {
            setInitialBrushPosition(null);
        } else if (!initialBrushPosition) {
            setInitialBrushPosition({
                start: {
                    x: brushDateScale(xAccessor(data[x0Index])),
                },
                end: {
                    x: brushDateScale(xAccessor(data[x1Index])),
                },
            });
        }

        onBrushChange([
            x0Index === -1 ? 0 : x0Index,
            x1Index === -1 ? data.length - 1 : x1Index,
        ]);
    };

    const xBrushMax = width;
    const yBrushMax = height;

    const brushDateScale = React.useMemo(
        () =>
            scaleTime<number>({
                range: [0, xBrushMax - 10],
                domain: extent(data, xAccessor) as [Date, Date],
            }),
        [xBrushMax, data, xAccessor]
    );

    const brushLineDateScale = React.useMemo(
        () =>
            scaleTime<number>({
                range: [10, xBrushMax],
                domain: extent(data, xAccessor) as [Date, Date],
            }),
        [xBrushMax, data, xAccessor]
    );

    const brushValueScale = React.useMemo(() => {
        const domain = [min(data, yAccessor) || 0, max(data, yAccessor) || 0];
        return scaleLinear({
            range: [yBrushMax, 0],
            domain: reversed ? domain.reverse() : domain,
            nice: true,
        });
    }, [yBrushMax, data, yAccessor, reversed]);

    const renderedPoints = React.useMemo(() => {
        return highlightedPoints
            ? [...highlightedPoints].sort((a, b) => (a ?? 0) - (b ?? 0))
            : null;
    }, [highlightedPoints]);

    const handleXYDown = React.useCallback(
        (point: PointerEvent<SVGSVGElement>) => {
            if (initialBrushPosition) return;
            if (highlightedPoints?.[0]) return;

            const local = localPoint(point);
            if (!local) return;
            setHighlightedPoints([local.x, null]);
        },
        [highlightedPoints, initialBrushPosition]
    );

    const handleXYMove = React.useCallback(
        (point: PointerEvent<SVGSVGElement>) => {
            const local = localPoint(point);
            if (!local) return;

            setLinePosition(local.x);

            if (!highlightedPoints) return;
            setHighlightedPoints([highlightedPoints?.[0], local.x]);
        },
        [highlightedPoints]
    );

    const handleXYUp = React.useCallback(
        (point: PointerEvent<SVGSVGElement>) => {
            if (!renderedPoints || !renderedPoints[0] || !renderedPoints[1])
                return;

            setInitialBrushPosition({
                start: { x: renderedPoints[0] },
                end: { x: renderedPoints[1] },
            });

            handleBrushChange({
                x0: brushDateScale.invert(renderedPoints[0]),
                x1: brushDateScale.invert(renderedPoints[1]),
            });

            setHighlightedPoints(undefined);
        },
        [renderedPoints]
    );

    const handleXYLeave = React.useCallback((point: PointerEvent<SVGSVGElement>) => {
        setHighlightedPoints(undefined);
        setLinePosition(undefined);
    }, []);

    const handleClearBrush = React.useCallback(() => {
        setInitialBrushPosition(null);
        onBrushChange([0, data.length - 1]);
    }, [data, onBrushChange]);

    if (width < 50) return null;
    return (
        <svg
            width={width + 10}
            height={height}
            className="-ml-[10px] hidden hover:bg-gray-100/10 md:block"
            onPointerDown={handleXYDown}
            onPointerUp={handleXYUp}
            onPointerMove={handleXYMove}
            onPointerLeave={handleXYLeave}
        >
            <LinePath
                stroke="#F6CE4E"
                data={data}
                x={(d) => brushLineDateScale(xAccessor(d))}
                y={(d) => brushValueScale(yAccessor(d))}
            />

            {!initialBrushPosition && linePosition && (
                <rect
                    y={0}
                    x={linePosition}
                    height={height}
                    width={1}
                    fill="white"
                />
            )}

            {renderedPoints && renderedPoints[0] && renderedPoints[1] && (
                <rect
                    x={renderedPoints[0]}
                    y={0}
                    width={renderedPoints[1] - renderedPoints[0]}
                    height={height}
                    fill="white"
                    opacity={0.3}
                />
            )}

            <PatternLines
                id={PATTERN_ID}
                height={16}
                width={16}
                stroke={accentColor}
                strokeWidth={1}
                orientation={["diagonal"]}
            />

            {initialBrushPosition && (
                <Group left={10}>
                    <Brush
                        xScale={brushDateScale}
                        yScale={brushValueScale}
                        width={xBrushMax - 10}
                        height={yBrushMax}
                        handleSize={8}
                        innerRef={brushRef}
                        resizeTriggerAreas={["left", "right"]}
                        brushDirection="horizontal"
                        onClick={handleClearBrush}
                        disableDraggingSelection
                        initialBrushPosition={initialBrushPosition}
                        onChange={handleBrushChange}
                        selectedBoxStyle={{
                            fill: `url(#${PATTERN_ID})`,
                            stroke: accentColor,
                            strokeWidth: 2,
                            rx: 3,
                            ry: 3,
                            cursor: "pointer",
                        }}
                        useWindowMoveEvents
                        renderBrushHandle={(props) => (
                            <BrushHandle {...props} />
                        )}
                    />
                </Group>
            )}
        </svg>
    );
}

// We need to manually offset the handles for them to be rendered at the right position
function BrushHandle({ x, height, isBrushActive }: BrushHandleRenderProps) {
    const pathWidth = 0;
    const pathHeight = 30;
    if (!isBrushActive) {
        return null;
    }
    return (
        <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
            <rect
                x={0}
                y={0}
                width={8}
                height={pathHeight}
                rx={2}
                ry={2}
                fill={accentColor}
                style={{ cursor: "ew-resize" }}
            />
        </Group>
    );
}

const memoBrush = React.memo(DataBrush);
export default memoBrush as typeof DataBrush;
