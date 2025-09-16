import { useState } from "react";
import { Link } from "wouter";
import AppShell from "@/components/layout/AppShell";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

// Centralized constants for status values to prevent translation regressions
const TABLE_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied', 
  RESERVED: 'reserved',
  BILLING: 'billing'
} as const;

const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready'
} as const;

const STAFF_STATUS = {
  ACTIVE: 'active',
  BREAK: 'break'
} as const;

export default function DemoRestaurant() {
  const [selectedModule, setSelectedModule] = useState('dashboard');
  
  // Navigation items for AppShell
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'pedidos',
      label: 'Orders',
      icon: 'fas fa-receipt',
      onClick: () => setSelectedModule('pedidos'),
      isActive: selectedModule === 'pedidos'
    },
    {
      id: 'cardapio',
      label: 'Menu',
      icon: 'fas fa-book-open',
      onClick: () => setSelectedModule('cardapio'),
      isActive: selectedModule === 'cardapio'
    },
    {
      id: 'mesas',
      label: 'Tables',
      icon: 'fas fa-chair',
      onClick: () => setSelectedModule('mesas'),
      isActive: selectedModule === 'mesas'
    },
    {
      id: 'relatorios',
      label: 'Reports',
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('relatorios'),
      isActive: selectedModule === 'relatorios'
    }
  ];
  
  // Advanced states
  const [alertas, setAlertas] = useState([
    { id: 1, tipo: 'pedido', mensagem: 'Table 3 waiting for 15min', tempo: '15min', urgente: true },
    { id: 2, tipo: 'estoque', mensagem: 'Salmon low in stock', tempo: '5min', urgente: false },
    { id: 3, tipo: 'reserva', mensagem: 'New reservation for 8:30 PM', tempo: '2min', urgente: false }
  ]);
  const [cronometros, setCronometros] = useState({});
  const [clientes, setClientes] = useState([
    { nome: 'John Silva', telefone: '11999887766', email: 'john@email.com' },
    { nome: 'Maria Santos', telefone: '11988776655', email: 'maria@email.com' }
  ]);
  const [novaReserva, setNovaReserva] = useState({ 
    mesa: '', cliente: '', data: '', hora: '', pessoas: 2, telefone: '', observacoes: '' 
  });
  
  // Dynamic states
  const [mesas, setMesas] = useState([
    { numero: 1, status: "occupied", garcom: "Maria", pedido: 145, tempo: "25min", pessoas: 4 },
    { numero: 2, status: "available", garcom: "-", pedido: 0, tempo: "-", pessoas: 0 },
    { numero: 3, status: "reserved", garcom: "John", pedido: 0, tempo: "7:30 PM", pessoas: 2 },
    { numero: 4, status: "occupied", garcom: "Ana", pedido: 89, tempo: "10min", pessoas: 3 },
    { numero: 5, status: "occupied", garcom: "Carlos", pedido: 234, tempo: "35min", pessoas: 6 },
    { numero: 6, status: "available", garcom: "-", pedido: 0, tempo: "-", pessoas: 0 },
    { numero: 7, status: "billing", garcom: "Maria", pedido: 167, tempo: "Completed", pessoas: 2 },
    { numero: 8, status: "occupied", garcom: "Peter", pedido: 98, tempo: "15min", pessoas: 4 },
    { numero: 9, status: "available", garcom: "-", pedido: 0, tempo: "-", pessoas: 0 },
    { numero: 10, status: "occupied", garcom: "Ana", pedido: 156, tempo: "5min", pessoas: 2 },
    { numero: 11, status: "reserved", garcom: "Carlos", pedido: 0, tempo: "8:00 PM", pessoas: 4 },
    { numero: 12, status: "available", garcom: "-", pedido: 0, tempo: "-", pessoas: 0 }
  ]);
  
  const [pratosPopulares, setPratosPopulares] = useState([
    { nome: "Grilled Salmon", categoria: "Main Course", vendas: 23, valor: 48.90, disponivel: true, estoque: 12, imagem: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop" },
    { nome: "Mushroom Risotto", categoria: "Main Course", vendas: 18, valor: 42.50, disponivel: true, estoque: 8, imagem: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop" },
    { nome: "House Tiramisu", categoria: "Dessert", vendas: 31, valor: 16.90, disponivel: true, estoque: 15, imagem: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop" },
    { nome: "Special Bruschetta", categoria: "Appetizer", vendas: 42, valor: 18.50, disponivel: false, estoque: 0, imagem: "https://images.unsplash.com/photo-1505253213348-cd54c92b37ed?w=300&h=200&fit=crop" }
  ]);
  
  const [pedidosCozinha, setPedidosCozinha] = useState([
    { id: 1, mesa: 1, item: "Grilled Salmon", quantidade: 2, tempo: "8min", status: "preparing", prioridade: "normal" },
    { id: 2, mesa: 4, item: "Mushroom Risotto", quantidade: 1, tempo: "12min", status: "preparing", prioridade: "normal" },
    { id: 3, mesa: 5, item: "Special Bruschetta", quantidade: 3, tempo: "5min", status: "ready", prioridade: "high" },
    { id: 4, mesa: 8, item: "House Tiramisu", quantidade: 2, tempo: "3min", status: "ready", prioridade: "normal" },
    { id: 5, mesa: 1, item: "Red Wine", quantidade: 1, tempo: "Immediate", status: "pending", prioridade: "low" },
    { id: 6, mesa: 10, item: "Grilled Salmon", quantidade: 1, tempo: "15min", status: "preparing", prioridade: "normal" }
  ]);
  
  const [funcionarios] = useState([
    { nome: "Maria Silva", cargo: "Server", mesas: [1, 7], vendas: 456, status: "active", comissao: 45.60, horasTrabalhadas: 8 },
    { nome: "John Santos", cargo: "Server", mesas: [3], vendas: 123, status: "break", comissao: 12.30, horasTrabalhadas: 4 },
    { nome: "Ana Costa", cargo: "Server", mesas: [4, 10], vendas: 289, status: "active", comissao: 28.90, horasTrabalhadas: 6 },
    { nome: "Carlos Lima", cargo: "Server", mesas: [5, 11], vendas: 567, status: "active", comissao: 56.70, horasTrabalhadas: 8 },
    { nome: "Peter Oliveira", cargo: "Server", mesas: [8], vendas: 198, status: "active", comissao: 19.80, horasTrabalhadas: 5 }
  ]);
  
  // Form states
  const [novoPedido, setNovoPedido] = useState({ mesa: '', prato: '', quantidade: 1 });
  const [novoItemCardapio, setNovoItemCardapio] = useState({ nome: '', categoria: 'Entrada', valor: '', disponivel: true, estoque: 10, imagem: '' });

  // Dynamically calculated data
  const totalVendas = mesas.reduce((sum, mesa) => sum + (mesa.pedido || 0), 0);
  const mesasOcupadas = mesas.filter(m => m.status === 'occupied').length;
  const mesasLivres = mesas.filter(m => m.status === 'available').length;
  const mesasReservadas = mesas.filter(m => m.status === 'reserved').length;
  const totalPedidos = pedidosCozinha.length;
  const pedidosProntos = pedidosCozinha.filter(p => p.status === 'ready').length;
  const tempoMedio = Math.round((15 + 8 + 12 + 5 + 3) / 5);
  const ocupacaoPercent = Math.round((mesasOcupadas / mesas.length) * 100);
  
  // Chart data
  const statusMesasData = [
    { name: 'Occupied', value: mesasOcupadas, color: '#EF4444' },
    { name: 'Available', value: mesasLivres, color: '#10B981' },
    { name: 'Reserved', value: mesasReservadas, color: '#3B82F6' },
    { name: 'Billing', value: mesas.filter(m => m.status === 'billing').length, color: '#F59E0B' }
  ];
  
  const vendasDiariasData = [
    { hora: '18h', vendas: totalVendas * 0.15 },
    { hora: '19h', vendas: totalVendas * 0.35 },
    { hora: '20h', vendas: totalVendas * 0.60 },
    { hora: '21h', vendas: totalVendas * 0.85 },
    { hora: '22h', vendas: totalVendas },
    { hora: '23h', vendas: totalVendas * 0.95 }
  ];
  
  const pratosCategoriaData = pratosPopulares.reduce((acc, prato) => {
    const categoria = acc.find(c => c.name === prato.categoria);
    if (categoria) {
      categoria.value += prato.vendas;
    } else {
      acc.push({ name: prato.categoria, value: prato.vendas });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  const performanceFuncionarios = funcionarios.map(func => ({
    nome: func.nome.split(' ')[0],
    vendas: func.vendas,
    mesas: func.mesas.length
  }));
  
  const COLORS = ['#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];

  return (
    <AppShell
      title="RestaurantPro - TechSolutions"
      subtitle="Food Service Edition"
      systemIcon="fas fa-utensils"
      systemColor="from-orange-600 to-orange-500"
      backHref="/sistema/restaurant"
      statusBadge="Restaurant System"
      navItems={navItems}
      currentUser="Dinner Shift - 7:30 PM to 11:00 PM"
    >
      {/* Alertas e Notificações */}
      <div className="bg-orange-950/80 border-b border-orange-900 mb-6 rounded-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-orange-100 flex items-center">
              <i className="fas fa-bell mr-2 text-orange-400"></i>
              Alert Center
            </h3>
            <span className="text-xs text-orange-400 bg-orange-900/50 px-2 py-1 rounded-full">
              {alertas.filter(a => a.urgente).length} urgent
            </span>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 snap-x">
            {alertas.map((alerta) => (
              <div key={alerta.id} className={`snap-start shrink-0 p-3 rounded-lg border transition-all hover:scale-105 ${
                alerta.urgente ? 'bg-red-950/70 border-red-800 animate-pulse' : 'bg-orange-950/60 border-orange-800'
              }`} data-testid={`alerta-${alerta.id}`}>
                <div className="flex items-center space-x-3">
                  <i className={`fas fa-${alerta.tipo === 'pedido' ? 'clock' : alerta.tipo === 'estoque' ? 'box' : 'calendar'} text-sm ${
                    alerta.urgente ? 'text-red-400' : 'text-orange-400'
                  }`}></i>
                  <div className="flex-1">
                    <p className="text-xs text-orange-200 font-medium">{alerta.mensagem}</p>
                    <p className="text-xs text-orange-400 mt-1">{alerta.tempo} ago</p>
                  </div>
                  <button 
                    onClick={() => setAlertas(prev => prev.filter(a => a.id !== alerta.id))}
                    className="text-orange-400 hover:text-orange-200 text-sm font-bold transition-colors"
                    data-testid={`button-dismiss-${alerta.id}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button 
              className="snap-start shrink-0 p-3 border-2 border-dashed border-orange-800 rounded-lg text-orange-400 hover:bg-orange-950/30 transition-colors"
              onClick={() => {
                const novoAlerta = {
                  id: Math.max(...alertas.map(a => a.id)) + 1,
                  tipo: 'pedido',
                  mensagem: `Table ${Math.floor(Math.random() * 12) + 1} needs attention`,
                  tempo: 'now',
                  urgente: Math.random() > 0.5
                };
                setAlertas(prev => [...prev, novoAlerta]);
              }}
              data-testid="button-add-alert"
            >
              <i className="fas fa-plus text-sm mr-2"></i>
              <span className="text-xs">Simulate Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Systems Message */}
      <div className="mb-6">
        <CustomSystemsMessage variant="compact" />
      </div>

      <>
        {selectedModule === 'dashboard' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 raleway">Restaurant Dashboard</h2>
            <p className="text-gray-300">Overview of current shift operations</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-orange-950/80 p-6 rounded-xl border border-orange-900 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-vendas">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-dollar-sign text-white"></i>
                </div>
                <span className="text-green-400 text-sm font-medium">+18.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-vendas-total">
                R$ {totalVendas.toLocaleString('pt-BR')}
              </h3>
              <p className="text-gray-300 text-sm">Shift Sales</p>
            </div>

            <div className="bg-orange-950/80 p-6 rounded-xl border border-orange-900 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-pedidos">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-receipt text-white"></i>
                </div>
                <span className="text-blue-400 text-sm font-medium">+{totalPedidos}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-pedidos-total">
                {totalPedidos}
              </h3>
              <p className="text-gray-300 text-sm">Orders Served</p>
            </div>

            <div className="bg-orange-950/80 p-6 rounded-xl border border-orange-900 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-mesas">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chair text-white"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-tables-available">
                {mesasLivres}
              </h3>
              <p className="text-gray-300 text-sm">Available Tables</p>
              <p className="text-orange-400 text-xs mt-2">{ocupacaoPercent}% occupied</p>
            </div>

            <div className="bg-orange-950/80 p-6 rounded-xl border border-orange-900 shadow-lg hover:shadow-xl transition-shadow" data-testid="card-tempo">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-white"></i>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1" data-testid="text-tempo-medio">
                {tempoMedio}min
              </h3>
              <p className="text-gray-300 text-sm">Average Time</p>
              <p className="text-purple-400 text-xs mt-2">Per order</p>
            </div>
          </div>

          {/* Table Layout Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Restaurant Layout</h3>
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {mesas.map((mesa) => (
                  <div 
                    key={mesa.numero}
                    className={`relative w-16 h-16 rounded-lg border-2 flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-200 hover:scale-105 ${
                      mesa.status === 'occupied' ? 'bg-red-600 border-red-500 text-white' :
                      mesa.status === 'available' ? 'bg-green-600 border-green-500 text-white hover:bg-green-500' :
                      mesa.status === 'reserved' ? 'bg-blue-600 border-blue-500 text-white' :
                      'bg-yellow-600 border-yellow-500 text-white'
                    }`}
                    title={`Table ${mesa.numero} - ${mesa.status}${mesa.pedido ? ` - R$ ${mesa.pedido}` : ''}`}
                    data-testid={`mesa-layout-${mesa.numero}`}
                    onClick={() => {
                      const novoStatus = mesa.status === 'available' ? 'occupied' : 
                                      mesa.status === 'occupied' ? 'billing' : 
                                      mesa.status === 'billing' ? 'available' : mesa.status;
                      setMesas(prev => prev.map(m => 
                        m.numero === mesa.numero 
                          ? { ...m, status: novoStatus, pedido: novoStatus === 'occupied' ? Math.floor(Math.random() * 200) + 50 : novoStatus === 'available' ? 0 : m.pedido }
                          : m
                      ));
                    }}
                  >
                    {mesa.numero}
                    {mesa.status === 'occupied' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full border border-white"></div>
                    )}
                    {mesa.status === 'reserved' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full border border-white"></div>
                    )}
                    {mesa.status === 'billing' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span className="text-gray-300">Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span className="text-gray-300">Occupied</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span className="text-gray-300">Reserved</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-600 rounded"></div>
                  <span className="text-gray-300">Billing</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Table Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusMesasData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusMesasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#C2410C', border: '1px solid #EA580C', borderRadius: '8px' }}
                    labelStyle={{ color: '#FED7AA' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráficos de Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Sales by Hour</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={vendasDiariasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C2410C" />
                  <XAxis dataKey="hora" stroke="#FED7AA" />
                  <YAxis stroke="#FED7AA" />
                  <Tooltip 
                    formatter={(value: number) => [`R$ ${value.toFixed(0)}`, 'Sales']}
                    contentStyle={{ backgroundColor: '#C2410C', border: '1px solid #EA580C', borderRadius: '8px' }}
                    labelStyle={{ color: '#FED7AA' }}
                  />
                  <Area type="monotone" dataKey="vendas" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Team Performance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={performanceFuncionarios}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#C2410C" />
                        <XAxis dataKey="nome" stroke="#FED7AA" />
                        <YAxis stroke="#FED7AA" />
                        <Tooltip 
                          formatter={(value: number, name: string) => [`R$ ${value}`, name === 'vendas' ? 'Sales' : 'Tables']}
                          contentStyle={{ backgroundColor: '#C2410C', border: '1px solid #EA580C', borderRadius: '8px' }}
                          labelStyle={{ color: '#FED7AA' }}
                        />
                        <Bar dataKey="vendas" fill="#3B82F6" name="Sales" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Popular Items and Staff */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-orange-800 rounded-xl border border-orange-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-100 mb-4 raleway">Popular Dishes Today</h3>
                    <div className="space-y-4">
                      {pratosPopulares.map((prato, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-700 to-red-700 rounded-lg">
                          <div>
                            <p className="font-medium text-orange-100">{prato.nome}</p>
                            <p className="text-sm text-orange-300">{prato.categoria}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-orange-100">{prato.vendas} sales</p>
                            <p className="text-sm text-orange-400">R$ {prato.valor.toFixed(2).replace('.', ',')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-800 rounded-xl border border-orange-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-100 mb-4 raleway">Staff on Duty</h3>
                    <div className="space-y-4">
                      {funcionarios.map((funcionario, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-700 to-red-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{funcionario.nome.split(' ')[0][0]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-orange-100">{funcionario.nome}</p>
                              <p className="text-sm text-orange-300">
                                Tables: {funcionario.mesas.length > 0 ? funcionario.mesas.join(', ') : 'None'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-orange-100">R$ {funcionario.vendas}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              funcionario.status === 'active' 
                                ? 'bg-green-600 text-green-100' 
                                : 'bg-yellow-600 text-yellow-100'
                            }`}>
                              {funcionario.status === 'active' ? 'Active' : 'Break'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kitchen Orders */}
                <div className="bg-orange-800 rounded-xl border border-orange-700 shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4 raleway">Kitchen Orders</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pedidosCozinha.map((pedido, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        pedido.status === 'ready' ? 'bg-green-700 border-green-500' :
                        pedido.status === 'preparing' ? 'bg-orange-700 border-orange-500' :
                        'bg-blue-700 border-blue-500'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-orange-100">Table {pedido.mesa}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            pedido.status === 'ready' ? 'bg-green-600 text-green-100' :
                            pedido.status === 'preparing' ? 'bg-orange-600 text-orange-100' :
                            'bg-blue-600 text-blue-100'
                          }`}>
                            {pedido.status === 'ready' ? 'Ready' : pedido.status === 'preparing' ? 'Preparing' : 'Pending'}
                          </span>
                        </div>
                        <p className="text-sm text-orange-100 font-medium">{pedido.item}</p>
                        <p className="text-xs text-orange-300">Qty: {pedido.quantidade}</p>
                        <p className="text-xs text-orange-300 mt-1">
                          <i className="fas fa-clock mr-1"></i>
                          {pedido.tempo}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'mesas' && (
              <div>
                <h2 className="text-2xl font-bold text-orange-100 mb-6 raleway">Table Management</h2>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-orange-800 p-4 rounded-xl border border-orange-700">
                    <h3 className="font-semibold text-orange-100 mb-2">Occupy Table</h3>
                    <div className="flex space-x-2">
                      <select 
                        className="flex-1 px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            setMesas(prev => prev.map(m => 
                              m.numero === parseInt(e.target.value) 
                                ? { ...m, status: 'occupied', pedido: Math.floor(Math.random() * 200) + 50, garcom: funcionarios[Math.floor(Math.random() * funcionarios.length)].nome.split(' ')[0] }
                                : m
                            ));
                          }
                        }}
                        data-testid="select-ocupar-mesa"
                      >
                        <option value="">Select table...</option>
                        {mesas.filter(m => m.status === 'available').map(mesa => (
                          <option key={mesa.numero} value={mesa.numero}>Table {mesa.numero}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-orange-800 p-4 rounded-xl border border-orange-700">
                    <h3 className="font-semibold text-orange-100 mb-2">Free Table</h3>
                    <div className="flex space-x-2">
                      <select 
                        className="flex-1 px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            setMesas(prev => prev.map(m => 
                              m.numero === parseInt(e.target.value) 
                                ? { ...m, status: 'available', pedido: 0, garcom: '-', tempo: '-', pessoas: 0 }
                                : m
                            ));
                          }
                        }}
                        data-testid="select-liberar-mesa"
                      >
                        <option value="">Select table...</option>
                        {mesas.filter(m => m.status === 'occupied' || m.status === 'billing').map(mesa => (
                          <option key={mesa.numero} value={mesa.numero}>Table {mesa.numero}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-orange-800 p-4 rounded-xl border border-orange-700">
                    <h3 className="font-semibold text-orange-100 mb-2">Reserve Table</h3>
                    <div className="flex space-x-2">
                      <select 
                        className="flex-1 px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                        value=""
                        onChange={(e) => {
                          if (e.target.value) {
                            setMesas(prev => prev.map(m => 
                              m.numero === parseInt(e.target.value) 
                                ? { ...m, status: 'reserved', garcom: funcionarios[Math.floor(Math.random() * funcionarios.length)].nome.split(' ')[0], tempo: '20:00', pessoas: Math.floor(Math.random() * 4) + 2 }
                                : m
                            ));
                          }
                        }}
                        data-testid="select-reservar-mesa"
                      >
                        <option value="">Select table...</option>
                        {mesas.filter(m => m.status === 'available').map(mesa => (
                          <option key={mesa.numero} value={mesa.numero}>Table {mesa.numero}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Grid de Mesas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mesas.map((mesa) => (
                    <div key={mesa.numero} className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                      mesa.status === 'occupied' ? 'bg-red-700 border-red-600' :
                      mesa.status === 'available' ? 'bg-green-700 border-green-600' :
                      mesa.status === 'reserved' ? 'bg-blue-700 border-blue-600' :
                      'bg-yellow-700 border-yellow-600'
                    }`} data-testid={`card-mesa-${mesa.numero}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-orange-100">Table {mesa.numero}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          mesa.status === 'occupied' ? 'bg-red-600 text-red-100' :
                          mesa.status === 'available' ? 'bg-green-600 text-green-100' :
                          mesa.status === 'reserved' ? 'bg-blue-600 text-blue-100' :
                          'bg-yellow-600 text-yellow-100'
                        }`}>
                          {mesa.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-orange-300">
                        <p><strong>Garçom:</strong> {mesa.garcom}</p>
                        <p><strong>Pedido:</strong> {mesa.pedido ? `R$ ${mesa.pedido}` : '-'}</p>
                        <p><strong>Tempo:</strong> {mesa.tempo}</p>
                        <p><strong>Pessoas:</strong> {mesa.pessoas || '-'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedModule === 'cozinha' && (
              <div>
                <h2 className="text-2xl font-bold text-amber-100 mb-6 raleway">Dashboard da Cozinha</h2>
                
                {/* Novo Pedido */}
                <div className="bg-orange-800 rounded-xl border border-orange-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4">Adicionar Novo Pedido</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select 
                      value={novoPedido.mesa}
                      onChange={(e) => setNovoPedido(prev => ({ ...prev, mesa: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      data-testid="select-mesa-pedido"
                    >
                      <option value="">Selecionar mesa...</option>
                      {mesas.filter(m => m.status === 'occupied').map(mesa => (
                        <option key={mesa.numero} value={mesa.numero}>Table {mesa.numero}</option>
                      ))}
                    </select>
                    <select 
                      value={novoPedido.prato}
                      onChange={(e) => setNovoPedido(prev => ({ ...prev, prato: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      data-testid="select-prato-pedido"
                    >
                      <option value="">Selecionar prato...</option>
                      {pratosPopulares.filter(p => p.disponivel).map(prato => (
                        <option key={prato.nome} value={prato.nome}>{prato.nome}</option>
                      ))}
                    </select>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={novoPedido.quantidade}
                      onChange={(e) => setNovoPedido(prev => ({ ...prev, quantidade: parseInt(e.target.value) }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      placeholder="Quantidade"
                      data-testid="input-quantidade-pedido"
                    />
                    <button 
                      onClick={() => {
                        if (novoPedido.mesa && novoPedido.prato) {
                          const novoId = Math.max(...pedidosCozinha.map(p => p.id)) + 1;
                          setPedidosCozinha(prev => [...prev, {
                            id: novoId,
                            mesa: parseInt(novoPedido.mesa),
                            item: novoPedido.prato,
                            quantidade: novoPedido.quantidade,
                            tempo: `${Math.floor(Math.random() * 15) + 5}min`,
                            status: 'pendente',
                            prioridade: 'normal'
                          }]);
                          setNovoPedido({ mesa: '', prato: '', quantidade: 1 });
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
                      data-testid="button-adicionar-pedido"
                    >
                      <i className="fas fa-plus mr-2"></i>Adicionar
                    </button>
                  </div>
                </div>

                {/* Status da Cozinha */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clock text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{pedidosCozinha.filter(p => p.status === 'pendente').length}</h3>
                    <p className="text-orange-300 text-sm">Pedidos Pendentes</p>
                  </div>
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-fire text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{pedidosCozinha.filter(p => p.status === 'preparando').length}</h3>
                    <p className="text-orange-300 text-sm">Em Preparo</p>
                  </div>
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-check text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{pedidosCozinha.filter(p => p.status === 'pronto').length}</h3>
                    <p className="text-orange-300 text-sm">Prontos</p>
                  </div>
                </div>

                {/* Lista de Pedidos */}
                <div className="bg-orange-800 rounded-xl border border-orange-700 p-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4">Fila de Pedidos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pedidosCozinha.map((pedido) => (
                      <div key={pedido.id} className={`p-4 rounded-lg border-l-4 ${
                        pedido.status === 'pronto' ? 'bg-green-700 border-green-500' :
                        pedido.status === 'preparando' ? 'bg-orange-700 border-orange-500' :
                        'bg-blue-700 border-blue-500'
                      }`} data-testid={`card-pedido-${pedido.id}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-orange-100">Table {pedido.mesa}</span>
                          <select 
                            value={pedido.status}
                            onChange={(e) => {
                              setPedidosCozinha(prev => prev.map(p => 
                                p.id === pedido.id ? { ...p, status: e.target.value as any } : p
                              ));
                            }}
                            className={`text-xs px-2 py-1 rounded-full border-0 ${
                              pedido.status === 'pronto' ? 'bg-green-600 text-green-100' :
                              pedido.status === 'preparando' ? 'bg-orange-600 text-orange-100' :
                              'bg-blue-600 text-blue-100'
                            }`}
                            data-testid={`select-status-${pedido.id}`}
                          >
                            <option value="pendente">Pendente</option>
                            <option value="preparando">Preparando</option>
                            <option value="pronto">Pronto</option>
                          </select>
                        </div>
                        <p className="text-sm text-orange-100 font-medium">{pedido.item}</p>
                        <p className="text-xs text-orange-300">Qty: {pedido.quantidade}</p>
                        <p className="text-xs text-orange-300 mt-1">
                          <i className="fas fa-clock mr-1"></i>
                          {pedido.tempo}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'cardapio' && (
              <div>
                <h2 className="text-2xl font-bold text-orange-100 mb-6 raleway">Gestão do Cardápio</h2>
                
                {/* Adicionar Novo Item */}
                <div className="bg-orange-800 rounded-xl border border-orange-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4">Adicionar Novo Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <input 
                      type="text" 
                      value={novoItemCardapio.nome}
                      onChange={(e) => setNovoItemCardapio(prev => ({ ...prev, nome: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      placeholder="Nome do prato"
                      data-testid="input-nome-prato"
                    />
                    <select 
                      value={novoItemCardapio.categoria}
                      onChange={(e) => setNovoItemCardapio(prev => ({ ...prev, categoria: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      data-testid="select-categoria-prato"
                    >
                      <option value="Entrada">Entrada</option>
                      <option value="Prato Principal">Prato Principal</option>
                      <option value="Sobremesa">Sobremesa</option>
                      <option value="Bebida">Bebida</option>
                    </select>
                    <input 
                      type="number" 
                      step="0.01"
                      value={novoItemCardapio.valor}
                      onChange={(e) => setNovoItemCardapio(prev => ({ ...prev, valor: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      placeholder="Preço (R$)"
                      data-testid="input-valor-prato"
                    />
                    <input 
                      type="url" 
                      value={novoItemCardapio.imagem}
                      onChange={(e) => setNovoItemCardapio(prev => ({ ...prev, imagem: e.target.value }))}
                      className="px-3 py-2 bg-orange-700 text-orange-100 rounded-lg border border-orange-600"
                      placeholder="URL da imagem"
                      data-testid="input-imagem-prato"
                    />
                    <label className="flex items-center space-x-2 text-orange-100">
                      <input 
                        type="checkbox" 
                        checked={novoItemCardapio.disponivel}
                        onChange={(e) => setNovoItemCardapio(prev => ({ ...prev, disponivel: e.target.checked }))}
                        className="rounded"
                        data-testid="checkbox-disponivel-prato"
                      />
                      <span>Available</span>
                    </label>
                    <button 
                      onClick={() => {
                        if (novoItemCardapio.nome && novoItemCardapio.valor) {
                          const imagemUrl = novoItemCardapio.imagem.trim();
                          const imagemValida = !imagemUrl || /^https?:\/\//.test(imagemUrl);
                          
                          if (imagemValida) {
                            setPratosPopulares(prev => [...prev, {
                              nome: novoItemCardapio.nome,
                              categoria: novoItemCardapio.categoria,
                              vendas: 0,
                              valor: parseFloat(novoItemCardapio.valor),
                              disponivel: novoItemCardapio.disponivel,
                              estoque: novoItemCardapio.estoque,
                              imagem: imagemUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop'
                            }]);
                            setNovoItemCardapio({ nome: '', categoria: 'Entrada', valor: '', disponivel: true, estoque: 10, imagem: '' });
                          } else {
                            alert('Por favor, insira uma URL válida para a imagem (deve começar com http:// ou https://)');
                          }
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
                      data-testid="button-adicionar-item"
                    >
                      <i className="fas fa-plus mr-2"></i>Adicionar
                    </button>
                  </div>
                </div>

                {/* Estatísticas do Cardápio */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-utensils text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{pratosPopulares.length}</h3>
                    <p className="text-orange-300 text-sm">Total de Pratos</p>
                  </div>
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-check-circle text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{pratosPopulares.filter(p => p.disponivel).length}</h3>
                    <p className="text-orange-300 text-sm">Disponíveis</p>
                  </div>
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-star text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">{Math.max(...pratosPopulares.map(p => p.vendas))}</h3>
                    <p className="text-orange-300 text-sm">Mais Vendido</p>
                  </div>
                  <div className="bg-orange-800 p-6 rounded-xl border border-orange-700">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                      <i className="fas fa-dollar-sign text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-orange-100 mb-1">R$ {(pratosPopulares.reduce((sum, p) => sum + p.valor, 0) / pratosPopulares.length).toFixed(0)}</h3>
                    <p className="text-orange-300 text-sm">Preço Médio</p>
                  </div>
                </div>

                {/* Lista do Cardápio */}
                <div className="bg-orange-800 rounded-xl border border-orange-700 p-6">
                  <h3 className="text-lg font-semibold text-orange-100 mb-4">Itens do Cardápio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pratosPopulares.map((prato, index) => (
                      <div key={index} className="bg-orange-700 rounded-lg overflow-hidden shadow-lg" data-testid={`card-prato-${index}`}>
                        <div className="h-40 overflow-hidden">
                          {(() => {
                            const valid = /^https?:\/\//.test(prato.imagem||'');
                            const safeSrc = valid ? prato.imagem : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
                            return (
                              <img 
                                src={safeSrc} 
                                alt={`Imagem de ${prato.nome}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 border border-orange-600"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
                                }}
                                data-testid={`img-prato-${index}`}
                              />
                            );
                          })()} 
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-orange-100">{prato.nome}</h4>
                            <button 
                              onClick={() => {
                                setPratosPopulares(prev => prev.map((p, i) => 
                                  i === index ? { ...p, disponivel: !p.disponivel } : p
                                ));
                              }}
                              className={`text-xs px-2 py-1 rounded-full ${
                                prato.disponivel ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                              }`}
                              data-testid={`button-toggle-${index}`}
                            >
                              {prato.disponivel ? 'Available' : 'Unavailable'}
                            </button>
                          </div>
                          <p className="text-sm text-orange-300 mb-2">{prato.categoria}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-orange-100">R$ {prato.valor.toFixed(2).replace('.', ',')}</span>
                            <span className="text-sm text-orange-400">{prato.vendas} vendas</span>
                          </div>
                          <div className="mt-2 text-xs text-orange-400">
                            <i className="fas fa-box mr-1"></i>
                            Stock: {prato.estoque}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
          </div>
        )}

        {selectedModule === 'pedidos' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 raleway">Gestão de Pedidos</h2>
            <p className="text-gray-300">Controle de pedidos em tempo real</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Pedidos da Cozinha</h3>
              <div className="space-y-4">
                {pedidosCozinha.map((pedido) => (
                  <div key={pedido.id} className={`p-4 rounded-lg border ${
                    pedido.status === 'pronto' ? 'bg-green-950/50 border-green-800' :
                    pedido.status === 'preparando' ? 'bg-orange-950/50 border-orange-800' :
                    'bg-gray-950/50 border-gray-800'
                  }`} data-testid={`pedido-${pedido.id}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">Table {pedido.mesa}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        pedido.status === 'pronto' ? 'bg-green-600 text-green-100' :
                        pedido.status === 'preparando' ? 'bg-orange-600 text-orange-100' :
                        'bg-gray-600 text-gray-100'
                      }`}>
                        {pedido.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{pedido.item} x{pedido.quantidade}</p>
                    <p className="text-orange-400 text-sm">Tempo: {pedido.tempo}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Novo Pedido</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Mesa</label>
                    <select 
                      value={novoPedido.mesa}
                      onChange={(e) => setNovoPedido(prev => ({ ...prev, mesa: e.target.value }))}
                      className="w-full px-3 py-2 bg-orange-900/50 border border-orange-800 rounded-lg text-white"
                      data-testid="select-mesa-pedido"
                    >
                      <option value="">Selecione a mesa</option>
                      {mesas.filter(m => m.status === 'occupied').map((mesa) => (
                        <option key={mesa.numero} value={mesa.numero}>Table {mesa.numero}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Quantidade</label>
                    <input
                      type="number"
                      value={novoPedido.quantidade}
                      onChange={(e) => setNovoPedido(prev => ({ ...prev, quantidade: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-orange-900/50 border border-orange-800 rounded-lg text-white"
                      min="1"
                      data-testid="input-quantidade-pedido"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prato</label>
                  <select
                    value={novoPedido.prato}
                    onChange={(e) => setNovoPedido(prev => ({ ...prev, prato: e.target.value }))}
                    className="w-full px-3 py-2 bg-orange-900/50 border border-orange-800 rounded-lg text-white"
                    data-testid="select-prato-pedido"
                  >
                    <option value="">Selecione o prato</option>
                    {pratosPopulares.filter(p => p.disponivel).map((prato) => (
                      <option key={prato.nome} value={prato.nome}>{prato.nome} - R$ {prato.valor.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => {
                    if (novoPedido.mesa && novoPedido.prato) {
                      const novoPedidoItem = {
                        id: Math.max(...pedidosCozinha.map(p => p.id)) + 1,
                        mesa: parseInt(novoPedido.mesa),
                        item: novoPedido.prato,
                        quantidade: novoPedido.quantidade,
                        tempo: '0min',
                        status: 'pending' as const,
                        prioridade: 'normal' as const
                      };
                      setPedidosCozinha(prev => [...prev, novoPedidoItem]);
                      setNovoPedido({ mesa: '', prato: '', quantidade: 1 });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-700 hover:to-orange-600 transition-all"
                  data-testid="button-criar-pedido"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedModule === 'cardapio' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 raleway">Menu Management</h2>
            <p className="text-gray-300">Dish control and availability</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pratosPopulares.map((prato, index) => (
              <div key={index} className="bg-orange-950/80 rounded-xl border border-orange-900 shadow-lg overflow-hidden" data-testid={`card-prato-${index}`}>
                <div className="h-48 bg-gradient-to-br from-orange-900 to-red-900 relative overflow-hidden">
                  {(() => {
                    const safeSrc = prato.imagem || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
                    return (
                      <img 
                        src={safeSrc} 
                        alt={`Imagem de ${prato.nome}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 border border-orange-600"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop';
                        }}
                        data-testid={`img-prato-${index}`}
                      />
                    );
                  })()} 
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{prato.nome}</h4>
                    <button 
                      onClick={() => {
                        setPratosPopulares(prev => prev.map((p, i) => 
                          i === index ? { ...p, disponivel: !p.disponivel } : p
                        ));
                      }}
                      className={`text-xs px-2 py-1 rounded-full ${
                        prato.disponivel ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                      }`}
                      data-testid={`button-toggle-${index}`}
                    >
                      {prato.disponivel ? 'Available' : 'Unavailable'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{prato.categoria}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">R$ {prato.valor.toFixed(2).replace('.', ',')}</span>
                    <span className="text-sm text-orange-400">{prato.vendas} vendas</span>
                  </div>
                  <div className="mt-2 text-xs text-orange-400">
                    <i className="fas fa-box mr-1"></i>
                    Stock: {prato.estoque}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModule === 'mesas' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 raleway">Table Management</h2>
            <p className="text-gray-300">Gestão em tempo real das mesas do restaurante</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mesas.map((mesa) => (
              <div key={mesa.numero} className={`p-6 rounded-xl border shadow-lg transition-all hover:scale-105 cursor-pointer ${
                mesa.status === 'occupied' ? 'bg-red-950/80 border-red-900' :
                mesa.status === 'available' ? 'bg-green-950/80 border-green-900' :
                mesa.status === 'reserved' ? 'bg-blue-950/80 border-blue-900' :
                'bg-yellow-950/80 border-yellow-900'
              }`} data-testid={`mesa-card-${mesa.numero}`}>
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${
                    mesa.status === 'occupied' ? 'bg-red-600 text-white' :
                    mesa.status === 'available' ? 'bg-green-600 text-white' :
                    mesa.status === 'reserved' ? 'bg-blue-600 text-white' :
                    'bg-yellow-600 text-white'
                  }`}>
                    {mesa.numero}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Table {mesa.numero}</h3>
                  <p className="text-sm text-gray-300 mb-2 capitalize">{mesa.status}</p>
                  {mesa.status === 'occupied' && (
                    <>
                      <p className="text-sm text-gray-400">Server: {mesa.garcom}</p>
                      <p className="text-sm text-orange-400">R$ {mesa.pedido}</p>
                      <p className="text-xs text-gray-400">{mesa.tempo}</p>
                      <p className="text-xs text-gray-400">{mesa.pessoas} guests</p>
                    </>
                  )}
                  {mesa.status === 'reserved' && (
                    <>
                      <p className="text-sm text-gray-400">Server: {mesa.garcom}</p>
                      <p className="text-sm text-blue-400">Time: {mesa.tempo}</p>
                      <p className="text-xs text-gray-400">{mesa.pessoas} guests</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedModule === 'relatorios' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 raleway">Reports & Analytics</h2>
            <p className="text-gray-300">Performance and sales metrics</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Team Performance</h3>
              <div className="space-y-4">
                {funcionarios.map((funcionario, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-900/50 rounded-lg" data-testid={`funcionario-${index}`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{funcionario.nome[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{funcionario.nome}</p>
                        <p className="text-sm text-gray-400">{funcionario.cargo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">R$ {funcionario.vendas}</p>
                      <p className="text-xs text-orange-400">Commission: R$ {funcionario.comissao.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{funcionario.horasTrabalhadas}h trabalhadas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-orange-950/80 rounded-xl border border-orange-900 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 raleway">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pratosCategoriaData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pratosCategoriaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#C2410C', border: '1px solid #EA580C', borderRadius: '8px' }}
                    labelStyle={{ color: '#FED7AA' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      </>
    </AppShell>
  );
}