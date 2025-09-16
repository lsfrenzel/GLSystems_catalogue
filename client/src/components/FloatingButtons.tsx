import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingButtons() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Show button when footer is visible (within viewport)
        setShowScrollTop(footerTop <= windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    const phoneNumber = "5511975363887"; // Replace with actual WhatsApp number
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os sistemas da G&L Systems.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground p-3 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl group"
          data-testid="scroll-to-top"
          title={t('scrollTop.tooltip')}
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
      
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl group relative"
        data-testid="whatsapp-button"
        title={t('whatsapp.tooltip')}
      >
        <FaWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></div>
      </button>
    </div>
  );
}