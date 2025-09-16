import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaCRM() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'crm',
    title: 'CRM - Customer Relationship Management',
    subtitle: 'Transform leads into loyal customers',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-users',
    description: 'TechSolutions CRM system offers complete customer relationship management, from first contact to loyalty. Automate sales, organize data and increase your conversion rate.',
    mainBenefits: [
      {
        icon: 'fas fa-user-plus',
        title: 'Lead Generation',
        description: 'Capture and organize all prospects in a sales funnel'
      },
      {
        icon: 'fas fa-chart-trending-up',
        title: 'Sales Increase',
        description: 'Increase your sales by up to 60% with intelligent automation'
      },
      {
        icon: 'fas fa-heart',
        title: 'Customer Loyalty',
        description: 'Keep customers engaged with personalized communication'
      },
      {
        icon: 'fas fa-analytics',
        title: 'Performance Analysis',
        description: 'Detailed reports on team and sales results'
      }
    ],
    detailedFeatures: {
      leads: {
        title: 'Gestão de Leads',
        features: [
          'Captura automática de leads do site',
          'Qualificação e scoring de prospects',
          'Distribuição automática para vendedores',
          'Acompanhamento do funil de vendas',
          'Integração com redes sociais',
          'Landing pages integradas'
        ]
      },
      vendas: {
        title: 'Automação de Vendas',
        features: [
          'Pipeline visual de oportunidades',
          'Sequências de e-mail automatizadas',
          'Agendamento de follow-ups',
          'Propostas e contratos digitais',
          'Gestão de comissões',
          'Previsão de vendas'
        ]
      },
      clientes: {
        title: 'Relacionamento com Clientes',
        features: [
          'Histórico completo de interações',
          'Segmentação de clientes',
          'Campanhas de e-mail marketing',
          'Pesquisas de satisfação',
          'Programa de fidelidade',
          'Suporte ao cliente integrado'
        ]
      },
      relatorios: {
        title: 'Relatórios e Análises',
        features: [
          'Dashboard de vendas em tempo real',
          'Relatórios de performance individual',
          'Análise de ROI de campanhas',
          'Métricas de satisfação do cliente',
          'Previsões de receita',
          'Comparativos de período'
        ]
      }
    },
    advantages: [
      {
        title: 'Aumento de 60% nas Vendas',
        description: 'Automação e organização levam a mais oportunidades fechadas'
      },
      {
        title: 'Redução de 40% no Ciclo de Vendas',
        description: 'Processos otimizados aceleram o fechamento de negócios'
      },
      {
        title: 'Melhoria de 50% na Satisfação',
        description: 'Atendimento personalizado aumenta satisfação dos clientes'
      },
      {
        title: 'ROI de 300% no Primeiro Ano',
        description: 'Retorno garantido com aumento significativo de vendas'
      }
    ],
    testimonial: {
      quote: 'O CRM nos ajudou a organizar nossa base de clientes e aumentar nossas vendas em 60%. Recomendo para qualquer empresa séria.',
      name: 'Maria Santos',
      position: 'Diretora Comercial, VendaMais',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
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
                  href="/demo/crm"
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
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6">
            <CustomSystemsMessage variant="banner" className="mx-auto" />
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
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Dashboard do CRM"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Dashboard CRM</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Dashboard de Vendas</h3>
                <p className="text-sm text-muted-foreground">Visão geral de oportunidades e conversões</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Funil de Vendas do CRM"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Funil de Vendas</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Pipeline de Oportunidades</h3>
                <p className="text-sm text-muted-foreground">Acompanhe cada lead até o fechamento</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Relatórios do CRM"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Relatórios</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Análise de Performance</h3>
                <p className="text-sm text-muted-foreground">Relatórios detalhados de vendas e equipe</p>
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