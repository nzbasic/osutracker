"use client"

import { MouseEventHandler, useEffect, useRef } from "react";

interface ModalWrapperProps {
  close: () => void;
  children: (close: () => void) => JSX.Element;
}

export const ModalWrapper = ({ close, children }: ModalWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [close])

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === ref?.current) close();
  }

  return (
    <div 
      ref={ref}
      className="absolute z-50 top-0 left-0 h-screen w-screen bg-gray-400/30 flex items-center justify-center" 
      onClick={handleClick}
    >
      {children(close)}
    </div>
  )
}
