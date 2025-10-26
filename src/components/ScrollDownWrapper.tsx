"use client";

import React, { ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownIcon } from "lucide-react";

export interface ScrollDownWrapperProps {
  children: ReactNode;
}

export const ScrollDownWrapper = ({ children }: ScrollDownWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop < -100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex flex-col-reverse h-full gap-10 py-10 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}

      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="absolute bottom-2 right-2 sm:bottom-10 sm:right-10 z-50"
          >
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full cursor-pointer backdrop-blur-lg z-50"
              onClick={scrollToBottom}
            >
              <ArrowDownIcon />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
