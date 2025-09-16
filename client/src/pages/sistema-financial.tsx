import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaFinancial() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'financial',
    title: 'Sistema Financeiro Completo',
    subtitle: 'Controle total das finanças da sua empresa',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-calculator',
    description: 'O sistema financeiro da TechSolutions oferece controle total das finanças com gestão de fluxo de caixa, análises preditivas e relatórios gerenciais. Tome decisões financeiras inteligentes baseadas em dados.',
    mainBenefits: [
      {
        icon: 'fas fa-money-bill-wave',
        title: 'Fluxo de Caixa',
        description: 'Controle completo de entradas e saídas em tempo real'
      },
      {
        icon: 'fas fa-chart-line',
        title: 'Análises Preditivas',
        description: 'Previsões financeiras baseadas em inteligência artificial'
      },
      {
        icon: 'fas fa-file-invoice',
        title: 'Gestão Fiscal',
        description: 'Emissão de NFe e controle completo de impostos'
      },
      {
        icon: 'fas fa-shield-check',
        title: 'Segurança Bancária',
        description: 'Conciliação automática e proteção de dados financeiros'
      }
    ],
    detailedFeatures: {
      caixa: {
        title: 'Fluxo de Caixa',
        features: [
          'Controle de contas a pagar e receber',
          'Projeções de fluxo de caixa',
          'Alertas de vencimento',
          'Controle de inadimplência',
          'Múltiplas formas de pagamento',
          'Relatórios de movimentação'
        ]
      },
      fiscal: {
        title: 'Gestão Fiscal',
        features: [
          'Emissão de NFe, NFCe e NFSe',
          'Cálculo automático de impostos',
          'SPED Fiscal e Contábil',
          'Controle de regime tributário',
          'Declarações obrigatórias',
          'Auditoria fiscal integrada'
        ]
      },
      bancario: {
        title: 'Controle Bancário',
        features: [
          'Conciliação bancária automática',
          'Múltiplas contas correntes',
          'Controle de cheques',
          'Transferências entre contas',
          'Extrato bancário integrado',
          'Controle de aplicações'
        ]
      },
      relatorios: {
        title: 'Relatórios Gerenciais',
        features: [
          'DRE (Demonstração de Resultado)',
          'Balanço patrimonial',
          'Análise de custos',
          'Indicadores financeiros',
          'Comparativos de período',
          'Gráficos e dashboards'
        ]
      }
    },
    advantages: [
      {
        title: 'Redução de 80% em Erros Contábeis',
        description: 'Automação elimina erros manuais em cálculos e lançamentos'
      },
      {
        title: 'Economia de 60% no Tempo Contábil',
        description: 'Processos automatizados aceleram rotinas financeiras'
      },
      {
        title: 'Melhoria de 90% na Precisão Fiscal',
        description: 'Cálculos automáticos garantem conformidade tributária'
      },
      {
        title: 'ROI de 180% no Primeiro Ano',
        description: 'Economia em multas e otimização financeira geram retorno'
      }
    ],
    testimonial: {
      quote: 'O sistema financeiro nos deu controle total sobre nossas finanças. Conseguimos reduzir custos e melhorar nossa margem de lucro significativamente.',
      name: 'Roberto Lima',
      position: 'CFO, TechCorp',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
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
                  href="/demo/financial"
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
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Dashboard Financeiro"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Dashboard Financeiro</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Painel Financeiro</h3>
                <p className="text-sm text-muted-foreground">Visão geral de receitas e despesas</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Fluxo de Caixa"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Fluxo de Caixa</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Controle de Fluxo</h3>
                <p className="text-sm text-muted-foreground">Gestão de contas a pagar e receber</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Relatórios Financeiros"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Relatórios</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Análises Detalhadas</h3>
                <p className="text-sm text-muted-foreground">DRE, balanços e indicadores</p>
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