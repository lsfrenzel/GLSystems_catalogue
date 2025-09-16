import { Link } from "wouter";
import { useLayoutEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Cart() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4" data-testid="empty-cart-title">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8" data-testid="empty-cart-message">
              Adicione produtos ao seu carrinho para começar suas compras
            </p>
            <Link 
              href="/demo/ecommerce" 
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              data-testid="continue-shopping-button"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continuar Comprando
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2" data-testid="cart-title">
                Meu Carrinho
              </h1>
              <p className="text-gray-600 dark:text-gray-300" data-testid="cart-items-count">
                {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
              </p>
            </div>
            <Link 
              href="/demo/ecommerce" 
              className="text-blue-600 hover:text-blue-700 font-medium"
              data-testid="continue-shopping-link"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continuar Comprando
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`p-6 flex items-center gap-4 ${index !== items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                    data-testid={`cart-item-${item.id}`}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      data-testid={`item-image-${item.id}`}
                    />
                    <div className="flex-1">
                      <Link 
                        href={`/demo/produto/${item.id}`}
                        className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 transition-colors"
                        data-testid={`item-name-${item.id}`}
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1" data-testid={`item-category-${item.id}`}>
                        {item.category}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                            data-testid={`decrease-quantity-${item.id}`}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-l border-r border-gray-300 dark:border-gray-600" data-testid={`quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                            data-testid={`increase-quantity-${item.id}`}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Remover
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800 dark:text-white" data-testid={`item-price-${item.id}`}>
                        {item.price}
                      </p>
                      {item.oldPrice && (
                        <p className="text-sm text-gray-500 line-through" data-testid={`item-old-price-${item.id}`}>
                          {item.oldPrice}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4" data-testid="order-summary-title">
                  Resumo do Pedido
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-medium" data-testid="subtotal">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Frete</span>
                    <span className="text-green-600 font-medium" data-testid="shipping">
                      Grátis
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-gray-800 dark:text-white" data-testid="total">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3"
                  data-testid="checkout-button"
                >
                  Finalizar Compra
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full text-gray-600 dark:text-gray-300 py-2 text-sm hover:text-red-600 transition-colors"
                  data-testid="clear-cart-button"
                >
                  Limpar Carrinho
                </button>

                {/* Garantias */}
                <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <i className="fas fa-truck text-green-600 mr-2"></i>
                    Frete grátis para todo o Brasil
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-green-600 mr-2"></i>
                    Compra 100% segura
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-undo text-green-600 mr-2"></i>
                    30 dias para trocar ou devolver
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}