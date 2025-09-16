import { useLanguage } from "@/contexts/LanguageContext";

export default function Benefits() {
  const { t } = useLanguage();
  
  const benefits = [
    {
      id: 'productivity',
      icon: 'fas fa-rocket',
      titleKey: 'benefits.productivity',
      descriptionKey: 'benefits.productivityDesc'
    },
    {
      id: 'error-reduction',
      icon: 'fas fa-shield-alt',
      titleKey: 'benefits.errorReduction',
      descriptionKey: 'benefits.errorReductionDesc'
    },
    {
      id: 'profit-growth',
      icon: 'fas fa-chart-line',
      titleKey: 'benefits.profitGrowth',
      descriptionKey: 'benefits.profitGrowthDesc'
    },
    {
      id: 'data-decisions',
      icon: 'fas fa-brain',
      titleKey: 'benefits.dataDecisions',
      descriptionKey: 'benefits.dataDecisionsDesc'
    },
    {
      id: 'scalability',
      icon: 'fas fa-expand-arrows-alt',
      titleKey: 'benefits.scalability',
      descriptionKey: 'benefits.scalabilityDesc'
    },
    {
      id: 'customer-satisfaction',
      icon: 'fas fa-heart',
      titleKey: 'benefits.customerSatisfaction',
      descriptionKey: 'benefits.customerSatisfactionDesc'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="benefits-title">
            {t('benefits.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="benefits-subtitle">
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="fade-in text-center group"
              data-testid={`benefit-${benefit.id}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i className={`${benefit.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 raleway" data-testid={`benefit-title-${benefit.id}`}>
                {t(benefit.titleKey)}
              </h3>
              <p className="text-muted-foreground" data-testid={`benefit-description-${benefit.id}`}>
                {t(benefit.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
