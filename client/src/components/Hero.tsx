export default function Hero() {
  const scrollToSystems = () => {
    const element = document.getElementById('sistemas');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200" 
          alt="Modern office workspace with computers and technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="fade-in">
          <h1 className="raleway text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Tecnologia sob medida<br />
            <span className="text-gradient">para seu crescimento</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-light" data-testid="hero-subtitle">
            Sistemas inteligentes para empresas de alto desempenho
          </p>
          <button 
            onClick={scrollToSystems}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
            data-testid="hero-cta-button"
          >
            Conheça Nossas Soluções
          </button>
        </div>
      </div>
    </section>
  );
}
