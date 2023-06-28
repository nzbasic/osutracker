"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler, useEffect, useRef } from "react";

interface ModalWrapperProps {
    show: boolean;
    close: () => void;
    children: (close: () => void) => JSX.Element;
}

function ModalWrapper({ show, close, children }: ModalWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.documentElement.classList.toggle("overflow-hidden", show);
    }, [show]);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
    }, [close]);

    const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.target === ref?.current) close();
    };

    return (
        <AnimatePresence>
            {show && (
                <div
                    ref={ref}
                    className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-400/30 backdrop-blur-sm"
                    onClick={handleClick}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-full max-w-2xl"
                    >
                        {children(close)}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ModalWrapper;
