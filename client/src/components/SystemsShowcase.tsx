import { Link } from "wouter";

export default function SystemsShowcase() {
  const systems = [
    {
      id: 'erp',
      title: 'ERP',
      description: 'Sistema de gestão empresarial completo que integra todos os departamentos da sua empresa em uma única plataforma.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-chart-line',
      features: [
        'Gestão financeira integrada',
        'Controle de estoque em tempo real',
        'Relatórios gerenciais avançados'
      ]
    },
    {
      id: 'crm',
      title: 'CRM',
      description: 'Gestão completa do relacionamento com clientes, desde o primeiro contato até a fidelização.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-users',
      features: [
        'Histórico completo do cliente',
        'Automação de vendas',
        'Pipeline de oportunidades'
      ]
    },
    {
      id: 'restaurant',
      title: 'Sistema de Comandas',
      description: 'Otimize o atendimento em restaurantes com controle completo de pedidos e gestão de mesas.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-utensils',
      features: [
        'Pedidos digitais integrados',
        'Gestão de mesas em tempo real',
        'Relatórios de vendas'
      ]
    },
    {
      id: 'financial',
      title: 'Sistema Financeiro',
      description: 'Controle total das finanças da sua empresa com gestão de fluxo de caixa e análises preditivas.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-calculator',
      features: [
        'Fluxo de caixa em tempo real',
        'Conciliação bancária automática',
        'Análises preditivas'
      ]
    },
    {
      id: 'inventory',
      title: 'Estoque e Logística',
      description: 'Sistema completo para gestão de estoque, compras e logística com rastreamento em tempo real.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-boxes',
      features: [
        'Controle de estoque inteligente',
        'Gestão de fornecedores',
        'Rastreamento de produtos'
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-commerce para Lojas Físicas',
      description: 'Transforme sua loja física em digital com sincronização de estoque e gestão unificada de vendas.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-shopping-cart',
      features: [
        'Sincronização de estoque unificado',
        'Design responsivo otimizado',
        'Gestão integrada de entregas'
      ]
    },
    {
      id: 'education',
      title: 'Plataforma EAD',
      description: 'Plataforma completa de ensino a distância com gestão de cursos, alunos e certificações.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-graduation-cap',
      features: [
        'Gestão completa de cursos',
        'Sistema de avaliações',
        'Certificação automática'
      ]
    }
  ];

  return (
    <section id="sistemas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              CATÁLOGO DE SOLUÇÕES DIGITAIS
            </span>
          </div>
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="systems-title">
            Sistemas Empresariais G&L
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="systems-subtitle">
            Soluções tecnológicas completas e personalizadas desenvolvidas pela G&L Systems para revolucionar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system) => (
            <Link 
              key={system.id}
              href={`/sistema/${system.id}`}
              className="fade-in hover-lift bg-card border border-border rounded-xl p-8 group block transition-all hover:scale-105 hover:shadow-xl"
              data-testid={`system-card-${system.id}`}
            >
              <img 
                src={system.image}
                alt={`${system.title} interface and functionality`}
                className="w-full h-48 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform"
              />
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <i className={`${system.icon} text-primary text-xl`}></i>
                </div>
                <h3 className="text-2xl font-bold raleway" data-testid={`system-title-${system.id}`}>
                  {system.title}
                </h3>
              </div>
              <p className="text-muted-foreground mb-6" data-testid={`system-description-${system.id}`}>
                {system.description}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {system.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center text-primary font-semibold mt-auto">
                <span>Ver detalhes</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
