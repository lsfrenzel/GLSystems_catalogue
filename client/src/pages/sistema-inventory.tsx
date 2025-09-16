import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaInventory() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'inventory',
    title: 'Sistema de Estoque e Logística',
    subtitle: 'Gestão inteligente de estoque e supply chain',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-boxes',
    description: 'O sistema de estoque e logística da TechSolutions oferece controle completo da cadeia de suprimentos com rastreamento em tempo real, gestão de fornecedores e otimização de inventário.',
    mainBenefits: [
      {
        icon: 'fas fa-warehouse',
        title: 'Controle de Inventário',
        description: 'Rastreamento preciso de todos os produtos em tempo real'
      },
      {
        icon: 'fas fa-truck',
        title: 'Gestão Logística',
        description: 'Otimização de rotas e controle de entregas'
      },
      {
        icon: 'fas fa-chart-network',
        title: 'Supply Chain',
        description: 'Gestão completa da cadeia de suprimentos'
      },
      {
        icon: 'fas fa-bell',
        title: 'Alertas Inteligentes',
        description: 'Notificações automáticas de estoque mínimo e reposição'
      }
    ],
    detailedFeatures: {
      estoque: {
        title: 'Gestão de Estoque',
        features: [
          'Inventário em tempo real',
          'Controle de lotes e validade',
          'Alertas de estoque mínimo',
          'Múltiplos depósitos',
          'Rastreabilidade completa',
          'Controle de qualidade'
        ]
      },
      compras: {
        title: 'Gestão de Compras',
        features: [
          'Solicitações de compra',
          'Cotações e aprovações',
          'Controle de fornecedores',
          'Histórico de preços',
          'Análise de performance',
          'Integração com financeiro'
        ]
      },
      logistica: {
        title: 'Controle Logístico',
        features: [
          'Gestão de transportadoras',
          'Otimização de rotas',
          'Rastreamento de entregas',
          'Controle de fretes',
          'Agendamento de cargas',
          'Relatórios de performance'
        ]
      },
      analytics: {
        title: 'Análises e Relatórios',
        features: [
          'Curva ABC de produtos',
          'Análise de giro de estoque',
          'Previsão de demanda',
          'Indicadores de performance',
          'Dashboards em tempo real',
          'Relatórios customizados'
        ]
      }
    },
    advantages: [
      {
        title: 'Redução de 40% nos Custos de Estoque',
        description: 'Otimização elimina excessos e reduz custos de armazenagem'
      },
      {
        title: 'Aumento de 95% na Precisão',
        description: 'Controle automatizado elimina divergências de inventário'
      },
      {
        title: 'Melhoria de 60% na Eficiência Logística',
        description: 'Otimização de rotas e processos acelera entregas'
      },
      {
        title: 'ROI de 220% no Primeiro Ano',
        description: 'Economia em custos e otimização geram retorno rápido'
      }
    ],
    testimonial: {
      quote: 'O sistema de estoque revolucionou nossa logística. Conseguimos reduzir custos em 40% e melhorar significativamente nossos prazos de entrega.',
      name: 'Sandra Ferreira',
      position: 'Gerente de Operações, LogiMax',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    }
  };

  return (
    <>
      <Header />
      <main className="pt-0">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={systemData.image}
              alt={systemData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-overlay"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="flex items-center mb-6">
              <Link 
                href="/" 
                className="text-white/80 hover:text-white flex items-center mr-4"
                data-testid="back-to-catalog"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Voltar ao Catálogo
              </Link>
            </div>
            
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-6">
                  <i className={`${systemData.icon} text-white text-2xl`}></i>
                </div>
                <div>
                  <h1 className="raleway text-4xl md:text-6xl font-bold text-white mb-2" data-testid="system-title">
                    {systemData.title}
                  </h1>
                  <p className="text-xl text-white/90" data-testid="system-subtitle">
                    {systemData.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-white/90 mb-8 leading-relaxed" data-testid="system-description">
                {systemData.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/demo/inventory"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  data-testid="button-demo"
                >
                  <i className="fas fa-play mr-2"></i>
                  Testar Demo
                </Link>
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
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="raleway text-4xl font-bold text-center mb-16" data-testid="benefits-title">
              Principais Benefícios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {systemData.mainBenefits.map((benefit, index) => (
                <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${benefit.icon} text-primary text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4 raleway">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sistema Interface Screenshots */}
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="raleway text-4xl font-bold text-center mb-16" data-testid="interface-title">
              Interface do Sistema
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group cursor-pointer" data-testid="interface-image-1">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Controle de Estoque"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Controle de Estoque</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Gestão de Inventário</h3>
                <p className="text-sm text-muted-foreground">Controle de produtos e movimentações</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Gestão de Fornecedores"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Fornecedores</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Gestão de Compras</h3>
                <p className="text-sm text-muted-foreground">Controle de fornecedores e cotações</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Rastreamento Logístico"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Logística</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Controle Logístico</h3>
                <p className="text-sm text-muted-foreground">Rastreamento e otimização de entregas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="raleway text-4xl font-bold text-center mb-16" data-testid="features-title">
              Funcionalidades Detalhadas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {Object.entries(systemData.detailedFeatures).map(([key, section]) => (
                <div key={key} className="bg-background rounded-xl p-8" data-testid={`feature-section-${key}`}>
                  <h3 className="text-2xl font-bold mb-6 raleway text-primary">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-primary mr-3 mt-1 flex-shrink-0"></i>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages with Numbers */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="raleway text-4xl font-bold text-center mb-16" data-testid="advantages-title">
              Resultados Comprovados
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {systemData.advantages.map((advantage, index) => (
                <div key={index} className="bg-card rounded-xl p-8 text-center" data-testid={`advantage-${index}`}>
                  <h3 className="text-2xl font-bold mb-4 text-primary raleway">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
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