import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaEcommerce() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const systemData = {
    id: 'ecommerce',
    title: 'E-commerce para Lojas Físicas',
    subtitle: 'Transforme sua loja física em digital',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-shopping-cart',
    description: 'Nossa plataforma de e-commerce foi desenvolvida especialmente para empresários que já possuem loja física e querem expandir suas vendas para o mundo digital. Mantenha a mesma gestão de estoque da sua loja física sincronizada com seu site.',
    mainBenefits: [
      {
        icon: 'fas fa-sync-alt',
        title: 'Sincronização de Estoque',
        description: 'Estoque único entre loja física e virtual - nunca mais venda o que não tem'
      },
      {
        icon: 'fas fa-mobile-alt',
        title: 'Design Responsivo',
        description: 'Loja que funciona perfeitamente em qualquer dispositivo móvel'
      },
      {
        icon: 'fas fa-shipping-fast',
        title: 'Gestão de Entregas',
        description: 'Controle completo de entregas, retirada na loja e fretes automáticos'
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Relatórios Integrados',
        description: 'Análise de vendas unificada entre canais físico e digital'
      }
    ],
    detailedFeatures: {
      catalogo: {
        title: 'Catálogo de Produtos',
        features: [
          'Importação automática do seu estoque atual',
          'Fotos profissionais dos produtos',
          'Descrições otimizadas para SEO',
          'Categorização inteligente',
          'Sistema de busca avançada',
          'Produtos relacionados automáticos'
        ]
      },
      vendas: {
        title: 'Processamento de Vendas',
        features: [
          'Carrinho de compras intuitivo',
          'Checkout em uma página',
          'Múltiplas formas de pagamento',
          'Cupons de desconto automáticos',
          'Abandono de carrinho recuperado',
          'Upsell e cross-sell inteligente'
        ]
      },
      estoque: {
        title: 'Gestão Unificada',
        features: [
          'Estoque único para ambos os canais',
          'Alertas de baixo estoque',
          'Controle de fornecedores',
          'Histórico de movimentações',
          'Inventário automatizado',
          'Previsão de demanda'
        ]
      },
      marketing: {
        title: 'Marketing Digital',
        features: [
          'Email marketing automatizado',
          'Integração com redes sociais',
          'Programas de fidelidade',
          'Remarketing personalizado',
          'Análise de comportamento',
          'Campanhas segmentadas'
        ]
      }
    },
    advantages: [
      {
        title: 'Aumento de 250% nas Vendas',
        description: 'Lojas físicas que migram para digital aumentam vendas significativamente'
      },
      {
        title: 'Redução de 40% em Custos',
        description: 'Automatização de processos reduz custos operacionais'
      },
      {
        title: 'Alcance 24/7 de Clientes',
        description: 'Sua loja funcionando 24 horas por dia, 7 dias por semana'
      },
      {
        title: 'ROI de 300% em 8 Meses',
        description: 'Retorno rápido do investimento com crescimento sustentável'
      }
    ],
    testimonial: {
      quote: 'Em 6 meses duplicamos nossas vendas! O e-commerce integrado com nossa loja física foi a melhor decisão que tomamos.',
      name: 'Maria Silva',
      position: 'Proprietária, Moda & Estilo',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    }
  };

  return (
    <>
      <Header />
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden min-h-[80vh] md:min-h-[70vh]">
          <div className="absolute inset-0 z-0">
            <img 
              src={systemData.image}
              alt={systemData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-overlay"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 flex items-center min-h-[inherit]">
            <div className="w-full">
              <div className="flex items-center mb-4 md:mb-6">
                <Link 
                  href="/" 
                  className="text-white/80 hover:text-white flex items-center text-sm md:text-base"
                  data-testid="back-to-catalog"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Voltar ao Catálogo
                </Link>
              </div>
              
              <div className="max-w-4xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 md:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 md:mr-6">
                    <i className={`${systemData.icon} text-white text-xl sm:text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h1 className="raleway text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2" data-testid="system-title">
                      {systemData.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90" data-testid="system-subtitle">
                      {systemData.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed" data-testid="system-description">
                  {systemData.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link 
                    href="/demo/ecommerce"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    data-testid="button-demo"
                  >
                    <i className="fas fa-play mr-2"></i>
                    Ver Demo da Loja
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Systems Message */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <CustomSystemsMessage variant="banner" />
          </div>
        </section>

        {/* Main Benefits */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="raleway text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" data-testid="benefits-title">
              Principais Benefícios
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {systemData.mainBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 sm:p-0" data-testid={`benefit-${index}`}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <i className={`${benefit.icon} text-primary text-lg sm:text-2xl`}></i>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 raleway">{benefit.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sistema Interface Screenshots */}
        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="raleway text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" data-testid="interface-title">
              Interface da Loja Virtual
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group cursor-pointer" data-testid="interface-image-1">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Dashboard de Vendas"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">Dashboard de Vendas</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">Painel de Controle</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Acompanhe vendas e métricas em tempo real</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Catálogo de Produtos"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">Catálogo de Produtos</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">Gestão de Produtos</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Organize e gerencie todo seu catálogo</p>
              </div>
              
              <div className="group cursor-pointer md:col-span-2 lg:col-span-1" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Checkout da Loja"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">Processo de Compra</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">Checkout Otimizado</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Processo de compra simples e seguro</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="raleway text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" data-testid="features-title">
              Funcionalidades Detalhadas
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {Object.entries(systemData.detailedFeatures).map(([key, section]) => (
                <div key={key} className="bg-background rounded-lg md:rounded-xl p-4 sm:p-6 md:p-8" data-testid={`feature-section-${key}`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 raleway text-primary">{section.title}</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-primary mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base"></i>
                        <span className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages with Numbers */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="raleway text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" data-testid="advantages-title">
              Resultados Comprovados
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {systemData.advantages.map((advantage, index) => (
                <div key={index} className="bg-card rounded-lg md:rounded-xl p-6 md:p-8 text-center" data-testid={`advantage-${index}`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-primary raleway">{advantage.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}