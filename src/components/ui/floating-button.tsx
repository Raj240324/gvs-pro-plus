'use client';

import { ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

type FloatingButtonProps = {
  className?: string;
  children: ReactNode;
  triggerContent: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

type FloatingButtonItemProps = {
  children: ReactNode;
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1
    }
  }
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 5 }
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 }
};

function FloatingButton({ className, children, triggerContent, isOpen: controlledIsOpen, onOpenChange }: FloatingButtonProps) {
  const ref = useRef(null);
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledIsOpen;

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          <motion.ul
            className="absolute bottom-14 right-0 flex flex-col items-end gap-2"
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            variants={list}>
            {children}
          </motion.ul>
          <motion.div
            variants={btn}
            animate={isOpen ? 'visible' : 'hidden'}
            ref={ref}
            onClick={() => setIsOpen(!isOpen)}>
            {triggerContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FloatingButtonItem({ children }: FloatingButtonItemProps) {
  return <motion.li variants={item}>{children}</motion.li>;
}

export { FloatingButton, FloatingButtonItem }; 