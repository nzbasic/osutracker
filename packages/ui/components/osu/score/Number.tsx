import classNames from "classnames";

interface NumberProps {
    number: number;
}

function Number({ number }: NumberProps) {
    return (
        <div
            className={classNames(
                { "bg-yellow-500": number === 1 },
                { "bg-gray-500": number === 2 },
                { "bg-orange-400": number === 3 },
                { "bg-black": number > 3 },
                "hidden h-8 w-9 shrink-0 items-center justify-center rounded text-lg text-white md:flex"
            )}
        >
            {number}
        </div>
    );
}

export default Number;
