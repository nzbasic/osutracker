"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Countries from "./Countries";
import Website from "./Website";
import Players from "./Players";

interface ModalProps {
  close: () => void;
}

const Modal = ({ close }: ModalProps) => {
  return (
    <div className="max-w-2xl w-full bg-white rounded-xl border-gray-300 shadow-lg pb-4">
      <div className="flex justify-between p-4 border-b">
        <div className="flex w-full items-center gap-4">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <input 
            className="w-full  border-none focus:outline-none"
            placeholder="Search players, countries, pages, documentation..." 
          />
        </div>
        <button className="text-xs text-gray-500 border hover:border-gray-300 rounded py-0.5 px-1 hover:shadow transition-all" onClick={close}>
          Esc
        </button>
      </div>

      <Players />
      <Countries />
      <Website />
    </div>
  )
}

export default Modal;
