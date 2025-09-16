import { Play, Star, Users, Award } from "lucide-react";

export default function VideoSection() {
  return (
    <section id="video" className="py-20 bg-gradient-to-br from-primary/5 via-background to-blue-50/30 dark:from-primary/10 dark:via-background dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎥 VEJA NOSSOS SISTEMAS EM AÇÃO
            </span>
          </div>
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="video-title">
            Transformação Digital na Prática
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="video-subtitle">
            Descubra como a G&L Systems revoluciona empresas através de demonstrações reais dos nossos sistemas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <div className="fade-in">
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675" 
                  alt="G&L Systems demonstration video thumbnail"
                  className="w-full h-64 md:h-80 object-cover"
                  data-testid="video-thumbnail"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                
                {/* Play Button */}
                <button 
                  className="absolute inset-0 flex items-center justify-center group"
                  data-testid="play-button"
                  onClick={() => {
                    // Here you would implement video playback
                    console.log('Play video');
                  }}
                >
                  <div className="w-20 h-20 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all shadow-xl">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </button>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1" data-testid="video-overlay-title">
                      Demonstração Completa dos Sistemas G&L
                    </h3>
                    <p className="text-sm opacity-90" data-testid="video-overlay-duration">
                      8:45 min • Casos reais de sucesso
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="video-stat-views">2.5M+</div>
                  <div className="text-sm text-muted-foreground">Visualizações</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="video-stat-rating">4.9</div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="video-stat-shares">12K+</div>
                  <div className="text-sm text-muted-foreground">Compartilhamentos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="fade-in">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4 raleway" data-testid="video-content-title">
                  Resultados Comprovados em Ação
                </h3>
                <p className="text-lg text-muted-foreground mb-6" data-testid="video-content-description">
                  Veja empresas reais que transformaram seus negócios com nossas soluções. Desde pequenas startups 
                  até grandes corporações, todos alcançaram resultados extraordinários.
                </p>
              </div>

              {/* Testimonial Highlights */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-emerald-600" fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="testimonial-1-text">
                      "Aumentamos nossa produtividade em 85% no primeiro mês"
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="testimonial-1-author">
                      Maria Silva, CEO - TechCorp
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="testimonial-2-text">
                      "A satisfação dos nossos clientes subiu 70%"
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="testimonial-2-author">
                      João Santos, Diretor - InnovaCorp
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-card/50 rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground" data-testid="testimonial-3-text">
                      "ROI de 340% em apenas 6 meses de implementação"
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="testimonial-3-author">
                      Ana Costa, CFO - GrowthCorp
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <button 
                  onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
                  data-testid="video-cta-button"
                >
                  Solicitar Demonstração Personalizada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}