import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, FunnelChart, Funnel, LabelList } from 'recharts';

interface Lead {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  fonte: string;
  status: 'Novo' | 'Qualificado' | 'Oportunidade' | 'Perdido';
  score: number;
  data: string;
}

interface Opportunity {
  id: string;
  cliente: string;
  valor: number;
  probabilidade: number;
  etapa: 'Prospecção' | 'Qualificação' | 'Proposta' | 'Negociação' | 'Fechamento';
  vendedor: string;
  prazo: string;
  produto: string;
}

interface Customer {
  id: string;
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  valorTotal: number;
  ultimaCompra: string;
  status: 'Ativo' | 'Inativo' | 'VIP';
  vendedor: string;
}

interface Activity {
  id: string;
  tipo: 'call' | 'email' | 'meeting' | 'deal';
  acao: string;
  cliente: string;
  vendedor: string;
  tempo: string;
}

export default function DemoCRM() {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState('dashboard');
  
  // Navigation items for AppShell
  const navItems = [
    {
      id: 'dashboard',
      label: t('demo.nav.painel'),
      icon: 'fas fa-chart-pie',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'clientes',
      label: t('demo.nav.clientes'),
      icon: 'fas fa-heart',
      onClick: () => setSelectedModule('clientes'),
      isActive: selectedModule === 'clientes'
    },
    {
      id: 'vendas',
      label: t('demo.nav.vendas'),
      icon: 'fas fa-user-plus',
      onClick: () => setSelectedModule('vendas'),
      isActive: selectedModule === 'vendas'
    },
    {
      id: 'oportunidades',
      label: t('demo.nav.oportunidades'),
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('pipeline'),
      isActive: selectedModule === 'pipeline'
    },
    {
      id: 'relatorios',
      label: t('demo.nav.relatorios'),
      icon: 'fas fa-file-chart-line',
      onClick: () => setSelectedModule('relatorios'),
      isActive: selectedModule === 'relatorios'
    }
  ];
  
  // Estados para dados dinâmicos
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", nome: "João Silva", empresa: "TechCorp Ltda", email: "joao@techcorp.com", telefone: "(11) 99999-0001", fonte: "Website", status: "Qualificado", score: 85, data: "11/11" },
    { id: "2", nome: "Maria Santos", empresa: "Innovation Hub", email: "maria@innovation.com", telefone: "(11) 99999-0002", fonte: "LinkedIn", status: "Novo", score: 60, data: "10/11" },
    { id: "3", nome: "Carlos Lima", empresa: "Digital Solutions", email: "carlos@digital.com", telefone: "(11) 99999-0003", fonte: "Indicação", status: "Oportunidade", score: 90, data: "09/11" },
    { id: "4", nome: "Ana Costa", empresa: "StartupXYZ", email: "ana@startup.com", telefone: "(11) 99999-0004", fonte: "Google Ads", status: "Qualificado", score: 75, data: "08/11" }
  ]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { id: "#OPP-2847", cliente: "TechCorp Ltda", valor: 45000, probabilidade: 85, etapa: "Proposta", vendedor: "Ana Silva", prazo: "5 dias", produto: "ERP Empresarial" },
    { id: "#OPP-2846", cliente: "Innovation Hub", valor: 28900, probabilidade: 60, etapa: "Negociação", vendedor: "Carlos Ferreira", prazo: "12 dias", produto: "CRM Premium" },
    { id: "#OPP-2845", cliente: "Digital Solutions", valor: 67500, probabilidade: 90, etapa: "Fechamento", vendedor: "Mariana Costa", prazo: "2 dias", produto: "Suite Completa" },
    { id: "#OPP-2844", cliente: "StartupXYZ", valor: 15000, probabilidade: 40, etapa: "Qualificação", vendedor: "Roberto Lima", prazo: "20 dias", produto: "CRM Básico" }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", nome: "Pedro Oliveira", empresa: "Empresa Moderna SA", email: "pedro@moderna.com", telefone: "(11) 99999-1001", valorTotal: 120000, ultimaCompra: "05/11", status: "VIP", vendedor: "Ana Silva" },
    { id: "2", nome: "Julia Ferreira", empresa: "TechStart Solutions", email: "julia@techstart.com", telefone: "(11) 99999-1002", valorTotal: 85000, ultimaCompra: "01/11", status: "Ativo", vendedor: "Carlos Ferreira" },
    { id: "3", nome: "Roberto Silva", empresa: "Inovação Digital", email: "roberto@inovacao.com", telefone: "(11) 99999-1003", valorTotal: 45000, ultimaCompra: "15/10", status: "Ativo", vendedor: "Mariana Costa" },
    { id: "4", nome: "Fernanda Lima", empresa: "NextGen Corp", email: "fernanda@nextgen.com", telefone: "(11) 99999-1004", valorTotal: 12000, ultimaCompra: "20/09", status: "Inativo", vendedor: "Roberto Lima" }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", tipo: "call", acao: "Ligação realizada", cliente: "TechCorp Ltda", vendedor: "Ana S.", tempo: "5 min atrás" },
    { id: "2", tipo: "email", acao: "Proposta enviada", cliente: "Innovation Hub", vendedor: "Carlos F.", tempo: "23 min atrás" },
    { id: "3", tipo: "meeting", acao: "Reunião agendada", cliente: "Digital Solutions", vendedor: "Mariana C.", tempo: "1h atrás" },
    { id: "4", tipo: "deal", acao: "Negócio fechado", cliente: "StartupXYZ", vendedor: "Roberto L.", tempo: "2h atrás" }
  ]);

  // Form states
  const [newLead, setNewLead] = useState({ nome: '', empresa: '', email: '', telefone: '', fonte: 'Website' });
  const [newOpportunity, setNewOpportunity] = useState<{cliente: string, valor: string, probabilidade: string, etapa: Opportunity['etapa'], vendedor: string, produto: string}>({ cliente: '', valor: '', probabilidade: '50', etapa: 'Prospecção', vendedor: '', produto: '' });
  const [newCustomer, setNewCustomer] = useState({ nome: '', empresa: '', email: '', telefone: '', vendedor: '' });

  // Calculated dashboard data
  const totalOpportunityValue = opportunities.reduce((sum, opp) => sum + opp.valor, 0);
  const avgProbability = opportunities.reduce((sum, opp) => sum + opp.probabilidade, 0) / opportunities.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.valorTotal, 0);
  const activeCustomers = customers.filter(c => c.status === 'Ativo' || c.status === 'VIP').length;
  const qualifiedLeads = leads.filter(l => l.status === 'Qualificado' || l.status === 'Oportunidade').length;
  const conversionRate = leads.length > 0 ? (qualifiedLeads / leads.length * 100).toFixed(1) : '0';
  const avgTicket = customers.length > 0 ? (totalRevenue / customers.length) : 0;

  // Chart data
  const pipelineData = [
    { stage: 'Prospecção', count: opportunities.filter(o => o.etapa === 'Prospecção').length, value: opportunities.filter(o => o.etapa === 'Prospecção').reduce((sum, o) => sum + o.valor, 0) },
    { stage: 'Qualificação', count: opportunities.filter(o => o.etapa === 'Qualificação').length, value: opportunities.filter(o => o.etapa === 'Qualificação').reduce((sum, o) => sum + o.valor, 0) },
    { stage: 'Proposta', count: opportunities.filter(o => o.etapa === 'Proposta').length, value: opportunities.filter(o => o.etapa === 'Proposta').reduce((sum, o) => sum + o.valor, 0) },
    { stage: 'Negociação', count: opportunities.filter(o => o.etapa === 'Negociação').length, value: opportunities.filter(o => o.etapa === 'Negociação').reduce((sum, o) => sum + o.valor, 0) },
    { stage: 'Fechamento', count: opportunities.filter(o => o.etapa === 'Fechamento').length, value: opportunities.filter(o => o.etapa === 'Fechamento').reduce((sum, o) => sum + o.valor, 0) }
  ];

  const leadSourceData = leads.reduce((acc, lead) => {
    const source = acc.find(s => s.name === lead.fonte);
    if (source) {
      source.value += 1;
    } else {
      acc.push({ name: lead.fonte, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const revenueData = [
    { mes: 'Jul', receita: totalRevenue * 0.7 / 1000, oportunidades: totalOpportunityValue * 0.6 / 1000, conversao: 12.5 },
    { mes: 'Ago', receita: totalRevenue * 0.8 / 1000, oportunidades: totalOpportunityValue * 0.7 / 1000, conversao: 15.2 },
    { mes: 'Set', receita: totalRevenue * 0.9 / 1000, oportunidades: totalOpportunityValue * 0.85 / 1000, conversao: 18.8 },
    { mes: 'Out', receita: totalRevenue / 1000, oportunidades: totalOpportunityValue / 1000, conversao: parseFloat(conversionRate) }
  ];

  const performanceData = [
    { semana: 'Sem 1', vendas: totalRevenue * 0.2 / 1000, leads: leads.length * 0.15, oportunidades: opportunities.length * 0.2 },
    { semana: 'Sem 2', vendas: totalRevenue * 0.35 / 1000, leads: leads.length * 0.3, oportunidades: opportunities.length * 0.4 },
    { semana: 'Sem 3', vendas: totalRevenue * 0.65 / 1000, leads: leads.length * 0.65, oportunidades: opportunities.length * 0.7 },
    { semana: 'Sem 4', vendas: totalRevenue / 1000, leads: leads.length, oportunidades: opportunities.length }
  ];

  // Sales team performance
  const salesTeam = ['Ana Silva', 'Carlos Ferreira', 'Mariana Costa', 'Roberto Lima'];
  
  const teamPerformance = salesTeam.map(vendedor => {
    const vendedorOpportunities = opportunities.filter(o => o.vendedor === vendedor);
    const vendedorCustomers = customers.filter(c => c.vendedor === vendedor);
    const vendedorRevenue = vendedorCustomers.reduce((sum, c) => sum + c.valorTotal, 0);
    const vendedorLeads = Math.floor(leads.length / salesTeam.length) + (vendedor === 'Ana Silva' ? 1 : 0);
    
    const monthlyData = [
      { mes: 'Jul', vendas: vendedorRevenue * 0.7 / 1000 },
      { mes: 'Ago', vendas: vendedorRevenue * 0.8 / 1000 },
      { mes: 'Set', vendas: vendedorRevenue * 0.9 / 1000 },
      { mes: 'Out', vendas: vendedorRevenue / 1000 }
    ];

    const weeklyData = [
      { semana: 'S1', atividades: Math.floor(Math.random() * 15) + 5 },
      { semana: 'S2', atividades: Math.floor(Math.random() * 20) + 10 },
      { semana: 'S3', atividades: Math.floor(Math.random() * 25) + 15 },
      { semana: 'S4', atividades: Math.floor(Math.random() * 30) + 20 }
    ];

    const pipelineData = [
      { etapa: 'Prosp', value: vendedorOpportunities.filter(o => o.etapa === 'Prospecção').length },
      { etapa: 'Qual', value: vendedorOpportunities.filter(o => o.etapa === 'Qualificação').length },
      { etapa: 'Prop', value: vendedorOpportunities.filter(o => o.etapa === 'Proposta').length },
      { etapa: 'Neg', value: vendedorOpportunities.filter(o => o.etapa === 'Negociação').length },
      { etapa: 'Fech', value: vendedorOpportunities.filter(o => o.etapa === 'Fechamento').length }
    ];

    return {
      name: vendedor,
      initials: vendedor.split(' ').map(n => n[0]).join(''),
      revenue: vendedorRevenue,
      opportunities: vendedorOpportunities.length,
      customers: vendedorCustomers.length,
      leads: vendedorLeads,
      conversionRate: vendedorLeads > 0 ? ((vendedorCustomers.length / vendedorLeads) * 100).toFixed(1) : '0',
      monthlyData,
      weeklyData,
      pipelineData,
      goal: vendedorRevenue > 100000 ? 120 : vendedorRevenue > 50000 ? 100 : 80,
      goalProgress: vendedorRevenue > 100000 ? Math.min(100, (vendedorRevenue / 120000) * 100) : 
                   vendedorRevenue > 50000 ? Math.min(100, (vendedorRevenue / 100000) * 100) : 
                   Math.min(100, (vendedorRevenue / 80000) * 100)
    };
  });

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  const TEAM_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const addLead = () => {
    if (newLead.nome && newLead.empresa && newLead.email) {
      const lead: Lead = {
        id: String(leads.length + 1),
        nome: newLead.nome,
        empresa: newLead.empresa,
        email: newLead.email,
        telefone: newLead.telefone,
        fonte: newLead.fonte,
        status: 'Novo',
        score: Math.floor(Math.random() * 40) + 60,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      };
      setLeads([lead, ...leads]);
      setNewLead({ nome: '', empresa: '', email: '', telefone: '', fonte: 'Website' });
    }
  };

  const addOpportunity = () => {
    if (newOpportunity.cliente && newOpportunity.valor && newOpportunity.vendedor) {
      const opportunity: Opportunity = {
        id: `#OPP-${2848 + opportunities.length}`,
        cliente: newOpportunity.cliente,
        valor: parseFloat(newOpportunity.valor),
        probabilidade: parseInt(newOpportunity.probabilidade),
        etapa: newOpportunity.etapa,
        vendedor: newOpportunity.vendedor,
        produto: newOpportunity.produto,
        prazo: `${Math.floor(Math.random() * 20) + 1} dias`
      };
      setOpportunities([opportunity, ...opportunities]);
      setNewOpportunity({ cliente: '', valor: '', probabilidade: '50', etapa: 'Prospecção', vendedor: '', produto: '' });
    }
  };

  const addCustomer = () => {
    if (newCustomer.nome && newCustomer.empresa && newCustomer.email) {
      const customer: Customer = {
        id: String(customers.length + 1),
        nome: newCustomer.nome,
        empresa: newCustomer.empresa,
        email: newCustomer.email,
        telefone: newCustomer.telefone,
        valorTotal: Math.floor(Math.random() * 50000) + 10000,
        ultimaCompra: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        status: 'Ativo',
        vendedor: newCustomer.vendedor
      };
      setCustomers([customer, ...customers]);
      setNewCustomer({ nome: '', empresa: '', email: '', telefone: '', vendedor: '' });
    }
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const updateOpportunityStage = (opportunityId: string, newStage: Opportunity['etapa']) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === opportunityId ? { ...opp, etapa: newStage } : opp
    ));
  };

  return (
    <AppShell
      title={t('demo.crm.title')}
      subtitle={t('demo.crm.subtitle')}
      systemIcon="fas fa-users"
      systemColor="from-green-600 to-green-500"
      backHref="/sistema/crm"
      statusBadge={t('demo.crm.badge')}
      navItems={navItems}
      currentUser="Vendedor Silva"
    >
      <div>
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 raleway">Painel de Vendas</h2>
                  <p className="text-zinc-400">Acompanhe o desempenho da sua equipe de vendas em tempo real</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-dollar-sign text-white"></i>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+23.5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-receita-total">
                      R$ {totalRevenue.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-zinc-400 text-sm">Receita Total</p>
                    <div className="mt-3 bg-zinc-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">78% da meta</p>
                  </div>

                  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-user-plus text-white"></i>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">+{leads.length}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-leads-total">
                      {leads.length}
                    </h3>
                    <p className="text-zinc-400 text-sm">Novos Leads</p>
                    <p className="text-blue-400 text-xs mt-2">
                      <i className="fas fa-percentage mr-1"></i>
                      {conversionRate}% conversão
                    </p>
                  </div>

                  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-heart text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-clientes-ativos">
                      {activeCustomers}
                    </h3>
                    <p className="text-zinc-400 text-sm">Clientes Ativos</p>
                    <p className="text-purple-400 text-xs mt-2">
                      <i className="fas fa-ticket-alt mr-1"></i>
                      R$ {avgTicket.toLocaleString('pt-BR')} média
                    </p>
                  </div>

                  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-white"></i>
                      </div>
                      <span className="text-orange-400 text-sm font-medium">Pipeline</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-oportunidades-total">
                      {opportunities.length}
                    </h3>
                    <p className="text-zinc-400 text-sm">Oportunidades</p>
                    <p className="text-orange-400 text-xs mt-2">R$ {(totalOpportunityValue / 1000).toFixed(0)}k potencial</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Performance Semanal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="semana" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181B', border: '1px solid #374151', borderRadius: '8px' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Line type="monotone" dataKey="vendas" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} name="Vendas (k)" />
                        <Line type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} name="Leads" />
                        <Line type="monotone" dataKey="oportunidades" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} name="Oportunidades" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Pipeline por Etapa</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={pipelineData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis dataKey="stage" type="category" stroke="#9CA3AF" width={80} />
                        <Tooltip 
                          formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`]} 
                          contentStyle={{ backgroundColor: '#18181B', border: '1px solid #374151', borderRadius: '8px' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Bar dataKey="value" fill="#10B981" name="Valor" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Evolução Mensal</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="mes" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181B', border: '1px solid #374151', borderRadius: '8px' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                        <Area type="monotone" dataKey="receita" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} name="Receita (k)" />
                        <Area type="monotone" dataKey="conversao" stackId="2" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Conversão %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Team Performance Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-6 raleway">Performance da Equipe de Vendas</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {teamPerformance.map((member, index) => (
                      <div key={member.name} className="bg-zinc-900 rounded-xl border border-zinc-700 p-6" data-testid={`card-team-member-${index}`}>
                        {/* Member Header */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: TEAM_COLORS[index % TEAM_COLORS.length] }}
                          >
                            {member.initials}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{member.name}</h4>
                            <p className="text-xs text-zinc-400">Vendedor</p>
                          </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400" data-testid={`text-member-revenue-${index}`}>
                              $ {(member.revenue / 1000).toFixed(0)}k
                            </p>
                            <p className="text-xs text-zinc-400">Receita</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400" data-testid={`text-member-opportunities-${index}`}>
                              {member.opportunities}
                            </p>
                            <p className="text-xs text-zinc-400">Oportunidades</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-400" data-testid={`text-member-customers-${index}`}>
                              {member.customers}
                            </p>
                            <p className="text-xs text-zinc-400">Clientes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-400" data-testid={`text-member-conversion-${index}`}>
                              {member.conversionRate}%
                            </p>
                            <p className="text-xs text-zinc-400">Conversão</p>
                          </div>
                        </div>

                        {/* Goal Progress */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-zinc-400">Meta Mensal</span>
                            <span className="text-sm text-white">{member.goalProgress.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${Math.min(100, member.goalProgress)}%`,
                                backgroundColor: TEAM_COLORS[index % TEAM_COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Mini Chart - Monthly Sales */}
                        <div className="mb-4">
                          <p className="text-sm text-zinc-400 mb-2">Vendas Mensais</p>
                          <ResponsiveContainer width="100%" height={60}>
                            <AreaChart data={member.monthlyData}>
                              <Area 
                                type="monotone" 
                                dataKey="vendas" 
                                stroke={TEAM_COLORS[index % TEAM_COLORS.length]} 
                                fill={TEAM_COLORS[index % TEAM_COLORS.length]} 
                                fillOpacity={0.3}
                                strokeWidth={2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Mini Chart - Weekly Activities */}
                        <div className="mb-4">
                          <p className="text-sm text-zinc-400 mb-2">Atividades Semanais</p>
                          <ResponsiveContainer width="100%" height={60}>
                            <BarChart data={member.weeklyData}>
                              <Bar 
                                dataKey="atividades" 
                                fill={TEAM_COLORS[index % TEAM_COLORS.length]} 
                                radius={[2, 2, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Mini Chart - Pipeline Distribution */}
                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Pipeline Atual</p>
                          <ResponsiveContainer width="100%" height={60}>
                            <BarChart data={member.pipelineData} layout="horizontal">
                              <Bar 
                                dataKey="value" 
                                fill={TEAM_COLORS[index % TEAM_COLORS.length]} 
                                radius={[0, 2, 2, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance and Sources */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Oportunidades Recentes</h3>
                    <div className="space-y-4">
                      {opportunities.slice(0, 4).map((opp) => (
                        <div key={opp.id} className="p-4 bg-zinc-800 rounded-lg border-l-4 border-green-500" data-testid={`row-opportunity-${opp.id}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{opp.cliente}</h4>
                            <span className="text-sm font-semibold text-green-400">$ {opp.valor.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                            <div>
                              <span className="font-medium">Etapa:</span> {opp.etapa}
                            </div>
                            <div>
                              <span className="font-medium">Prob:</span> {opp.probabilidade}%
                            </div>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">
                            <i className="fas fa-user mr-1"></i>
                            {opp.vendedor}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Leads Recentes</h3>
                    <div className="space-y-4">
                      {leads.slice(0, 4).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg" data-testid={`row-lead-${lead.id}`}>
                          <div>
                            <p className="font-medium text-white">{lead.nome}</p>
                            <p className="text-sm text-zinc-400">{lead.empresa} • {lead.fonte}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">Score: {lead.score}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              lead.status === 'Oportunidade' ? 'bg-green-900/20 text-green-400' :
                              lead.status === 'Qualificado' ? 'bg-blue-900/20 text-blue-400' :
                              lead.status === 'Novo' ? 'bg-yellow-900/20 text-yellow-400' :
                              'bg-red-900/20 text-red-400'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Fontes de Leads</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={leadSourceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {leadSourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`${value} leads`]} 
                          contentStyle={{ backgroundColor: '#18181B', border: '1px solid #374151', borderRadius: '8px' }}
                          labelStyle={{ color: '#F3F4F6' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'vendas' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 raleway">Gestão de Leads</h2>
                
                {/* Add New Lead Form */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Novo Lead</h3>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <input
                      type="text"
                      placeholder="Nome Completo"
                      value={newLead.nome}
                      onChange={(e) => setNewLead({...newLead, nome: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-lead-nome"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={newLead.empresa}
                      onChange={(e) => setNewLead({...newLead, empresa: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-lead-empresa"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-lead-email"
                    />
                    <input
                      type="tel"
                      placeholder="Telefone"
                      value={newLead.telefone}
                      onChange={(e) => setNewLead({...newLead, telefone: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-lead-telefone"
                    />
                    <select
                      value={newLead.fonte}
                      onChange={(e) => setNewLead({...newLead, fonte: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white"
                      data-testid="select-lead-fonte"
                    >
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Indicação">Indicação</option>
                      <option value="Telefone">Telefone</option>
                    </select>
                    <button
                      onClick={addLead}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      data-testid="button-add-lead"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar Lead
                    </button>
                  </div>
                </div>

                {/* Leads List */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Lista de Leads</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left py-3 text-white">Nome</th>
                          <th className="text-left py-3 text-white">Empresa</th>
                          <th className="text-left py-3 text-white">Email</th>
                          <th className="text-left py-3 text-white">Fonte</th>
                          <th className="text-left py-3 text-white">Score</th>
                          <th className="text-left py-3 text-white">Status</th>
                          <th className="text-left py-3 text-white">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-zinc-800" data-testid={`row-lead-detail-${lead.id}`}>
                            <td className="py-3 text-white">{lead.nome}</td>
                            <td className="py-3 text-zinc-400">{lead.empresa}</td>
                            <td className="py-3 text-zinc-400">{lead.email}</td>
                            <td className="py-3 text-zinc-400">{lead.fonte}</td>
                            <td className="py-3 text-white font-semibold">{lead.score}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                lead.status === 'Oportunidade' ? 'bg-green-900/20 text-green-400' :
                                lead.status === 'Qualificado' ? 'bg-blue-900/20 text-blue-400' :
                                lead.status === 'Novo' ? 'bg-yellow-900/20 text-yellow-400' :
                                'bg-red-900/20 text-red-400'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3">
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                                className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-white"
                                data-testid={`select-lead-status-${lead.id}`}
                              >
                                <option value="Novo">Novo</option>
                                <option value="Qualificado">Qualificado</option>
                                <option value="Oportunidade">Oportunidade</option>
                                <option value="Perdido">Perdido</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'pipeline' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 raleway">Pipeline de Vendas</h2>
                
                {/* Add New Opportunity Form */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Nova Oportunidade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do Cliente"
                      value={newOpportunity.cliente}
                      onChange={(e) => setNewOpportunity({...newOpportunity, cliente: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-opportunity-cliente"
                    />
                    <input
                      type="number"
                      placeholder="Valor ($)"
                      value={newOpportunity.valor}
                      onChange={(e) => setNewOpportunity({...newOpportunity, valor: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-opportunity-valor"
                    />
                    <input
                      type="text"
                      placeholder="Vendedor"
                      value={newOpportunity.vendedor}
                      onChange={(e) => setNewOpportunity({...newOpportunity, vendedor: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-opportunity-vendedor"
                    />
                    <input
                      type="text"
                      placeholder="Produto"
                      value={newOpportunity.produto}
                      onChange={(e) => setNewOpportunity({...newOpportunity, produto: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-opportunity-produto"
                    />
                    <select
                      value={newOpportunity.etapa}
                      onChange={(e) => setNewOpportunity({...newOpportunity, etapa: e.target.value as Opportunity['etapa']})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white"
                      data-testid="select-opportunity-etapa"
                    >
                      <option value="Prospecção">Prospecção</option>
                      <option value="Qualificação">Qualificação</option>
                      <option value="Proposta">Proposta</option>
                      <option value="Negociação">Negociação</option>
                      <option value="Fechamento">Fechamento</option>
                    </select>
                    <button
                      onClick={addOpportunity}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      data-testid="button-add-opportunity"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* Pipeline Board */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                  {['Prospecção', 'Qualificação', 'Proposta', 'Negociação', 'Fechamento'].map((stage) => (
                    <div key={stage} className="bg-zinc-900 rounded-xl border border-zinc-700 p-4">
                      <h4 className="font-semibold text-white mb-4 text-center">{stage}</h4>
                      <div className="space-y-3">
                        {opportunities.filter(opp => opp.etapa === stage).map((opp) => (
                          <div key={opp.id} className="bg-zinc-800 p-3 rounded-lg border border-zinc-600" data-testid={`card-opportunity-${opp.id}`}>
                            <h5 className="font-medium text-white text-sm mb-1">{opp.cliente}</h5>
                            <p className="text-green-400 font-semibold text-sm">$ {opp.valor.toLocaleString('pt-BR')}</p>
                            <p className="text-zinc-400 text-xs">{opp.probabilidade}% • {opp.vendedor}</p>
                            <select
                              value={opp.etapa}
                              onChange={(e) => updateOpportunityStage(opp.id, e.target.value as Opportunity['etapa'])}
                              className="text-xs px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white mt-2 w-full"
                              data-testid={`select-opportunity-stage-${opp.id}`}
                            >
                              <option value="Prospecção">Prospecção</option>
                              <option value="Qualificação">Qualificação</option>
                              <option value="Proposta">Proposta</option>
                              <option value="Negociação">Negociação</option>
                              <option value="Fechamento">Fechamento</option>
                            </select>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-zinc-700 text-center">
                        <p className="text-xs text-zinc-400">
                          {opportunities.filter(opp => opp.etapa === stage).length} oportunidades
                        </p>
                        <p className="text-xs text-zinc-500">
                          $ {opportunities.filter(opp => opp.etapa === stage).reduce((sum, opp) => sum + opp.valor, 0).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedModule === 'clientes' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 raleway">Gestão de Clientes</h2>
                
                {/* Add New Customer Form */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Novo Cliente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                      type="text"
                      placeholder="Nome Completo"
                      value={newCustomer.nome}
                      onChange={(e) => setNewCustomer({...newCustomer, nome: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-customer-nome"
                    />
                    <input
                      type="text"
                      placeholder="Empresa"
                      value={newCustomer.empresa}
                      onChange={(e) => setNewCustomer({...newCustomer, empresa: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-customer-empresa"
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-customer-email"
                    />
                    <input
                      type="text"
                      placeholder="Vendedor Responsável"
                      value={newCustomer.vendedor}
                      onChange={(e) => setNewCustomer({...newCustomer, vendedor: e.target.value})}
                      className="px-3 py-2 border border-zinc-600 rounded-lg bg-zinc-800 text-white placeholder-zinc-400"
                      data-testid="input-customer-vendedor"
                    />
                    <button
                      onClick={addCustomer}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                      data-testid="button-add-customer"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar Cliente
                    </button>
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Total de Clientes</h3>
                        <p className="text-2xl font-bold text-green-400" data-testid="text-total-customers">
                          {customers.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-star text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Clientes VIP</h3>
                        <p className="text-2xl font-bold text-purple-400" data-testid="text-vip-customers">
                          {customers.filter(c => c.status === 'VIP').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-money-bill text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Receita Total</h3>
                        <p className="text-2xl font-bold text-blue-400" data-testid="text-total-customer-revenue">
                          R$ {totalRevenue.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customers List */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Customer List</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left py-3 text-white">Nome</th>
                          <th className="text-left py-3 text-white">Empresa</th>
                          <th className="text-left py-3 text-white">Email</th>
                          <th className="text-left py-3 text-white">Salesperson</th>
                          <th className="text-left py-3 text-white">Valor Total</th>
                          <th className="text-left py-3 text-white">Última Compra</th>
                          <th className="text-left py-3 text-white">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer) => (
                          <tr key={customer.id} className="border-b border-zinc-800" data-testid={`row-customer-${customer.id}`}>
                            <td className="py-3 text-white font-medium">{customer.nome}</td>
                            <td className="py-3 text-zinc-400">{customer.empresa}</td>
                            <td className="py-3 text-zinc-400">{customer.email}</td>
                            <td className="py-3 text-zinc-400">{customer.vendedor}</td>
                            <td className="py-3 text-white font-semibold">$ {customer.valorTotal.toLocaleString('pt-BR')}</td>
                            <td className="py-3 text-zinc-400">{customer.ultimaCompra}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                customer.status === 'VIP' ? 'bg-purple-900/20 text-purple-400' :
                                customer.status === 'Ativo' ? 'bg-green-900/20 text-green-400' :
                                'bg-red-900/20 text-red-400'
                              }`}>
                                {customer.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'relatorios' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 raleway">Relatórios de Vendas</h2>
                  <p className="text-zinc-400">Análises e relatórios detalhados do desempenho comercial</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-white text-sm sm:text-base"></i>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1" data-testid="text-total-vendas">
                      R$ {totalRevenue.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Vendas Este Mês</p>
                  </div>

                  <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-percentage text-white text-sm sm:text-base"></i>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1" data-testid="text-conversao-rate">
                      {conversionRate}%
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Conversion Rate</p>
                  </div>

                  <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-white text-sm sm:text-base"></i>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1" data-testid="text-leads-mes">
                      {leads.length}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Leads Este Mês</p>
                  </div>

                  <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-zinc-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-trophy text-white text-sm sm:text-base"></i>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-1" data-testid="text-ticket-medio">
                      $ {avgTicket.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm">Ticket Médio</p>
                  </div>
                </div>

                {/* Team Performance Report */}
                <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 raleway">Team Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left py-3 text-white text-sm sm:text-base">Vendedor</th>
                          <th className="text-left py-3 text-white text-sm sm:text-base">Receita</th>
                          <th className="text-left py-3 text-white text-sm sm:text-base">Leads</th>
                          <th className="text-left py-3 text-white text-sm sm:text-base">Oportunidades</th>
                          <th className="text-left py-3 text-white text-sm sm:text-base">Taxa Conv.</th>
                          <th className="text-left py-3 text-white text-sm sm:text-base">Meta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamPerformance.map((member, index) => (
                          <tr key={member.name} className="border-b border-zinc-800" data-testid={`row-performance-${index}`}>
                            <td className="py-3 text-white font-medium text-sm sm:text-base">{member.name}</td>
                            <td className="py-3 text-white font-semibold text-sm sm:text-base">$ {member.revenue.toLocaleString('pt-BR')}</td>
                            <td className="py-3 text-zinc-400 text-sm sm:text-base">{member.leads}</td>
                            <td className="py-3 text-zinc-400 text-sm sm:text-base">{member.opportunities}</td>
                            <td className="py-3 text-green-400 text-sm sm:text-base">{member.conversionRate}%</td>
                            <td className="py-3 text-sm sm:text-base">
                              <div className="flex items-center space-x-2">
                                <div className="w-20 sm:w-24 bg-zinc-800 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                                    style={{width: `${Math.min(member.goalProgress, 100)}%`}}
                                  ></div>
                                </div>
                                <span className="text-xs text-zinc-400">{member.goalProgress.toFixed(0)}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
      </div>
    </AppShell>
  );
}