import { Link } from "wouter";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import glSystemsLogo from "@assets/Gemini_Generated_Image_h0faeuh0faeuh0fa-removebg-preview_1758033345801.png";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export default function Header() {
  const [currentLang, setCurrentLang] = useState('pt');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '#sistemas', label: currentLang === 'pt' ? 'Sistemas' : 'Systems' },
    { href: '#beneficios', label: currentLang === 'pt' ? 'Benefícios' : 'Benefits' },
    { href: '#comparativo', label: currentLang === 'pt' ? 'Comparativo' : 'Comparison' },
    { href: '#contato', label: currentLang === 'pt' ? 'Contato' : 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const switchLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    // Here you would implement actual language switching logic
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={glSystemsLogo} 
                  alt="G&L Systems Logo" 
                  className="w-16 h-16 object-contain group-hover:scale-105 transition-transform"
                  data-testid="company-logo"
                />
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent raleway" data-testid="company-name">
                  G&L Systems
                </h1>
                <p className="text-sm text-muted-foreground open-sans">
                  {currentLang === 'pt' ? 'Líder em soluções tecnológicas empresariais' : 'Leader in enterprise technology solutions'}
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium relative group"
                data-testid={`nav-${item.href.replace('#', '')}`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors border border-border/50"
                data-testid="language-switcher"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{languages.find(l => l.code === currentLang)?.flag}</span>
                <span className="hidden sm:inline text-sm">{languages.find(l => l.code === currentLang)?.name}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[140px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className="w-full px-4 py-2 text-left hover:bg-muted/50 transition-colors flex items-center space-x-2"
                      data-testid={`lang-${lang.code}`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors border border-border/50"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors font-medium"
                  data-testid={`mobile-nav-${item.href.replace('#', '')}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
