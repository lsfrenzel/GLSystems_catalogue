import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SistemaFinancial() {
  const { t } = useLanguage();
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const systemData = {
    id: 'financial',
    title: t('sistema.financial.title'),
    subtitle: t('sistema.financial.subtitle'),
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-calculator',
    description: t('sistema.financial.description'),
    mainBenefits: [
      {
        icon: 'fas fa-money-bill-wave',
        title: t('sistema.financial.benefit1.title'),
        description: t('sistema.financial.benefit1.description')
      },
      {
        icon: 'fas fa-chart-line',
        title: t('sistema.financial.benefit2.title'),
        description: t('sistema.financial.benefit2.description')
      },
      {
        icon: 'fas fa-file-invoice',
        title: t('sistema.financial.benefit3.title'),
        description: t('sistema.financial.benefit3.description')
      },
      {
        icon: 'fas fa-shield-check',
        title: t('sistema.financial.benefit4.title'),
        description: t('sistema.financial.benefit4.description')
      }
    ],
    detailedFeatures: {
      caixa: {
        title: t('sistema.financial.feature1.title'),
        features: [
          t('sistema.financial.feature1.item1'),
          t('sistema.financial.feature1.item2'),
          t('sistema.financial.feature1.item3'),
          t('sistema.financial.feature1.item4'),
          t('sistema.financial.feature1.item5'),
          t('sistema.financial.feature1.item6')
        ]
      },
      fiscal: {
        title: t('sistema.financial.feature2.title'),
        features: [
          t('sistema.financial.feature2.item1'),
          t('sistema.financial.feature2.item2'),
          t('sistema.financial.feature2.item3'),
          t('sistema.financial.feature2.item4'),
          t('sistema.financial.feature2.item5'),
          t('sistema.financial.feature2.item6')
        ]
      },
      bancario: {
        title: t('sistema.financial.feature3.title'),
        features: [
          t('sistema.financial.feature3.item1'),
          t('sistema.financial.feature3.item2'),
          t('sistema.financial.feature3.item3'),
          t('sistema.financial.feature3.item4'),
          t('sistema.financial.feature3.item5'),
          t('sistema.financial.feature3.item6')
        ]
      },
      relatorios: {
        title: t('sistema.financial.feature4.title'),
        features: [
          t('sistema.financial.feature4.item1'),
          t('sistema.financial.feature4.item2'),
          t('sistema.financial.feature4.item3'),
          t('sistema.financial.feature4.item4'),
          t('sistema.financial.feature4.item5'),
          t('sistema.financial.feature4.item6')
        ]
      }
    },
    advantages: [
      {
        title: t('sistema.financial.advantage1.title'),
        description: t('sistema.financial.advantage1.description')
      },
      {
        title: t('sistema.financial.advantage2.title'),
        description: t('sistema.financial.advantage2.description')
      },
      {
        title: t('sistema.financial.advantage3.title'),
        description: t('sistema.financial.advantage3.description')
      },
      {
        title: t('sistema.financial.advantage4.title'),
        description: t('sistema.financial.advantage4.description')
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
                {t('sistema.backToCatalog')}
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
                  {t('sistema.testDemo')}
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
              {t('sistema.mainBenefitsTitle')}
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
              {t('sistema.interfaceTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group cursor-pointer" data-testid="interface-image-1">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.financial.interface1.alt')}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">{t('sistema.financial.interface1.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">{t('sistema.financial.interface1.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('sistema.financial.interface1.description')}</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.financial.interface2.alt')}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">{t('sistema.financial.interface2.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">{t('sistema.financial.interface2.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('sistema.financial.interface2.description')}</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.financial.interface3.alt')}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold">{t('sistema.financial.interface3.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 raleway">{t('sistema.financial.interface3.title')}</h3>
                <p className="text-sm text-muted-foreground">{t('sistema.financial.interface3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="raleway text-4xl font-bold text-center mb-16" data-testid="features-title">
              {t('sistema.detailedFeaturesTitle')}
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
              {t('sistema.provenResultsTitle')}
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