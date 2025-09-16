export default function Benefits() {
  const benefits = [
    {
      id: 'productivity',
      icon: 'fas fa-rocket',
      title: 'Aumento de Produtividade',
      description: 'Automação de processos que reduz o tempo gasto em tarefas manuais em até 70%'
    },
    {
      id: 'error-reduction',
      icon: 'fas fa-shield-alt',
      title: 'Redução de Erros',
      description: 'Sistemas inteligentes que minimizam erros humanos e garantem consistência operacional'
    },
    {
      id: 'profit-growth',
      icon: 'fas fa-chart-line',
      title: 'Aumento de Lucros',
      description: 'Otimização de recursos e processos que resultam em aumento médio de 35% na margem de lucro'
    },
    {
      id: 'data-decisions',
      icon: 'fas fa-brain',
      title: 'Decisões Baseadas em Dados',
      description: 'Relatórios em tempo real e análises preditivas para tomadas de decisão mais assertivas'
    },
    {
      id: 'scalability',
      icon: 'fas fa-expand-arrows-alt',
      title: 'Escalabilidade',
      description: 'Sistemas que crescem junto com sua empresa, suportando expansão sem perda de performance'
    },
    {
      id: 'customer-satisfaction',
      icon: 'fas fa-heart',
      title: 'Satisfação do Cliente',
      description: 'Atendimento mais eficiente e personalizado que aumenta a satisfação em até 60%'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="benefits-title">
            Benefícios dos Nossos Sistemas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="benefits-subtitle">
            Transforme sua empresa com soluções que geram resultados mensuráveis e sustentáveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id}
              className="fade-in text-center group"
              data-testid={`benefit-${benefit.id}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <i className={`${benefit.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 raleway" data-testid={`benefit-title-${benefit.id}`}>
                {benefit.title}
              </h3>
              <p className="text-muted-foreground" data-testid={`benefit-description-${benefit.id}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
