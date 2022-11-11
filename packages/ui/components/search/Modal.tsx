"use client"

import { ModalWrapper } from 'ui';
import { useEffect, useRef } from 'react';
import Players from './Players';
import Countries from './Countries';
import Website from './Website';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface ModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}

const Content = ({ close }: { close: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.focus();
  }, [])

  return (
    <div className="w-full max-h-[calc(100vh-8rem)] bg-white rounded-xl border-edge shadow-lg">
      <div className="flex justify-between p-4 border-b ">
        <div className="flex w-full items-center gap-4">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <input 
            ref={inputRef}
            className="w-full border-none focus:outline-none"
            placeholder="Search players, countries, pages, documentation..." 
          />
        </div>
        <button className="text-xs text-gray-500 border hover:border-edge rounded py-0.5 px-1 hover:shadow transition-all" onClick={close}>
          Esc
        </button>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-16rem)] p-4 flex flex-col gap-1 font-semibold text-lg">
        <div>Players</div>
        <Players onNavigate={close} />
        <div className="mt-2">Countries</div>
        <Countries onNavigate={close} />
        <div className="mt-2">Pages</div>
        <Website onNavigate={close} />        
      </div>
    </div>
  );
};

export const SearchModal = ({ showModal, setShowModal }: ModalProps) => {
  return (
    <ModalWrapper show={showModal} close={() => setShowModal(false)}>
      {(close) => (
        <Content close={close} />
      )} 
    </ModalWrapper>
  );
};
