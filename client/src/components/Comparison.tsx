import { CircleCheck, XCircle, TrendingUp, TrendingDown, Clock, Hourglass, Expand, Lock, Smile, Frown } from "lucide-react";
import CustomSystemsMessage from "./CustomSystemsMessage";
import { useLanguage } from "../contexts/LanguageContext";

export default function Comparison() {
  const { t } = useLanguage();
  
  const comparisonData = [
    {
      criteria: t('comparison.productivity'),
      modern: { 
        icon: TrendingUp, 
        text: t('comparison.productivityModern'),
        description: t('comparison.productivityModernDesc')
      },
      outdated: { 
        icon: TrendingDown, 
        text: t('comparison.productivityOld'),
        description: t('comparison.productivityOldDesc')
      }
    },
    {
      criteria: t('comparison.profitMargin'),
      modern: { 
        icon: TrendingUp, 
        text: t('comparison.profitMarginModern'),
        description: t('comparison.profitMarginModernDesc')
      },
      outdated: { 
        icon: XCircle, 
        text: t('comparison.profitMarginOld'),
        description: t('comparison.profitMarginOldDesc')
      }
    },
    {
      criteria: t('comparison.errorRate'),
      modern: { 
        icon: CircleCheck, 
        text: t('comparison.errorRateModern'),
        description: t('comparison.errorRateModernDesc')
      },
      outdated: { 
        icon: XCircle, 
        text: t('comparison.errorRateOld'),
        description: t('comparison.errorRateOldDesc')
      }
    },
    {
      criteria: t('comparison.responseTime'),
      modern: { 
        icon: Clock, 
        text: t('comparison.responseTimeModern'),
        description: t('comparison.responseTimeModernDesc')
      },
      outdated: { 
        icon: Hourglass, 
        text: t('comparison.responseTimeOld'),
        description: t('comparison.responseTimeOldDesc')
      }
    },
    {
      criteria: t('comparison.scalability'),
      modern: { 
        icon: Expand, 
        text: t('comparison.scalabilityModern'),
        description: t('comparison.scalabilityModernDesc')
      },
      outdated: { 
        icon: Lock, 
        text: t('comparison.scalabilityOld'),
        description: t('comparison.scalabilityOldDesc')
      }
    },
    {
      criteria: t('comparison.customerSatisfaction'),
      modern: { 
        icon: Smile, 
        text: t('comparison.customerSatisfactionModern'),
        description: t('comparison.customerSatisfactionModernDesc')
      },
      outdated: { 
        icon: Frown, 
        text: t('comparison.customerSatisfactionOld'),
        description: t('comparison.customerSatisfactionOldDesc')
      }
    }
  ];

  return (
    <section id="comparativo" className="py-16 md:py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="raleway text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" data-testid="comparison-title">
            {t('comparison.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-4" data-testid="comparison-subtitle">
            {t('comparison.subtitle')}
          </p>
          <div className="max-w-2xl mx-auto">
            <CustomSystemsMessage variant="default" />
          </div>
        </div>

        <div className="comparison-cards fade-in" data-testid="comparison-table">
          {/* Mobile Headers */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 md:mb-8 lg:hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-lg md:rounded-xl p-3 sm:p-4 text-center shadow-xl">
              <h3 className="text-base sm:text-lg font-bold mb-1">{t('comparison.modernSystems')}</h3>
              <p className="opacity-90 text-xs sm:text-sm">{t('comparison.modernSystemsDesc').split(' growth')[0]}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-lg md:rounded-xl p-3 sm:p-4 text-center shadow-xl">
              <h3 className="text-base sm:text-lg font-bold mb-1">{t('comparison.oldSystems')}</h3>
              <p className="opacity-90 text-xs sm:text-sm">{t('comparison.oldSystemsDesc').split(' that')[0]}</p>
            </div>
          </div>

          {/* Desktop Headers */}
          <div className="hidden lg:grid grid-cols-3 gap-8 mb-8">
            <div></div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6 text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-2">{t('comparison.modernSystems')}</h3>
              <p className="opacity-90">{t('comparison.modernSystemsDesc')}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl p-6 text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-2">{t('comparison.oldSystems')}</h3>
              <p className="opacity-90">{t('comparison.oldSystemsDesc')}</p>
            </div>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="space-y-6 md:space-y-8 lg:hidden">
            {comparisonData.map((row, index) => (
              <div key={index} className="space-y-3 md:space-y-4" data-testid={`comparison-row-${index}`}>
                <div className="bg-card border rounded-lg md:rounded-xl p-3 md:p-4 text-center shadow-sm">
                  <h4 className="font-bold text-base md:text-lg text-foreground" data-testid={`criteria-${index}`}>
                    {row.criteria}
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm" data-testid={`modern-${index}`}>
                    <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
                      <row.modern.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mb-1 sm:mb-0 sm:mr-2" aria-hidden="true" />
                      <span className="font-bold text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm text-center">
                        {row.modern.text}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center leading-relaxed">
                      {row.modern.description}
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm" data-testid={`outdated-${index}`}>
                    <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
                      <row.outdated.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mb-1 sm:mb-0 sm:mr-2" aria-hidden="true" />
                      <span className="font-bold text-gray-700 dark:text-gray-300 text-xs sm:text-sm text-center">
                        {row.outdated.text}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                      {row.outdated.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison Cards */}
          <div className="hidden lg:block space-y-6">
            {comparisonData.map((row, index) => (
              <div key={index} className="grid grid-cols-3 gap-6 items-center" data-testid={`comparison-row-${index}`}>
                <div className="bg-card border rounded-xl p-6 text-left shadow-sm">
                  <h4 className="font-bold text-lg text-foreground" data-testid={`criteria-${index}`}>
                    {row.criteria}
                  </h4>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 shadow-sm" data-testid={`modern-${index}`}>
                  <div className="flex items-center justify-start mb-3">
                    <row.modern.icon className="w-6 h-6 text-emerald-600 mr-3" aria-hidden="true" />
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
                      {row.modern.text}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 text-left">
                    {row.modern.description}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm" data-testid={`outdated-${index}`}>
                  <div className="flex items-center justify-start mb-3">
                    <row.outdated.icon className="w-6 h-6 text-gray-600 mr-3" aria-hidden="true" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 text-lg">
                      {row.outdated.text}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-left">
                    {row.outdated.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}