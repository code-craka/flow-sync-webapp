import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';
import { ShoppingBag } from 'lucide-react';

const StorePage = () => {
  return (
    <>
      <Helmet>
        <title>Store - FlowSyncAI</title>
        <meta name="description" content="Browse and purchase official FlowSyncAI merchandise and products." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-24 sm:py-32"
        >
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              className="inline-block p-4 bg-purple-500/20 rounded-full mb-4"
            >
              <ShoppingBag className="h-10 w-10 text-purple-300" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
            >
              FlowSyncAI Store
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Discover exclusive merchandise and tools to boost your productivity.
            </motion.p>
          </div>
          <ProductsList />
        </motion.div>
      </div>
    </>
  );
};

export default StorePage;