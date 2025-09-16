import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";

export default function SistemaEducation() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'education',
    title: 'Plataforma EAD Completa',
    subtitle: 'Educação online de alta qualidade',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-graduation-cap',
    description: 'A plataforma EAD da TechSolutions oferece uma solução completa para ensino a distância com gestão de cursos, alunos, certificações e ferramentas interativas de aprendizagem.',
    mainBenefits: [
      {
        icon: 'fas fa-play-circle',
        title: 'Aulas Interativas',
        description: 'Vídeos, quizzes e atividades para engajar estudantes'
      },
      {
        icon: 'fas fa-certificate',
        title: 'Certificação Digital',
        description: 'Emissão automática de certificados com validade legal'
      },
      {
        icon: 'fas fa-users-class',
        title: 'Gestão de Turmas',
        description: 'Controle completo de alunos, professores e turmas'
      },
      {
        icon: 'fas fa-chart-bar',
        title: 'Analytics Educacional',
        description: 'Relatórios detalhados de performance e engajamento'
      }
    ],
    detailedFeatures: {
      cursos: {
        title: 'Gestão de Cursos',
        features: [
          'Criação de cursos modulares',
          'Upload de vídeos e materiais',
          'Quizzes e avaliações',
          'Trilhas de aprendizagem',
          'Pré-requisitos entre módulos',
          'Controle de acesso por período'
        ]
      },
      alunos: {
        title: 'Portal do Aluno',
        features: [
          'Dashboard personalizado',
          'Progresso de estudos',
          'Histórico de notas',
          'Certificados digitais',
          'Fórum de discussões',
          'Mensagens com instrutores'
        ]
      },
      professores: {
        title: 'Ferramentas do Professor',
        features: [
          'Criação de conteúdo',
          'Correção automatizada',
          'Relatórios de turma',
          'Comunicação com alunos',
          'Agendamento de aulas ao vivo',
          'Banco de questões'
        ]
      },
      gestao: {
        title: 'Gestão Administrativa',
        features: [
          'Matrículas e renovações',
          'Controle financeiro',
          'Relatórios gerenciais',
          'Certificações em lote',
          'Integração com sistemas',
          'Backup automático'
        ]
      }
    },
    advantages: [
      {
        title: 'Aumento de 200% na Capacidade',
        description: 'Atenda muito mais alunos sem limitações físicas'
      },
      {
        title: 'Redução de 60% nos Custos',
        description: 'Elimine custos de infraestrutura física e materiais'
      },
      {
        title: 'Melhoria de 80% no Engajamento',
        description: 'Ferramentas interativas mantêm alunos mais engajados'
      },
      {
        title: 'ROI de 300% no Primeiro Ano',
        description: 'Expansão digital gera retorno exponencial'
      }
    ],
    testimonial: {
      quote: 'A plataforma EAD nos permitiu expandir nossos cursos nacionalmente. Triplicamos nossa receita no primeiro ano.',
      name: 'Ana Costa',
      position: 'Diretora, EduTech Academy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
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
                  href="/demo/education"
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
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Portal do Aluno"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Portal do Aluno</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Dashboard do Aluno</h3>
                <p className="text-sm text-muted-foreground">Área personalizada para estudos</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Aulas Online"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Aulas Interativas</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Sala Virtual</h3>
                <p className="text-sm text-muted-foreground">Vídeo-aulas e conteúdo interativo</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt="Relatórios Educacionais"
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">Analytics</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">Gestão Acadêmica</h3>
                <p className="text-sm text-muted-foreground">Relatórios e análise de performance</p>
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