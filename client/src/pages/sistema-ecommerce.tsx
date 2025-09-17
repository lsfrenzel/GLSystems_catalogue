import { Link } from "wouter";
import { useLayoutEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SistemaEcommerce() {
  const { t } = useLanguage();
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const systemData = {
    id: 'ecommerce',
    title: t('sistema.ecommerce.title'),
    subtitle: t('sistema.ecommerce.subtitle'),
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    icon: 'fas fa-shopping-cart',
    description: t('sistema.ecommerce.description'),
    mainBenefits: [
      {
        icon: 'fas fa-sync-alt',
        title: t('sistema.ecommerce.benefit1.title'),
        description: t('sistema.ecommerce.benefit1.description')
      },
      {
        icon: 'fas fa-mobile-alt',
        title: t('sistema.ecommerce.benefit2.title'),
        description: t('sistema.ecommerce.benefit2.description')
      },
      {
        icon: 'fas fa-shipping-fast',
        title: t('sistema.ecommerce.benefit3.title'),
        description: t('sistema.ecommerce.benefit3.description')
      },
      {
        icon: 'fas fa-chart-line',
        title: t('sistema.ecommerce.benefit4.title'),
        description: t('sistema.ecommerce.benefit4.description')
      }
    ],
    detailedFeatures: {
      catalogo: {
        title: t('sistema.ecommerce.feature1.title'),
        features: [
          t('sistema.ecommerce.feature1.item1'),
          t('sistema.ecommerce.feature1.item2'),
          t('sistema.ecommerce.feature1.item3'),
          t('sistema.ecommerce.feature1.item4'),
          t('sistema.ecommerce.feature1.item5'),
          t('sistema.ecommerce.feature1.item6')
        ]
      },
      vendas: {
        title: t('sistema.ecommerce.feature2.title'),
        features: [
          t('sistema.ecommerce.feature2.item1'),
          t('sistema.ecommerce.feature2.item2'),
          t('sistema.ecommerce.feature2.item3'),
          t('sistema.ecommerce.feature2.item4'),
          t('sistema.ecommerce.feature2.item5'),
          t('sistema.ecommerce.feature2.item6')
        ]
      },
      estoque: {
        title: t('sistema.ecommerce.feature3.title'),
        features: [
          t('sistema.ecommerce.feature3.item1'),
          t('sistema.ecommerce.feature3.item2'),
          t('sistema.ecommerce.feature3.item3'),
          t('sistema.ecommerce.feature3.item4'),
          t('sistema.ecommerce.feature3.item5'),
          t('sistema.ecommerce.feature3.item6')
        ]
      },
      marketing: {
        title: t('sistema.ecommerce.feature4.title'),
        features: [
          t('sistema.ecommerce.feature4.item1'),
          t('sistema.ecommerce.feature4.item2'),
          t('sistema.ecommerce.feature4.item3'),
          t('sistema.ecommerce.feature4.item4'),
          t('sistema.ecommerce.feature4.item5'),
          t('sistema.ecommerce.feature4.item6')
        ]
      }
    },
    advantages: [
      {
        title: t('sistema.ecommerce.advantage1.title'),
        description: t('sistema.ecommerce.advantage1.description')
      },
      {
        title: t('sistema.ecommerce.advantage2.title'),
        description: t('sistema.ecommerce.advantage2.description')
      },
      {
        title: t('sistema.ecommerce.advantage3.title'),
        description: t('sistema.ecommerce.advantage3.description')
      },
      {
        title: t('sistema.ecommerce.advantage4.title'),
        description: t('sistema.ecommerce.advantage4.description')
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
                  {t('sistema.backToCatalog')}
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
                    {t('sistema.ecommerce.demo')}
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
              {t('sistema.mainBenefitsTitle')}
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
              {t('sistema.ecommerce.interfaceTitle')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group cursor-pointer" data-testid="interface-image-1">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.ecommerce.interface1.alt')}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">{t('sistema.ecommerce.interface1.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">{t('sistema.ecommerce.interface1.title')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('sistema.ecommerce.interface1.description')}</p>
              </div>
              
              <div className="group cursor-pointer" data-testid="interface-image-2">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.ecommerce.interface2.alt')}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">{t('sistema.ecommerce.interface2.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">{t('sistema.ecommerce.interface2.title')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('sistema.ecommerce.interface2.description')}</p>
              </div>
              
              <div className="group cursor-pointer md:col-span-2 lg:col-span-1" data-testid="interface-image-3">
                <div className="relative overflow-hidden rounded-lg bg-background border">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                    alt={t('sistema.ecommerce.interface3.alt')}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm sm:text-base">{t('sistema.ecommerce.interface3.overlay')}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 raleway">{t('sistema.ecommerce.interface3.title')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{t('sistema.ecommerce.interface3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-16 md:py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="raleway text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16" data-testid="features-title">
              {t('sistema.detailedFeaturesTitle')}
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
              {t('sistema.provenResultsTitle')}
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