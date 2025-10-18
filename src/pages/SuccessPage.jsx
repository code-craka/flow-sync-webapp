import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Helmet>
        <title>Payment Successful - FlowSyncAI Store</title>
        <meta name="description" content="Your payment was successful. Thank you for your purchase!" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="text-center p-8 max-w-lg w-full"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.8, ease: "backInOut" }}
              className="inline-block p-4 bg-green-500/20 rounded-full"
            >
              <CheckCircle className="h-24 w-24 text-green-400" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-300"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg text-gray-300 mb-8"
          >
            Thank you for your purchase! Your order is being processed, and a confirmation email has been sent to you.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold group">
              <Link to="/store">
                Continue Shopping <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;