"use client";

import React from "react";
import Button from "./Button";
import { MenuItem } from "./items";
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from "react-icons";

interface SidebarItemProps {
  title: string;
  link: string;
  subItems?: MenuItem[]
  Icon: IconType;
  currentActive: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const itemDuration = 0.2;
const itemDelay = 0.2;

export const SidebarItem = ({
  title,
  link,
  Icon,
  currentActive,
  setActive,
  subItems
}: SidebarItemProps) => {
  const isActive = React.useMemo(() => currentActive.startsWith(link), [currentActive, link])

  const parentDuration = React.useMemo(() => {
    if (!subItems) return 0;
    return subItems.length * (itemDelay) - itemDuration
  }, [subItems])

  return (
    <div className="flex flex-col">
      <Button 
        hasChildren
        setActive={setActive} 
        link={link} 
        isActive={isActive} 
        Icon={Icon} 
        title={title}        
      />

      <AnimatePresence>
        {subItems && isActive && subItems.length > 0 && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: parentDuration, delay: itemDelay / 2 }}
            exit={{ height: 0, transition: { duration: parentDuration + itemDuration }}}
            className="ml-2 flex gap-2"
          >
            <span className="mt-2 border-l-2 border-edge" />
            <div className="mt-2 flex flex-grow flex-col gap-2">
              {subItems.map((subItem, i) => (
                <motion.div
                  key={subItem.link}
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  transition={{ duration: itemDuration, delay: (i + 1) * itemDelay }}
                  exit={{ 
                    scale: 0, 
                    transition: { 
                      duration: itemDuration, 
                      delay: (subItems.length - i - 1) * itemDelay/2
                    } 
                  }}
                >
                  <Button
                    title={subItem.title}
                    Icon={subItem.Icon}
                    link={subItem.link}
                    isActive={currentActive.endsWith(subItem.link)}
                    setActive={setActive}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
