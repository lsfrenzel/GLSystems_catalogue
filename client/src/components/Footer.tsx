import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const systemLinks = [
    { nameKey: 'footer.systems.erp', section: 'sistemas' },
    { nameKey: 'footer.systems.crm', section: 'sistemas' },
    { nameKey: 'footer.systems.restaurant', section: 'sistemas' },
    { nameKey: 'footer.systems.financial', section: 'sistemas' },
    { nameKey: 'footer.systems.inventory', section: 'sistemas' },
    { nameKey: 'footer.systems.education', section: 'sistemas' }
  ];


  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground" data-testid="footer-company-name">
                  {t('footer.companyName')}
                </h3>
                <p className="text-sm text-muted-foreground lato">
                  {t('footer.companyTagline')}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md" data-testid="footer-description">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="footer-systems-title">
              {t('footer.systemsTitle')}
            </h4>
            <ul className="space-y-2">
              {systemLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.section)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                    data-testid={`footer-system-${index}`}
                  >
                    {t(link.nameKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="footer-contact-title">
              {t('footer.contactTitle')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-phone text-primary mr-3"></i>
                <a 
                  href="tel:+5511975363887" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-phone"
                >
                  +55 11 97536-3887
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary mr-3"></i>
                <a 
                  href="mailto:contato@gl-systems.site" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  contato@gl-systems.site
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0" data-testid="footer-copyright">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-terms"
            >
              {t('footer.terms')}
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-privacy"
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-cookies"
            >
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
