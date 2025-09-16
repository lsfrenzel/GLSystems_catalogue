export default function Footer() {
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
    { name: 'ERP Empresarial', section: 'sistemas' },
    { name: 'CRM', section: 'sistemas' },
    { name: 'Sistema de Comandas', section: 'sistemas' },
    { name: 'Controle Financeiro', section: 'sistemas' },
    { name: 'Estoque e Logística', section: 'sistemas' },
    { name: 'Plataforma EAD', section: 'sistemas' }
  ];


  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground" data-testid="footer-company-name">
                  G&L Systems
                </h3>
                <p className="text-sm text-muted-foreground lato">
                  Líder em tecnologia empresarial
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md" data-testid="footer-description">
              Especialistas em sistemas, sites, apps, tráfego pago e marketing digital. Transformamos negócios com tecnologia de ponta e soluções personalizadas há mais de 15 anos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="footer-systems-title">
              Sistemas
            </h4>
            <ul className="space-y-2">
              {systemLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.section)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                    data-testid={`footer-system-${index}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="footer-contact-title">
              Contato
            </h4>
            <div className="flex items-center">
              <i className="fas fa-phone text-primary mr-3"></i>
              <a 
                href="tel:+5511975363887" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="footer-phone"
              >
                (11) 97536-3887
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0" data-testid="footer-copyright">
            © 2025 G&L Systems. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-terms"
            >
              Termos de Uso
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-privacy"
            >
              Política de Privacidade
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-cookies"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
