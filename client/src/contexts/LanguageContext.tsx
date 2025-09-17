import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    'nav.systems': 'Sistemas',
    'nav.benefits': 'Benefícios', 
    'nav.comparison': 'Comparativo',
    'nav.contact': 'Contato',
    'header.tagline': 'Líder em soluções tecnológicas empresariais',
    
    // Hero
    'hero.badge': '🚀 LÍDER DE MERCADO EM TECNOLOGIA',
    'hero.title': 'Revolucionamos seu negócio',
    'hero.titleGradient': 'com tecnologia de ponta',
    'hero.subtitle': 'Criamos sistemas, sites, apps e estratégias de marketing digital que impulsionam empresas para o futuro. Somos especialistas em transformar ideias em soluções tecnológicas revolucionárias.',
    'hero.ctaPrimary': 'Descubra Nossas Soluções',
    'hero.ctaSecondary': 'Falar com Especialista',
    'hero.statSystems': 'Sistemas Criados',
    'hero.statSystemsDesc': 'Soluções personalizadas entregues',
    'hero.statSatisfaction': 'Satisfação dos Clientes',
    'hero.statSatisfactionDesc': 'Taxa de aprovação comprovada',
    'hero.statExperience': 'Anos de Experiência',
    'hero.statExperienceDesc': 'Liderança em inovação tecnológica',
    'hero.imageAlt': 'Escritório moderno com computadores e tecnologia',
    
    // Systems Showcase
    'systems.badge': 'CATÁLOGO DE SOLUÇÕES DIGITAIS',
    'systems.title': 'Sistemas Empresariais G&L',
    'systems.subtitle': 'Soluções tecnológicas completas e personalizadas desenvolvidas pela G&L Systems para revolucionar seu negócio',
    'systems.erp.title': 'ERP',
    'systems.erp.description': 'Sistema de gestão empresarial completo que integra todos os departamentos da sua empresa em uma única plataforma.',
    'systems.crm.title': 'CRM',
    'systems.crm.description': 'Gestão completa do relacionamento com clientes, desde o primeiro contato até a fidelização.',
    'systems.restaurant.title': 'Sistema de Comandas',
    'systems.restaurant.description': 'Otimize o atendimento em restaurantes com controle completo de pedidos e gestão de mesas.',
    'systems.financial.title': 'Sistema Financeiro',
    'systems.financial.description': 'Controle total das finanças da sua empresa com gestão de fluxo de caixa e análises preditivas.',
    'systems.inventory.title': 'Estoque e Logística',
    'systems.inventory.description': 'Sistema completo para gestão de estoque, compras e logística com rastreamento em tempo real.',
    'systems.ecommerce.title': 'E-commerce para Lojas Físicas',
    'systems.ecommerce.description': 'Transforme sua loja física em digital com sincronização de estoque e gestão unificada de vendas.',
    'systems.education.title': 'Plataforma EAD',
    'systems.education.description': 'Plataforma completa de ensino a distância com gestão de cursos, alunos e certificações.',
    'systems.seeDetails': 'Ver detalhes',
    'systems.imageAltSuffix': 'interface e funcionalidade',
    
    // System features
    'systems.erp.feature1': 'Gestão financeira integrada',
    'systems.erp.feature2': 'Controle de estoque em tempo real',
    'systems.erp.feature3': 'Relatórios gerenciais avançados',
    'systems.crm.feature1': 'Histórico completo do cliente',
    'systems.crm.feature2': 'Automação de vendas',
    'systems.crm.feature3': 'Pipeline de oportunidades',
    'systems.restaurant.feature1': 'Pedidos digitais integrados',
    'systems.restaurant.feature2': 'Gestão de mesas em tempo real',
    'systems.restaurant.feature3': 'Relatórios de vendas',
    'systems.financial.feature1': 'Fluxo de caixa em tempo real',
    'systems.financial.feature2': 'Conciliação bancária automática',
    'systems.financial.feature3': 'Análises preditivas',
    'systems.inventory.feature1': 'Controle de estoque inteligente',
    'systems.inventory.feature2': 'Gestão de fornecedores',
    'systems.inventory.feature3': 'Rastreamento de produtos',
    'systems.ecommerce.feature1': 'Sincronização de estoque unificado',
    'systems.ecommerce.feature2': 'Design responsivo otimizado',
    'systems.ecommerce.feature3': 'Gestão integrada de entregas',
    'systems.education.feature1': 'Gestão completa de cursos',
    'systems.education.feature2': 'Sistema de avaliações',
    'systems.education.feature3': 'Certificação automática',
    
    // Benefits
    'benefits.title': 'Benefícios dos Nossos Sistemas',
    'benefits.subtitle': 'Transforme sua empresa com soluções que geram resultados mensuráveis e sustentáveis',
    'benefits.productivity': 'Aumento de Produtividade',
    'benefits.productivityDesc': 'Automação de processos que reduz o tempo gasto em tarefas manuais em até 70%',
    'benefits.errorReduction': 'Redução de Erros',
    'benefits.errorReductionDesc': 'Sistemas inteligentes que minimizam erros humanos e garantem consistência operacional',
    'benefits.profitGrowth': 'Aumento de Lucros',
    'benefits.profitGrowthDesc': 'Otimização de recursos e processos que resultam em aumento médio de 35% na margem de lucro',
    'benefits.dataDecisions': 'Decisões Baseadas em Dados',
    'benefits.dataDecisionsDesc': 'Relatórios em tempo real e análises preditivas para tomadas de decisão mais assertivas',
    'benefits.scalability': 'Escalabilidade',
    'benefits.scalabilityDesc': 'Sistemas que crescem junto com sua empresa, suportando expansão sem perda de performance',
    'benefits.customerSatisfaction': 'Satisfação do Cliente',
    'benefits.customerSatisfactionDesc': 'Atendimento mais eficiente e personalizado que aumenta a satisfação em até 60%',
    
    // Video Section
    'video.badge': '🎥 VEJA NOSSOS SISTEMAS EM AÇÃO',
    'video.title': 'Transformação Digital na Prática',
    'video.subtitle': 'Descubra como a G&L Systems revoluciona empresas através de demonstrações reais dos nossos sistemas',
    'video.overlayTitle': 'Demonstração Completa dos Sistemas G&L',
    'video.overlayDuration': '8:45 min • Casos reais de sucesso',
    'video.statViews': 'Visualizações',
    'video.statRating': 'Avaliação', 
    'video.statShares': 'Compartilhamentos',
    'video.contentTitle': 'Resultados Comprovados em Ação',
    'video.contentDescription': 'Veja empresas reais que transformaram seus negócios com nossas soluções. Desde pequenas startups até grandes corporações, todos alcançaram resultados extraordinários.',
    'video.testimonial1': '"Aumentamos nossa produtividade em 85% no primeiro mês"',
    'video.testimonial1Author': 'Maria Silva, CEO - TechCorp',
    'video.testimonial2': '"A satisfação dos nossos clientes subiu 70%"',
    'video.testimonial2Author': 'João Santos, Diretor - InnovaCorp',
    'video.testimonial3': '"ROI de 340% em apenas 6 meses de implementação"',
    'video.testimonial3Author': 'Ana Costa, CFO - GrowthCorp',
    'video.cta': 'Solicitar Demonstração Personalizada',
    'video.imageAlt': 'Miniatura do vídeo de demonstração da G&L Systems',
    
    // Comparison
    'comparison.title': 'Por que Escolher Sistemas Modernos?',
    'comparison.subtitle': 'Veja a diferença entre empresas que investem em tecnologia e aquelas que ficam para trás',
    'comparison.modernSystems': 'Sistemas Modernos',
    'comparison.modernSystemsDesc': 'Tecnologia que impulsiona o crescimento',
    'comparison.oldSystems': 'Sistemas Antigos/Sem Sistema',
    'comparison.oldSystemsDesc': 'Limitações que impedem o progresso',
    'comparison.productivity': 'Produtividade',
    'comparison.profitMargin': 'Margem de Lucro',
    'comparison.errorRate': 'Taxa de Erros',
    'comparison.responseTime': 'Tempo de Resposta',
    'comparison.scalability': 'Escalabilidade',
    'comparison.customerSatisfaction': 'Satisfação do Cliente',
    
    // Comparison details
    'comparison.productivityModern': 'Até 70% mais eficiente',
    'comparison.productivityModernDesc': 'Automação completa de processos',
    'comparison.productivityOld': 'Processos manuais lentos', 
    'comparison.productivityOldDesc': 'Tarefas repetitivas e demoradas',
    
    'comparison.profitMarginModern': '+35% em média',
    'comparison.profitMarginModernDesc': 'Controle total de custos e receitas',
    'comparison.profitMarginOld': 'Sem visibilidade de custos',
    'comparison.profitMarginOldDesc': 'Oportunidades perdidas de economia',
    
    'comparison.errorRateModern': '80% de redução',
    'comparison.errorRateModernDesc': 'Validação automática e controles rígidos',
    'comparison.errorRateOld': 'Erros frequentes',
    'comparison.errorRateOldDesc': 'Erros humanos e retrabalho',
    
    'comparison.responseTimeModern': 'Tempo real',
    'comparison.responseTimeModernDesc': 'Informações atualizadas instantaneamente',
    'comparison.responseTimeOld': 'Dias ou semanas',
    'comparison.responseTimeOldDesc': 'Atraso na consolidação de dados',
    
    'comparison.scalabilityModern': 'Crescimento ilimitado',
    'comparison.scalabilityModernDesc': 'Adapta-se ao tamanho do seu negócio',
    'comparison.scalabilityOld': 'Limitações constantes',
    'comparison.scalabilityOldDesc': 'Gargalos de crescimento',
    
    'comparison.customerSatisfactionModern': '+60% de satisfação',
    'comparison.customerSatisfactionModernDesc': 'Atendimento ágil e personalizado',
    'comparison.customerSatisfactionOld': 'Reclamações frequentes',
    'comparison.customerSatisfactionOldDesc': 'Atrasos e falta de informações',
    
    // Custom Systems Message
    'customSystems.title': 'Soluções Personalizadas',
    'customSystems.description': 'Desenvolvemos sistemas personalizados de acordo com as necessidades específicas da sua empresa',
    
    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Solicite uma demonstração gratuita e descubra como podemos transformar seu negócio',
    'contact.nameLabel': 'Nome Completo',
    'contact.namePlaceholder': 'Seu nome completo',
    'contact.emailLabel': 'E-mail Profissional',
    'contact.emailPlaceholder': 'seu@empresa.com.br',
    'contact.companyLabel': 'Empresa',
    'contact.companyPlaceholder': 'Nome da sua empresa',
    'contact.phoneLabel': 'Telefone',
    'contact.phonePlaceholder': '(11) 99999-9999',
    'contact.systemLabel': 'Sistema de Interesse',
    'contact.systemPlaceholder': 'Selecione um sistema',
    'contact.messageLabel': 'Mensagem',
    'contact.messagePlaceholder': 'Conte-nos mais sobre suas necessidades e objetivos...',
    'contact.marketingLabel': 'Aceito receber comunicações sobre soluções e demonstrações',
    'contact.marketingAccept': 'Aceito receber comunicações sobre soluções e demonstrações',
    'contact.submitButton': 'Solicitar Demonstração Gratuita',
    'contact.submitting': 'Enviando...',
    'contact.sending': 'Enviando...',
    'contact.successTitle': 'Sucesso!',
    'contact.successMessage': 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
    'contact.errorTitle': 'Erro',
    'contact.errorMessage': 'Erro ao enviar solicitação. Tente novamente.',
    'contact.successPageTitle': 'Solicitação Enviada com Sucesso!',
    'contact.successPageMessage': 'Recebemos sua solicitação e entraremos em contato em breve para agendar sua demonstração gratuita.',
    'contact.sendAnother': 'Enviar Nova Solicitação',
    'contact.directContact': 'Ou entre em contato diretamente:',
    'contact.alternativeTitle': 'Ou entre em contato diretamente:',
    'contact.systems.erp': 'ERP - Gestão Empresarial',
    'contact.systems.crm': 'CRM - Relacionamento com Clientes',
    'contact.systems.restaurant': 'Sistema de Comandas',
    'contact.systems.financial': 'Sistema Financeiro',
    'contact.systems.inventory': 'Estoque e Logística',
    'contact.systems.education': 'Plataforma EAD',
    'contact.systems.all': 'Todos os Sistemas',
    
    // Footer
    'footer.companyName': 'G&L Systems',
    'footer.companyTagline': 'Líder em tecnologia empresarial',
    'footer.description': 'Especialistas em sistemas, sites, apps, tráfego pago e marketing digital. Transformamos negócios com tecnologia de ponta e soluções personalizadas há mais de 15 anos.',
    'footer.systemsTitle': 'Sistemas',
    'footer.contactTitle': 'Contato',
    'footer.copyright': '© 2025 G&L Systems. Todos os direitos reservados.',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Política de Privacidade',
    'footer.cookies': 'Cookies',
    'footer.systems.erp': 'ERP Empresarial',
    'footer.systems.crm': 'CRM',
    'footer.systems.restaurant': 'Sistema de Comandas',
    'footer.systems.financial': 'Controle Financeiro',
    'footer.systems.inventory': 'Estoque e Logística',
    'footer.systems.education': 'Plataforma EAD',
    'footer.phoneNumber': '(11) 97536-3887',
    
    // WhatsApp
    'whatsapp.tooltip': 'Falar no WhatsApp',
    
    // Scroll to top
    'scrollTop.tooltip': 'Voltar ao topo'
  },
  en: {
    // Header  
    'nav.systems': 'Systems',
    'nav.benefits': 'Benefits',
    'nav.comparison': 'Comparison', 
    'nav.contact': 'Contact',
    'header.tagline': 'Leader in enterprise technology solutions',
    
    // Hero
    'hero.badge': '🚀 MARKET-LEADING TECHNOLOGY COMPANY',
    'hero.title': 'We revolutionize your business',
    'hero.titleGradient': 'with cutting-edge technology',
    'hero.subtitle': 'We create systems, websites, apps and digital marketing strategies that propel companies into the future. We are specialists in transforming ideas into revolutionary technological solutions.',
    'hero.ctaPrimary': 'Discover Our Solutions',
    'hero.ctaSecondary': 'Talk to a Specialist',
    'hero.statSystems': 'Systems Created',
    'hero.statSystemsDesc': 'Custom solutions delivered',
    'hero.statSatisfaction': 'Customer Satisfaction',
    'hero.statSatisfactionDesc': 'Proven approval rate',
    'hero.statExperience': 'Years of Experience',
    'hero.statExperienceDesc': 'Leadership in technological innovation',
    'hero.imageAlt': 'Modern office workspace with computers and technology',
    
    // Systems Showcase
    'systems.badge': 'DIGITAL SOLUTIONS CATALOG',
    'systems.title': 'G&L Enterprise Systems',
    'systems.subtitle': 'Complete and customized technological solutions developed by G&L Systems to revolutionize your business',
    'systems.erp.title': 'ERP',
    'systems.erp.description': 'Complete business management system that integrates all departments of your company into a single platform.',
    'systems.crm.title': 'CRM',
    'systems.crm.description': 'Complete customer relationship management, from first contact to loyalty.',
    'systems.restaurant.title': 'Order Management System',
    'systems.restaurant.description': 'Optimize restaurant service with complete order control and table management.',
    'systems.financial.title': 'Financial System',
    'systems.financial.description': 'Total control of your company\'s finances with cash flow management and predictive analytics.',
    'systems.inventory.title': 'Inventory & Logistics',
    'systems.inventory.description': 'Complete system for inventory, purchasing and logistics management with real-time tracking.',
    'systems.ecommerce.title': 'E-commerce for Physical Stores',
    'systems.ecommerce.description': 'Transform your physical store into digital with inventory synchronization and unified sales management.',
    'systems.education.title': 'E-Learning Platform',
    'systems.education.description': 'Complete distance learning platform with course, student and certification management.',
    'systems.seeDetails': 'See details',
    'systems.imageAltSuffix': 'interface and functionality',
    
    // System features
    'systems.erp.feature1': 'Integrated financial management',
    'systems.erp.feature2': 'Real-time inventory control',
    'systems.erp.feature3': 'Advanced management reports',
    'systems.crm.feature1': 'Complete customer history',
    'systems.crm.feature2': 'Sales automation',
    'systems.crm.feature3': 'Opportunity pipeline',
    'systems.restaurant.feature1': 'Integrated digital orders',
    'systems.restaurant.feature2': 'Real-time table management',
    'systems.restaurant.feature3': 'Sales reports',
    'systems.financial.feature1': 'Real-time cash flow',
    'systems.financial.feature2': 'Automatic bank reconciliation',
    'systems.financial.feature3': 'Predictive analytics',
    'systems.inventory.feature1': 'Smart inventory control',
    'systems.inventory.feature2': 'Supplier management',
    'systems.inventory.feature3': 'Product tracking',
    'systems.ecommerce.feature1': 'Unified inventory synchronization',
    'systems.ecommerce.feature2': 'Optimized responsive design',
    'systems.ecommerce.feature3': 'Integrated delivery management',
    'systems.education.feature1': 'Complete course management',
    'systems.education.feature2': 'Assessment system',
    'systems.education.feature3': 'Automatic certification',
    
    // Benefits
    'benefits.title': 'Benefits of Our Systems',
    'benefits.subtitle': 'Transform your company with solutions that generate measurable and sustainable results',
    'benefits.productivity': 'Increased Productivity',
    'benefits.productivityDesc': 'Process automation that reduces time spent on manual tasks by up to 70%',
    'benefits.errorReduction': 'Error Reduction',
    'benefits.errorReductionDesc': 'Intelligent systems that minimize human errors and ensure operational consistency',
    'benefits.profitGrowth': 'Profit Growth',
    'benefits.profitGrowthDesc': 'Resource and process optimization that results in an average 35% increase in profit margin',
    'benefits.dataDecisions': 'Data-Driven Decisions',
    'benefits.dataDecisionsDesc': 'Real-time reports and predictive analytics for more assertive decision making',
    'benefits.scalability': 'Scalability',
    'benefits.scalabilityDesc': 'Systems that grow with your company, supporting expansion without performance loss',
    'benefits.customerSatisfaction': 'Customer Satisfaction',
    'benefits.customerSatisfactionDesc': 'More efficient and personalized service that increases satisfaction by up to 60%',
    
    // Video Section  
    'video.badge': '🎥 SEE OUR SYSTEMS IN ACTION',
    'video.title': 'Digital Transformation in Practice',
    'video.subtitle': 'Discover how G&L Systems revolutionizes companies through real demonstrations of our systems',
    'video.overlayTitle': 'Complete G&L Systems Demonstration',
    'video.overlayDuration': '8:45 min • Real success cases',
    'video.statViews': 'Views',
    'video.statRating': 'Rating',
    'video.statShares': 'Shares',
    'video.contentTitle': 'Proven Results in Action',
    'video.contentDescription': 'See real companies that transformed their businesses with our solutions. From small startups to large corporations, all achieved extraordinary results.',
    'video.testimonial1': '"We increased our productivity by 85% in the first month"',
    'video.testimonial1Author': 'Maria Silva, CEO - TechCorp',
    'video.testimonial2': '"Our customer satisfaction increased by 70%"',
    'video.testimonial2Author': 'João Santos, Director - InnovaCorp',
    'video.testimonial3': '"340% ROI in just 6 months of implementation"',
    'video.testimonial3Author': 'Ana Costa, CFO - GrowthCorp',
    'video.cta': 'Request Personalized Demo',
    'video.imageAlt': 'G&L Systems demonstration video thumbnail',
    
    // Comparison
    'comparison.title': 'Why Choose Modern Systems?',
    'comparison.subtitle': 'See the difference between companies that invest in technology and those left behind',
    'comparison.modernSystems': 'Modern Systems',
    'comparison.modernSystemsDesc': 'Technology that drives growth',
    'comparison.oldSystems': 'Old Systems/No System',
    'comparison.oldSystemsDesc': 'Limitations that prevent progress',
    'comparison.productivity': 'Productivity',
    'comparison.profitMargin': 'Profit Margin',
    'comparison.errorRate': 'Error Rate',
    'comparison.responseTime': 'Response Time',
    'comparison.scalability': 'Scalability',
    'comparison.customerSatisfaction': 'Customer Satisfaction',
    
    // Comparison details
    'comparison.productivityModern': 'Up to 70% more efficient',
    'comparison.productivityModernDesc': 'Complete process automation',
    'comparison.productivityOld': 'Slow manual processes', 
    'comparison.productivityOldDesc': 'Repetitive and time-consuming tasks',
    
    'comparison.profitMarginModern': '+35% on average',
    'comparison.profitMarginModernDesc': 'Total cost and revenue control',
    'comparison.profitMarginOld': 'No cost visibility',
    'comparison.profitMarginOldDesc': 'Lost opportunities for savings',
    
    'comparison.errorRateModern': '80% reduction',
    'comparison.errorRateModernDesc': 'Automatic validation and strict controls',
    'comparison.errorRateOld': 'Frequent errors',
    'comparison.errorRateOldDesc': 'Human errors and rework',
    
    'comparison.responseTimeModern': 'Real time',
    'comparison.responseTimeModernDesc': 'Information updated instantly',
    'comparison.responseTimeOld': 'Days or weeks',
    'comparison.responseTimeOldDesc': 'Delay in data consolidation',
    
    'comparison.scalabilityModern': 'Unlimited growth',
    'comparison.scalabilityModernDesc': 'Adapts to your business size',
    'comparison.scalabilityOld': 'Constant limitations',
    'comparison.scalabilityOldDesc': 'Growth bottlenecks',
    
    'comparison.customerSatisfactionModern': '+60% satisfaction',
    'comparison.customerSatisfactionModernDesc': 'Agile and personalized service',
    'comparison.customerSatisfactionOld': 'Frequent complaints',
    'comparison.customerSatisfactionOldDesc': 'Delays and lack of information',
    
    // Custom Systems Message
    'customSystems.title': 'Custom Solutions',
    'customSystems.description': 'We develop customized systems according to the specific needs of your company',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Request a free demo and discover how we can transform your business',
    'contact.nameLabel': 'Full Name',
    'contact.namePlaceholder': 'Your full name',
    'contact.emailLabel': 'Business Email',
    'contact.emailPlaceholder': 'you@company.com',
    'contact.companyLabel': 'Company',
    'contact.companyPlaceholder': 'Your company name',
    'contact.phoneLabel': 'Phone',
    'contact.phonePlaceholder': '(11) 99999-9999',
    'contact.systemLabel': 'System of Interest',
    'contact.systemPlaceholder': 'Select a system',
    'contact.messageLabel': 'Message',
    'contact.messagePlaceholder': 'Tell us more about your needs and goals...',
    'contact.marketingLabel': 'I accept to receive communications about solutions and demonstrations',
    'contact.marketingAccept': 'I accept to receive communications about solutions and demonstrations',
    'contact.submitButton': 'Request Free Demo',
    'contact.submitting': 'Sending...',
    'contact.sending': 'Sending...',
    'contact.successTitle': 'Success!',
    'contact.successMessage': 'Request sent successfully! We will get in touch soon.',
    'contact.errorTitle': 'Error',
    'contact.errorMessage': 'Error sending request. Please try again.',
    'contact.successPageTitle': 'Request Sent Successfully!',
    'contact.successPageMessage': 'We received your request and will contact you soon to schedule your free demonstration.',
    'contact.sendAnother': 'Send New Request',
    'contact.directContact': 'Or contact us directly:',
    'contact.alternativeTitle': 'Or contact us directly:',
    'contact.systems.erp': 'ERP - Business Management',
    'contact.systems.crm': 'CRM - Customer Relationship',
    'contact.systems.restaurant': 'Order Management System',
    'contact.systems.financial': 'Financial System',
    'contact.systems.inventory': 'Inventory & Logistics',
    'contact.systems.education': 'E-Learning Platform',
    'contact.systems.all': 'All Systems',
    
    // Footer
    'footer.companyName': 'G&L Systems',
    'footer.companyTagline': 'Leader in enterprise technology',
    'footer.description': 'Specialists in systems, websites, apps, paid traffic and digital marketing. We transform businesses with cutting-edge technology and customized solutions for over 15 years.',
    'footer.systemsTitle': 'Systems',
    'footer.contactTitle': 'Contact',
    'footer.copyright': '© 2025 G&L Systems. All rights reserved.',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',  
    'footer.cookies': 'Cookies',
    'footer.systems.erp': 'Enterprise ERP',
    'footer.systems.crm': 'CRM',
    'footer.systems.restaurant': 'Order Management',
    'footer.systems.financial': 'Financial Control',
    'footer.systems.inventory': 'Inventory & Logistics',
    'footer.systems.education': 'E-Learning Platform',
    'footer.phoneNumber': '(11) 97536-3887',
    
    // WhatsApp
    'whatsapp.tooltip': 'Chat on WhatsApp',
    
    // Scroll to top
    'scrollTop.tooltip': 'Back to top'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from localStorage, default to Portuguese
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gl-systems-language');
      return (saved as Language) || 'pt';
    }
    return 'pt';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('gl-systems-language', language);
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}