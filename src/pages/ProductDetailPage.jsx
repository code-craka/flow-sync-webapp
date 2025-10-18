import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Added to Cart! 🛒",
          description: `${quantity} x ${product.title} (${selectedVariant.title}) added.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oh no! Something went wrong.",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);

    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          throw quantityError;
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/store" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Store
        </Link>
        <div className="text-center text-destructive p-8 bg-destructive/10 rounded-2xl">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <p className="mb-6 font-semibold">Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.sale_price_in_cents ? selectedVariant?.price_formatted : null;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950 text-foreground">
      <Helmet>
        <title>{`${product.title} - FlowSyncAI Store`}</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <Link to="/store" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Store
        </Link>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-background/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl soft-shadow border border-border">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl h-96 md:h-[500px]">
              <img
                src={!currentImage?.url ? placeholderImage : currentImage.url}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-pink-500/90 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  {product.ribbon_text}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground mb-2">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">{price}</span>
              {originalPrice && (
                <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
              )}
            </div>

            <div className="prose dark:prose-invert text-muted-foreground mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />

            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Style</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                      onClick={() => handleVariantSelect(variant)}
                      className={`transition-all rounded-full ${selectedVariant?.id === variant.id ? 'gradient-bg text-white' : ''}`}
                    >
                      {variant.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-full p-1">
                    <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="rounded-full h-8 w-8 text-foreground hover:bg-muted"><Minus size={16} /></Button>
                    <span className="w-10 text-center text-foreground font-bold">{quantity}</span>
                    <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="rounded-full h-8 w-8 text-foreground hover:bg-muted"><Plus size={16} /></Button>
                </div>
            </div>

            <div className="mt-auto">
              <Button onClick={handleAddToCart} size="lg" className="w-full gradient-bg text-white font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={!canAddToCart || !product.purchasable}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>

              {isStockManaged && canAddToCart && product.purchasable && (
                <p className="text-sm text-green-500 mt-3 flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> {availableStock} in stock!
                </p>
              )}

              {isStockManaged && !canAddToCart && product.purchasable && (
                 <p className="text-sm text-yellow-500 mt-3 flex items-center justify-center gap-2">
                  <XCircle size={16} /> Not enough stock. Only {availableStock} left.
                </p>
              )}

              {!product.purchasable && (
                  <p className="text-sm text-red-500 mt-3 flex items-center justify-center gap-2">
                    <XCircle size={16} /> Currently unavailable
                  </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;