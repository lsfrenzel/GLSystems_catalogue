import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaERP() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'erp',
    title: 'ERP - Enterprise Management System',
    subtitle: 'Complete and integrated management for your company',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-chart-line',
    description: 'TechSolutions ERP system is a complete solution that integrates all departments of your company into a single platform. Financial control, inventory, sales, purchasing and human resources in one place.',
    mainBenefits: [
      {
        icon: 'fas fa-integrate',
        title: 'Total Integration',
        description: 'All company sectors connected in a single platform'
      },
      {
        icon: 'fas fa-chart-bar',
        title: 'Real-Time Reports',
        description: 'Visualize company performance with interactive dashboards'
      },
      {
        icon: 'fas fa-shield-alt',
        title: 'Data Security',
        description: 'User access control and automatic backup'
      },
      {
        icon: 'fas fa-mobile-alt',
        title: 'Mobile Access',
        description: 'Manage your company from anywhere through the mobile app'
      }
    ],
    detailedFeatures: {
      financeiro: {
        title: 'Financial Management',
        features: [
          'Accounts payable and receivable control',
          'Real-time cash flow',
          'Automatic bank reconciliation',
          'Tax and accounting reports',
          'Cost center control',
          'Profitability analysis'
        ]
      },
      vendas: {
        title: 'Sales Management',
        features: [
          'Complete customer registration',
          'Order and quote management',
          'Commission control',
          'Sales team analysis',
          'Negotiation history',
          'E-commerce integration'
        ]
      },
      estoque: {
        title: 'Inventory Control',
        features: [
          'Real-time inventory',
          'Input and output control',
          'Supplier management',
          'Minimum stock alerts',
          'Product traceability',
          'Expiry date control'
        ]
      },
      rh: {
        title: 'Human Resources',
        features: [
          'Employee registration',
          'Time tracking',
          'Payroll',
          'Benefits management',
          'Performance evaluation',
          'Labor reports'
        ]
      }
    },
    advantages: [
      {
        title: '70% Reduction in Process Time',
        description: 'Automation eliminates repetitive manual tasks'
      },
      {
        title: '45% Increase in Productivity',
        description: 'Centralized information accelerates decision making'
      },
      {
        title: '30% Savings in Operational Costs',
        description: 'Resource optimization and waste reduction'
      },
      {
        title: '250% ROI in the First Year',
        description: 'Return on investment proven by our customers'
      }
    ],
    testimonial: {
      quote: 'TechSolutions ERP completely transformed our operation. We managed to reduce costs by 40% and significantly increase our productivity.',
      name: 'Carlos Silva',
      position: 'CEO, IndustTech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
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
                Back to Catalog
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
                  href="/demo/erp"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  data-testid="button-demo"
                >
                  <i className="fas fa-play mr-2"></i>
                  Test Demo
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
              Main Benefits
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
              System Interface
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group cursor-pointer" data-testid="interface-image-1">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Main ERP Dashboard"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Main Dashboard</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Executive Dashboard</h3>
                <p className="text-sm text-muted-foreground">Overview of sales, inventory and finance</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Módulo Financeiro do ERP"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Gestão Financeira</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Módulo Financeiro</h3>
                <p className="text-sm text-muted-foreground">Controle completo de receitas e despesas</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Módulo de Estoque do ERP"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Controle de Estoque</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Gestão de Estoque</h3>
                <p className="text-sm text-muted-foreground">Controle de produtos e movimentações</p>
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