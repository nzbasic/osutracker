"use client"

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { AnimatePresence } from 'framer-motion';
import { ModalWrapper } from '../util/ModalWrapper';

export const SearchBar = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        setShowModal(true)
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [])

  return (
    <>
      <div className="bg-white relative pointer-events-auto">
        <button 
          onClick={() => setShowModal(true)}
          className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
        >
          <MagnifyingGlassIcon className="mr-3 flex-none w-6 h-6" />
          Quick search...
          <div className="ml-auto text-xs text-gray-500 border hover:border-gray-300 rounded py-0.5 px-2" onClick={close}>
            /
          </div>
        </button>
      </div>
      <AnimatePresence>
        {showModal && (
          <ModalWrapper close={() => setShowModal(false)}>
            {(close) => <Modal close={close} />} 
          </ModalWrapper>
        )}
      </AnimatePresence>
    </>
  );
};
