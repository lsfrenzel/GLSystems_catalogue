import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SystemsShowcase() {
  const { t } = useLanguage();
  
  const systems = [
    {
      id: 'erp',
      title: t('systems.erp.title'),
      description: t('systems.erp.description'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-chart-line',
      featureKeys: [
        'systems.erp.feature1',
        'systems.erp.feature2',
        'systems.erp.feature3'
      ]
    },
    {
      id: 'crm',
      title: t('systems.crm.title'),
      description: t('systems.crm.description'),
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-users',
      featureKeys: [
        'systems.crm.feature1',
        'systems.crm.feature2',
        'systems.crm.feature3'
      ]
    },
    {
      id: 'restaurant',
      title: t('systems.restaurant.title'),
      description: t('systems.restaurant.description'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-utensils',
      featureKeys: [
        'systems.restaurant.feature1',
        'systems.restaurant.feature2',
        'systems.restaurant.feature3'
      ]
    },
    {
      id: 'financial',
      title: t('systems.financial.title'),
      description: t('systems.financial.description'),
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-calculator',
      featureKeys: [
        'systems.financial.feature1',
        'systems.financial.feature2',
        'systems.financial.feature3'
      ]
    },
    {
      id: 'inventory',
      title: t('systems.inventory.title'),
      description: t('systems.inventory.description'),
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-boxes',
      featureKeys: [
        'systems.inventory.feature1',
        'systems.inventory.feature2',
        'systems.inventory.feature3'
      ]
    },
    {
      id: 'ecommerce',
      title: t('systems.ecommerce.title'),
      description: t('systems.ecommerce.description'),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-shopping-cart',
      featureKeys: [
        'systems.ecommerce.feature1',
        'systems.ecommerce.feature2',
        'systems.ecommerce.feature3'
      ]
    },
    {
      id: 'education',
      title: t('systems.education.title'),
      description: t('systems.education.description'),
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      icon: 'fas fa-graduation-cap',
      featureKeys: [
        'systems.education.feature1',
        'systems.education.feature2',
        'systems.education.feature3'
      ]
    }
  ];

  return (
    <section id="sistemas" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('systems.badge')}
            </span>
          </div>
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="systems-title">
            {t('systems.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="systems-subtitle">
            {t('systems.subtitle')}
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
                alt={`${system.title} ${t('systems.imageAltSuffix')}`}
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
                {system.featureKeys.map((featureKey, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-check text-primary mr-2"></i>
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
              <div className="flex items-center text-primary font-semibold mt-auto">
                <span>{t('systems.seeDetails')}</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
