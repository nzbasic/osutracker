import {
    Annotation,
    AnnotationCircleSubject,
    AnnotationLineSubject,
    DataContext,
    EventHandlerParams,
} from "@visx/xychart";
import React, { useId } from "react";
import { withBoundingRects, WithBoundingRectsProps } from "@visx/bounds";

type Props<T> = {
    point: EventHandlerParams<T>;
    xAccessor: (obj: T) => any;
    yAccessor: (obj: T) => any;
} & WithBoundingRectsProps;

function HighlightedPoint<T extends object>({
    point,
    yAccessor,
    xAccessor,
    rect,
    parentRect,
}: Props<T>) {
    // @ts-ignore
    const { xScale, yScale } = React.useContext(DataContext);
    const id = useId();

    return (
        <Annotation
            datum={point.datum}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            dataKey={id}
            dy={0}
            dx={0}
        >
            <AnnotationLineSubject
                stroke="lightgray"
                strokeWidth={2}
                min={yScale && yScale(yAccessor(point.datum)) as number + 2}
            />
            <AnnotationCircleSubject
                radius={4}
                stroke="#F6CE4E"
                className="fill-[#F6CE4E]"
            />
        </Annotation>
    );
}

export default withBoundingRects(HighlightedPoint) as unknown as typeof HighlightedPoint;
