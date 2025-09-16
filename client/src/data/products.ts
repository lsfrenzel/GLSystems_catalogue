import { Product } from '@/lib/cartStore';

export const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone Samsung Galaxy A54',
    price: 'R$ 1.299,90',
    oldPrice: 'R$ 1.599,90',
    discount: '19%',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'eletronicos',
    rating: 4.5,
    inStock: true,
    description: 'O Samsung Galaxy A54 oferece uma experiência premium com tela Super AMOLED de 6.4", câmera tripla de 50MP e bateria de longa duração. Perfeito para quem busca tecnologia avançada e design elegante.',
    specifications: [
      'Tela Super AMOLED 6.4" FHD+',
      'Processador Exynos 1380',
      'Câmera principal 50MP + Ultra-wide 12MP + Macro 5MP',
      'Câmera frontal 32MP',
      'Bateria 5000mAh com carregamento rápido 25W',
      'Memória RAM 8GB + Armazenamento 256GB',
      'Resistente à água IP67',
      'Android 13 com One UI 5.1'
    ]
  },
  {
    id: 2,
    name: 'Tênis Nike Air Max Revolution',
    price: 'R$ 289,90',
    oldPrice: 'R$ 349,90',
    discount: '17%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'moda',
    rating: 4.8,
    inStock: true,
    description: 'O Nike Air Max Revolution combina estilo e conforto com tecnologia Air Max. Ideal para corridas e uso casual, oferece amortecimento superior e design moderno.',
    specifications: [
      'Tecnologia Nike Air Max no calcanhar',
      'Cabedal em mesh respirável',
      'Sola de borracha com tração multidirecional',
      'Entressola em EVA para amortecimento',
      'Sistema de cadarço tradicional',
      'Design moderno e versátil',
      'Disponível em várias cores',
      'Ideal para corrida e uso casual'
    ]
  },
  {
    id: 3,
    name: 'Smart TV LG 55" 4K UHD',
    price: 'R$ 2.199,90',
    oldPrice: 'R$ 2.799,90',
    discount: '21%',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'eletronicos',
    rating: 4.7,
    inStock: true,
    description: 'Smart TV LG de 55 polegadas com resolução 4K UHD e WebOS. Desfrute de cores vibrantes, contraste nítido e acesso aos principais aplicativos de streaming.',
    specifications: [
      'Tela LED 55" 4K UHD (3840x2160)',
      'Sistema operacional WebOS 22',
      'Processador Quad Core',
      'HDR10 Pro para melhor contraste',
      'ThinQ AI com Google Assistant e Alexa',
      '3 HDMI + 2 USB + Wi-Fi + Bluetooth',
      'Suporte VESA 300x300mm',
      'Consumo energético classe A'
    ]
  },
  {
    id: 4,
    name: 'Sofá 3 Lugares Reclinável',
    price: 'R$ 1.899,90',
    oldPrice: 'R$ 2.399,90',
    discount: '21%',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'casa',
    rating: 4.6,
    inStock: true,
    description: 'Sofá reclinável de 3 lugares com design moderno e confortável. Perfeito para momentos de relaxamento em família, com mecanismo de reclinação suave.',
    specifications: [
      'Capacidade para 3 pessoas',
      'Mecanismo de reclinação manual',
      'Revestimento em tecido resistente',
      'Estrutura em madeira maciça',
      'Espuma de alta densidade',
      'Dimensões: 210cm x 95cm x 105cm',
      'Peso suportado: até 120kg por lugar',
      'Garantia de 2 anos'
    ]
  },
  {
    id: 5,
    name: 'Camiseta Polo Lacoste',
    price: 'R$ 259,90',
    oldPrice: 'R$ 319,90',
    discount: '19%',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'moda',
    rating: 4.4,
    inStock: true,
    description: 'Polo Lacoste clássica em algodão piqué, com o icônico crocodilo bordado. Design atemporal que combina elegância e conforto para o dia a dia.',
    specifications: [
      'Material: 100% algodão piqué',
      'Gola polo com 2 botões',
      'Corte regular fit',
      'Crocodilo bordado no peito',
      'Disponível em várias cores',
      'Tamanhos: P, M, G, GG',
      'Lavagem: máquina até 30°C',
      'Origem: Importado'
    ]
  },
  {
    id: 6,
    name: 'Fone de Ouvido Sony WH-1000XM4',
    price: 'R$ 899,90',
    oldPrice: 'R$ 1.199,90',
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'eletronicos',
    rating: 4.9,
    inStock: true,
    description: 'Fone de ouvido premium com cancelamento de ruído líder da indústria. Qualidade de som excepcional e bateria de até 30 horas.',
    specifications: [
      'Cancelamento de ruído ativo',
      'Bateria de até 30 horas',
      'Carregamento rápido: 10min = 5h',
      'Bluetooth 5.0 + NFC',
      'Hi-Res Audio e LDAC',
      'Controle por toque',
      'Microfone integrado',
      'Dobrável para transporte'
    ]
  },
  {
    id: 7,
    name: 'Bicicleta Mountain Bike Aro 29',
    price: 'R$ 1.599,90',
    oldPrice: 'R$ 1.999,90',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1544191696-15103650ba3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'esportes',
    rating: 4.6,
    inStock: true,
    description: 'Mountain bike profissional com quadro em alumínio e componentes de alta qualidade. Ideal para trilhas e aventuras off-road.',
    specifications: [
      'Quadro em alumínio 6061',
      'Rodas aro 29 com freios a disco',
      'Câmbio traseiro Shimano 21 velocidades',
      'Suspensão dianteira com curso de 100mm',
      'Pneus anti-furo para trail',
      'Peso aproximado: 15kg',
      'Altura recomendada: 1,70m a 1,90m',
      'Garantia vitalícia do quadro'
    ]
  },
  {
    id: 8,
    name: 'Mesa de Jantar 6 Lugares',
    price: 'R$ 1.199,90',
    oldPrice: 'R$ 1.499,90',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400',
    category: 'casa',
    rating: 4.5,
    inStock: true,
    description: 'Mesa de jantar elegante para 6 pessoas, com tampo em MDF e acabamento moderno. Perfeita para refeições em família.',
    specifications: [
      'Capacidade para 6 pessoas',
      'Tampo em MDF 25mm',
      'Pés em madeira maciça',
      'Acabamento verniz fosco',
      'Dimensões: 160cm x 90cm x 75cm',
      'Peso: aproximadamente 45kg',
      'Montagem necessária',
      'Garantia de 1 ano'
    ]
  }
];

export const categories = [
  { id: 'todos', name: 'Todos os Produtos', icon: 'fas fa-th-large' },
  { id: 'eletronicos', name: 'Eletrônicos', icon: 'fas fa-mobile-alt' },
  { id: 'moda', name: 'Moda & Acessórios', icon: 'fas fa-tshirt' },
  { id: 'casa', name: 'Casa & Decoração', icon: 'fas fa-home' },
  { id: 'esportes', name: 'Esportes & Lazer', icon: 'fas fa-dumbbell' }
];