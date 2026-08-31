'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from "next/navigation";

const PageWrapper = ({ children }) => {
    const pathname = usePathname();

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
      setIsInitialLoad(false);
    }, []);
    
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={isInitialLoad ? undefined : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageWrapper