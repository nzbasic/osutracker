import * as React from "react";

interface PageDescriptorProps {
    name: string;
    children?: React.ReactNode;
}

export const PageDescriptor: React.FC<PageDescriptorProps> = (props) => {
    return (
        <div>
            <h2>{props.name}</h2>
            <div>{props.children}</div>
        </div>
    );
};
