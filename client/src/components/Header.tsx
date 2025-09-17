import { Link } from "wouter";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '#sistemas', label: t('nav.systems') },
    { href: '#beneficios', label: t('nav.benefits') },
    { href: '#comparativo', label: t('nav.comparison') },
    { href: '#contato', label: t('nav.contact') }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const switchLanguage = (langCode: string) => {
    setLanguage(langCode as 'pt' | 'en');
    setIsLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-all duration-300 group">
            <div className="relative">
              <img 
                src={glSystemsLogo} 
                alt="G&L Systems Logo" 
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
                data-testid="company-logo"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/25 to-primary/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
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
                <span className="text-sm font-medium">{languages.find(l => l.code === language)?.flag}</span>
                <span className="hidden sm:inline text-sm">{languages.find(l => l.code === language)?.name}</span>
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
