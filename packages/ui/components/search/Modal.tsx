"use client";

import ModalWrapper from "../util/ModalWrapper";
import { useEffect, useRef } from "react";
import Players from "./Players";
import Countries from "./Countries";
import Website from "./Website";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { isMobile } from "react-device-detect";

interface ModalProps {
    showModal: boolean;
    setShowModal: (val: boolean) => void;
}

const Content = ({ close }: { close: () => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    return (
        <div className="border-edge ml-4 max-h-[calc(100vh-8rem)] w-[calc(100vw-2rem)] rounded-xl bg-white shadow-lg md:ml-0 md:w-full">
            <div className="flex justify-between border-b p-4">
                <div className="flex w-full items-center gap-4">
                    <HiMagnifyingGlass className="h-5 w-5" />
                    <input
                        ref={inputRef}
                        className="w-full border-none text-[16px] focus:outline-none md:text-sm"
                        placeholder="Search players or countries"
                    />
                </div>
                <button
                    className="hover:border-edge rounded border bg-white py-0.5 px-1 text-xs text-gray-500 transition-all hover:shadow"
                    onClick={close}
                >
                    Esc
                </button>
            </div>

            <div className="flex max-h-[calc(100vh-16rem)] flex-col gap-1 overflow-y-auto p-4 text-lg font-semibold">
                <div>Players</div>
                <Players onNavigate={close} />
                <div className="mt-2">Countries</div>
                <Countries onNavigate={close} />
                {/* <div className="mt-2">Pages</div>
        <Website onNavigate={close} />         */}
            </div>
        </div>
    );
};

function SearchModal({ showModal, setShowModal }: ModalProps) {
    return (
        <ModalWrapper show={showModal} close={() => setShowModal(false)}>
            {(close) => <Content close={close} />}
        </ModalWrapper>
    );
};

export default SearchModal;
