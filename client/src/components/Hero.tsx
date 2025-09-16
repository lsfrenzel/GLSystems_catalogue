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
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="fade-in text-center mb-12">
          <div className="mb-8">
            <span className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 LÍDER DE MERCADO EM TECNOLOGIA
            </span>
          </div>
          <h1 className="raleway text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Revolucionamos seu negócio<br />
            <span className="text-gradient">com tecnologia de ponta</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto font-light" data-testid="hero-subtitle">
            Criamos sistemas, sites, apps e estratégias de marketing digital que impulsionam empresas para o futuro. 
            Somos especialistas em transformar ideias em soluções tecnológicas revolucionárias.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={scrollToSystems}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
              data-testid="hero-cta-button"
            >
              Descubra Nossas Soluções
            </button>
            <button 
              onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-white/10"
              data-testid="hero-contact-button"
            >
              Falar com Especialista
            </button>
          </div>
        </div>
        
        {/* Statistics Section */}
        <div className="fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-systems">500+</div>
              <div className="text-white font-semibold mb-1">Sistemas Criados</div>
              <div className="text-gray-300 text-sm">Soluções personalizadas entregues</div>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-satisfaction">98%</div>
              <div className="text-white font-semibold mb-1">Satisfação dos Clientes</div>
              <div className="text-gray-300 text-sm">Taxa de aprovação comprovada</div>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-4xl font-bold text-primary mb-2" data-testid="stat-experience">15+</div>
              <div className="text-white font-semibold mb-1">Anos de Experiência</div>
              <div className="text-gray-300 text-sm">Liderança em inovação tecnológica</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
