import { Link, useParams } from "wouter";
import { useLayoutEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductDetail() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const productId = parseInt(id || '0');
  const product = products.find(p => p.id === productId);
  const { addItem, getTotalItems } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <i className="fas fa-exclamation-triangle text-6xl text-yellow-500 mb-6"></i>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Produto não encontrado
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              O produto que você está procurando não existe ou foi removido.
            </p>
            <Link 
              href="/demo/ecommerce" 
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Voltar à Loja
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
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
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-400"></i>);
    }

    return stars;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8" data-testid="breadcrumb">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/demo/ecommerce" className="hover:text-blue-600">
                Loja
              </Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="capitalize">{product.category}</span>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="text-gray-800 dark:text-white">{product.name}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Imagens do Produto */}
            <div>
              <div className="mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  data-testid="product-main-image"
                />
              </div>
              {/* Miniaturas (simuladas) */}
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index 
                        ? 'border-blue-600' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={product.image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detalhes do Produto */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4" data-testid="product-name">
                {product.name}
              </h1>

              {/* Avaliação */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3" data-testid="product-rating">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  ({product.rating}) • 127 avaliações
                </span>
              </div>

              {/* Preço */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white" data-testid="product-price">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-500 line-through" data-testid="product-old-price">
                      {product.oldPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium" data-testid="product-discount">
                      -{product.discount} OFF
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium">
                  <i className="fas fa-truck mr-1"></i>
                  Frete grátis para todo o Brasil
                </p>
              </div>

              {/* Descrição */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Descrição
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed" data-testid="product-description">
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Quantidade:
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      data-testid="decrease-quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300 dark:border-gray-600" data-testid="quantity-value">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      data-testid="increase-quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    data-testid="add-to-cart-button"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Adicionar ao Carrinho
                  </button>
                  <Link
                    href="/demo/cart"
                    className="sm:w-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-center"
                    data-testid="view-cart-button"
                  >
                    Ver Carrinho ({getTotalItems()})
                  </Link>
                </div>
              </div>

              {/* Garantias */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <i className="fas fa-shield-alt text-green-600 mr-3"></i>
                    Garantia de 1 ano
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <i className="fas fa-undo text-green-600 mr-3"></i>
                    30 dias para trocar ou devolver
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <i className="fas fa-lock text-green-600 mr-3"></i>
                    Compra 100% segura
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Especificações */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Especificações Técnicas
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="product-specifications">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex items-center">
                      <i className="fas fa-check text-green-600 mr-3"></i>
                      <span className="text-gray-600 dark:text-gray-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Produtos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="related-products">
                {relatedProducts.map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.id}
                    href={`/demo/product/${relatedProduct.id}`}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
                    data-testid={`related-product-${relatedProduct.id}`}
                  >
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800 dark:text-white">
                        {relatedProduct.price}
                      </span>
                      <div className="flex items-center">
                        {renderStars(relatedProduct.rating).slice(0, 1)}
                        <span className="text-xs text-gray-500 ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}