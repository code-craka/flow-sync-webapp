
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

const PolarProductCard = ({ product, onPurchase }) => {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const price = product.prices.find(p => p.type === 'one_time');
  const subscription = product.prices.find(p => p.type === 'recurring');

  const handlePurchase = async (priceId) => {
    setIsPurchasing(true);
    await onPurchase(priceId);
    setIsPurchasing(false);
  };

  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-2xl border bg-card text-card-foreground shadow-lg bg-slate-800/50 backdrop-blur-sm border-slate-700 text-white overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-blue-500"
    >
      <div className="relative h-56">
        <img
          class="w-full h-full object-cover"
          alt={product.name}
         src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold truncate mb-2">{product.name}</h3>
        <p className="text-sm text-gray-300 flex-grow mb-4">{product.description}</p>
        <div className="mt-auto space-y-3">
          {price && (
            <Button
              onClick={() => handlePurchase(price.id)}
              disabled={isPurchasing}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
            >
              {isPurchasing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
              Buy Now - {formatPrice(price.price_amount, price.price_currency)}
            </Button>
          )}
          {subscription && (
            <Button
              onClick={() => handlePurchase(subscription.id)}
              disabled={isPurchasing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
            >
              {isPurchasing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
              Subscribe - {formatPrice(subscription.price_amount, subscription.price_currency)}/{subscription.recurring_interval}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PolarStorePage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ has_more: false, total_count: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const limit = 12;

  const fetchProducts = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('polar-products', {
        body: JSON.stringify({ page: currentPage, limit }),
      });

      if (functionError) throw functionError;
      if (data.error) throw new Error(data.error);

      setProducts(data.items || []);
      setPagination(data.pagination || { has_more: false, total_count: 0 });
    } catch (err) {
      const errorMessage = err.message || 'Failed to load products from Polar.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Loading Products",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const handlePurchase = async (priceId) => {
    try {
      const successUrl = `${window.location.origin}/success?source=polar`;
      const { data, error: functionError } = await supabase.functions.invoke('polar-checkout', {
        body: JSON.stringify({ price_id: priceId, success_url: successUrl }),
      });

      if (functionError) throw functionError;
      if (data.error) throw new Error(data.error);

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("Could not create checkout session.");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: err.message,
      });
    }
  };

  const handleNextPage = () => {
    if (pagination.has_more) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Polar Store - FlowSyncAI</title>
        <meta name="description" content="Purchase products and subscriptions via Polar.sh." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-24 sm:py-32"
        >
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
            >
              Polar Subscriptions & Products
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Support our work and get exclusive benefits through Polar.
            </motion.p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 text-white animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 p-8 bg-red-500/10 rounded-lg max-w-md mx-auto">
              <AlertCircle className="mx-auto h-12 w-12 mb-4" />
              <p className="font-semibold">Error loading products:</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-400 p-8 bg-slate-800/50 rounded-lg">
              <p>No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <PolarProductCard key={product.id} product={product} onPurchase={handlePurchase} />
                ))}
              </div>
              <div className="flex justify-center items-center mt-12 space-x-4">
                <Button onClick={handlePrevPage} disabled={page <= 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <span className="font-semibold">
                  Page {page}
                </span>
                <Button onClick={handleNextPage} disabled={!pagination.has_more}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default PolarStorePage;
