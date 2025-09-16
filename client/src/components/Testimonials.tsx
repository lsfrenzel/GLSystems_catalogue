export default function Testimonials() {
  const testimonials = [
    {
      id: 'carlos',
      quote: 'O sistema ERP transformou completamente nossa operação. Conseguimos reduzir custos em 40% e aumentar nossa produtividade significativamente.',
      name: 'Carlos Silva',
      position: 'CEO, IndustTech',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    },
    {
      id: 'maria',
      quote: 'O CRM nos ajudou a organizar nossa base de clientes e aumentar nossas vendas em 60%. Recomendo para qualquer empresa séria.',
      name: 'Maria Santos',
      position: 'Diretora Comercial, VendaMais',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    },
    {
      id: 'joao',
      quote: 'O sistema de comandas revolucionou nosso restaurante. Conseguimos atender 300% mais clientes com a mesma equipe.',
      name: 'João Oliveira',
      position: 'Proprietário, Sabor & Arte',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    },
    {
      id: 'ana',
      quote: 'A plataforma EAD nos permitiu expandir nossos cursos nacionalmente. Triplicamos nossa receita no primeiro ano.',
      name: 'Ana Costa',
      position: 'Diretora, EduTech Academy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150'
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="testimonials-title">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="testimonials-subtitle">
            Histórias reais de transformação digital e crescimento empresarial
          </p>
        </div>

        <div className="carousel-container" data-testid="testimonials-carousel">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="testimonial-card"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div>
                <p className="text-lg italic mb-6 leading-relaxed" data-testid={`testimonial-quote-${testimonial.id}`}>
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={`Portrait of ${testimonial.name}`}
                  className="w-12 h-12 rounded-full mr-4"
                  data-testid={`testimonial-image-${testimonial.id}`}
                />
                <div>
                  <h4 className="font-semibold" data-testid={`testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`testimonial-position-${testimonial.id}`}>
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
