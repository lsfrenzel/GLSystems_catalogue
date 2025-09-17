import { Link } from "wouter";
import { useLayoutEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { products, getCategoriesWithTranslations } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EcommerceDemo() {
  const { t } = useLanguage();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const { addItem, getTotalItems } = useCartStore();
  
  // Get translated categories
  const categories = getCategoriesWithTranslations(t);

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addItem(product);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gray-300"></i>);
    }

    return stars;
  };

  return (
    <>
      <Header />
      <main className="pt-0 bg-white min-h-screen">
        {/* Navigation Bar */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-6">
                <Link 
                  href="/sistema-ecommerce" 
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                  data-testid="back-to-system"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  {t('demo.ecommerce.backToSystem')}
                </Link>
                
                <div className="hidden md:flex items-center space-x-1">
                  <h1 className="text-xl font-bold text-blue-600">{t('demo.ecommerce.storeName')}</h1>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">DEMO</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <i className="fas fa-search text-gray-500 mr-2"></i>
                  <input 
                    type="text" 
                    placeholder={t('demo.ecommerce.searchPlaceholder')} 
                    className="bg-transparent border-none outline-none text-sm w-64"
                    data-testid="search-input"
                  />
                </div>
                
                <Link
                  href="/demo/cart"
                  className="relative p-2 text-blue-600 hover:text-blue-800"
                  data-testid="cart-button"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-red-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center">
              <p className="text-sm md:text-base font-medium">
                <i className="fas fa-info-circle mr-2"></i>
                {t('demo.ecommerce.demoBanner')}
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <section className="py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border'
                  }`}
                  data-testid={`category-${category.id}`}
                >
                  <i className={`${category.icon} mr-2`}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900" data-testid="products-title">
                {activeCategory === 'todos' ? t('demo.ecommerce.allProducts') : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {filteredProducts.length} {t('demo.ecommerce.productsFound')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow duration-300 overflow-hidden" data-testid={`product-${product.id}`}>
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 md:h-56 object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{t('demo.ecommerce.outOfStock')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-1 mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-500">({product.rating})</span>
                    </div>
                    
                    <div className="mb-3">
                      {product.oldPrice && (
                        <span className="text-xs text-gray-500 line-through block">{product.oldPrice}</span>
                      )}
                      <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      <i className="fas fa-shopping-cart mr-2"></i>
                      {product.inStock ? t('demo.ecommerce.addToCart') : t('demo.ecommerce.unavailable')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Banner */}
        <section className="py-8 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center" data-testid="feature-shipping">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shipping-fast text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('demo.ecommerce.freeShipping')}</h3>
                <p className="text-sm text-gray-600">{t('demo.ecommerce.freeShippingDesc')}</p>
              </div>
              
              <div className="text-center" data-testid="feature-payment">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-credit-card text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('demo.ecommerce.installments')}</h3>
                <p className="text-sm text-gray-600">{t('demo.ecommerce.installmentsDesc')}</p>
              </div>
              
              <div className="text-center" data-testid="feature-return">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-undo text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{t('demo.ecommerce.easyReturns')}</h3>
                <p className="text-sm text-gray-600">{t('demo.ecommerce.easyReturnsDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Systems Message */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <CustomSystemsMessage variant="banner" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}