import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import AppShell from "@/components/layout/AppShell";

interface Sale {
  id: string;
  cliente: string;
  valor: number;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  data: string;
  produto: string;
}

interface Product {
  id: string;
  nome: string;
  categoria: string;
  estoque: number;
  minimo: number;
  preco: number;
  custo: number;
}

interface Transaction {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
}

export default function DemoERP() {
  const [selectedModule, setSelectedModule] = useState('dashboard');
  
  // Estados para dados dinâmicos
  const [sales, setSales] = useState<Sale[]>([
    { id: "#12847", cliente: "TechCorp Ltda", valor: 15450, status: "Pago", data: "11/11", produto: "Notebook Dell XPS" },
    { id: "#12846", cliente: "Innovation Hub", valor: 8920, status: "Pendente", data: "10/11", produto: "Mouse Logitech MX" },
    { id: "#12845", cliente: "Digital Solutions", valor: 22100, status: "Pago", data: "09/11", produto: "Monitor LG 24\"" },
    { id: "#12844", cliente: "StartupXYZ", valor: 5670, status: "Atrasado", data: "08/11", produto: "Teclado Mecânico" }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: "1", nome: "Notebook Dell XPS", categoria: "Hardware", estoque: 15, minimo: 10, preco: 4500, custo: 3200 },
    { id: "2", nome: "Mouse Logitech MX", categoria: "Periféricos", estoque: 8, minimo: 15, preco: 350, custo: 180 },
    { id: "3", nome: "Monitor LG 24\"", categoria: "Monitores", estoque: 12, minimo: 8, preco: 800, custo: 520 },
    { id: "4", nome: "Teclado Mecânico", categoria: "Periféricos", estoque: 25, minimo: 15, preco: 450, custo: 250 },
    { id: "5", nome: "SSD Samsung 1TB", categoria: "Hardware", estoque: 6, minimo: 12, preco: 600, custo: 380 }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", tipo: "receita", descricao: "Venda - TechCorp", valor: 15450, data: "11/11", categoria: "Vendas" },
    { id: "2", tipo: "despesa", descricao: "Fornecedor - Hardware", valor: 8900, data: "10/11", categoria: "Compras" },
    { id: "3", tipo: "receita", descricao: "Venda - Digital Solutions", valor: 22100, data: "09/11", categoria: "Vendas" },
    { id: "4", tipo: "despesa", descricao: "Aluguel - Escritório", valor: 3500, data: "08/11", categoria: "Operacional" }
  ]);

  // Form states
  const [newSale, setNewSale] = useState({ cliente: '', valor: '', produto: '' });
  const [newProduct, setNewProduct] = useState({ nome: '', categoria: '', estoque: '', minimo: '', preco: '', custo: '' });
  const [newTransaction, setNewTransaction] = useState({ tipo: 'receita' as 'receita' | 'despesa', descricao: '', valor: '', categoria: '' });

  // Calculated dashboard data
  const totalSales = sales.filter(s => s.status === 'Pago').reduce((sum, sale) => sum + sale.valor, 0);
  const pendingSales = sales.filter(s => s.status === 'Pendente').length;
  const totalRevenue = transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0);
  const totalExpenses = transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0);
  const cashFlow = totalRevenue - totalExpenses;
  const stockValue = products.reduce((sum, p) => sum + (p.estoque * p.custo), 0);
  const stockAlerts = products.filter(p => p.estoque <= p.minimo);
  
  // Chart data
  const salesChartData = sales.slice(0, 7).reverse().map((sale, index) => ({
    day: `Dia ${index + 1}`,
    vendas: sales.slice(0, index + 1).filter(s => s.status === 'Pago').reduce((sum, s) => sum + s.valor, 0) / 1000
  }));

  const categoryData = products.reduce((acc, product) => {
    const category = acc.find(c => c.name === product.categoria);
    if (category) {
      category.value += product.estoque * product.preco;
    } else {
      acc.push({ name: product.categoria, value: product.estoque * product.preco });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const revenueData = [
    { mes: 'Jul', receitas: totalRevenue * 0.8 / 1000, despesas: totalExpenses * 0.7 / 1000 },
    { mes: 'Ago', receitas: totalRevenue * 0.9 / 1000, despesas: totalExpenses * 0.8 / 1000 },
    { mes: 'Set', receitas: totalRevenue * 0.95 / 1000, despesas: totalExpenses * 0.9 / 1000 },
    { mes: 'Out', receitas: totalRevenue / 1000, despesas: totalExpenses / 1000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const addSale = () => {
    if (newSale.cliente && newSale.valor && newSale.produto) {
      const sale: Sale = {
        id: `#${12848 + sales.length}`,
        cliente: newSale.cliente,
        valor: parseFloat(newSale.valor),
        status: 'Pago',
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        produto: newSale.produto
      };
      setSales([sale, ...sales]);
      setNewSale({ cliente: '', valor: '', produto: '' });
    }
  };

  const addProduct = () => {
    if (newProduct.nome && newProduct.categoria && newProduct.estoque && newProduct.preco) {
      const product: Product = {
        id: String(products.length + 1),
        nome: newProduct.nome,
        categoria: newProduct.categoria,
        estoque: parseInt(newProduct.estoque),
        minimo: parseInt(newProduct.minimo) || 10,
        preco: parseFloat(newProduct.preco),
        custo: parseFloat(newProduct.custo) || parseFloat(newProduct.preco) * 0.7
      };
      setProducts([...products, product]);
      setNewProduct({ nome: '', categoria: '', estoque: '', minimo: '', preco: '', custo: '' });
    }
  };

  const addTransaction = () => {
    if (newTransaction.descricao && newTransaction.valor && newTransaction.categoria) {
      const transaction: Transaction = {
        id: String(transactions.length + 1),
        tipo: newTransaction.tipo,
        descricao: newTransaction.descricao,
        valor: parseFloat(newTransaction.valor),
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        categoria: newTransaction.categoria
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ tipo: 'receita', descricao: '', valor: '', categoria: '' });
    }
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, estoque: Math.max(0, newStock) } : p
    ));
  };

  // Create navigation items
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'vendas',
      label: 'Vendas',
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('vendas'),
      isActive: selectedModule === 'vendas'
    },
    {
      id: 'estoque',
      label: 'Estoque',
      icon: 'fas fa-boxes',
      onClick: () => setSelectedModule('estoque'),
      isActive: selectedModule === 'estoque'
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: 'fas fa-calculator',
      onClick: () => setSelectedModule('financeiro'),
      isActive: selectedModule === 'financeiro'
    }
  ];

  return (
    <AppShell
      title="ERPSystem Pro - TechSolutions"
      subtitle="Enterprise Edition"
      systemIcon="fas fa-chart-line"
      systemColor="from-blue-600 to-blue-500"
      backHref="/sistema/erp"
      statusBadge="Sistema Empresarial"
      navItems={navItems}
      currentUser="Admin Demo"
    >
            
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 raleway">Dashboard Executivo</h2>
                  <p className="text-slate-600 dark:text-slate-400">Visão geral em tempo real do desempenho da empresa</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-green-600 dark:text-green-400"></i>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">+15.3%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-vendas-total">
                      R$ {totalSales.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Vendas do Mês</p>
                    <div className="mt-3 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">85% da meta</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-shopping-cart text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">+8.7%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-pedidos-total">
                      {sales.length}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Pedidos Processados</p>
                    <p className="text-orange-600 dark:text-orange-400 text-xs mt-2">
                      <i className="fas fa-clock mr-1"></i>
                      {pendingSales} pendentes
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-boxes text-purple-600 dark:text-purple-400"></i>
                      </div>
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">{stockAlerts.length} alertas</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-estoque-valor">
                      R$ {stockValue.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Valor em Estoque</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">{products.length} produtos</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-wallet text-emerald-600 dark:text-emerald-400"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-saldo-caixa">
                      R$ {cashFlow.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Saldo em Caixa</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-green-600 dark:text-green-400">+R$ {totalRevenue.toLocaleString('pt-BR')}</span>
                      <span className="text-red-600 dark:text-red-400">-R$ {totalExpenses.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Evolução de Vendas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={salesChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`R$ ${value}k`, 'Vendas']} />
                        <Area type="monotone" dataKey="vendas" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Receitas vs Despesas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`R$ ${value}k`]} />
                        <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
                        <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Data and Category Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Vendas Recentes</h3>
                    <div className="space-y-4">
                      {sales.slice(0, 4).map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg" data-testid={`row-sale-${sale.id}`}>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{sale.cliente}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{sale.id} • {sale.data}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">R$ {sale.valor.toLocaleString('pt-BR')}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              sale.status === 'Pago' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              sale.status === 'Pendente' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                              'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                            }`}>
                              {sale.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Alertas de Estoque</h3>
                    <div className="space-y-4">
                      {stockAlerts.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg" data-testid={`row-alert-${index}`}>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{item.nome}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.categoria}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{item.estoque} unidades</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.estoque <= item.minimo / 2 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                              'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {item.estoque <= item.minimo / 2 ? 'Crítico' : 'Baixo'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Estoque por Categoria</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'vendas' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Módulo de Vendas</h2>
                
                {/* Add New Sale Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Nova Venda</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do Cliente"
                      value={newSale.cliente}
                      onChange={(e) => setNewSale({...newSale, cliente: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-cliente"
                    />
                    <input
                      type="number"
                      placeholder="Valor (R$)"
                      value={newSale.valor}
                      onChange={(e) => setNewSale({...newSale, valor: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-valor"
                    />
                    <input
                      type="text"
                      placeholder="Produto Vendido"
                      value={newSale.produto}
                      onChange={(e) => setNewSale({...newSale, produto: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-produto"
                    />
                    <button
                      onClick={addSale}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      data-testid="button-add-sale"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar Venda
                    </button>
                  </div>
                </div>

                {/* Sales List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Histórico de Vendas</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">ID</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Cliente</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Produto</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Valor</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Status</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.map((sale) => (
                          <tr key={sale.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-sale-detail-${sale.id}`}>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{sale.id}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{sale.cliente}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{sale.produto}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-semibold">R$ {sale.valor.toLocaleString('pt-BR')}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === 'Pago' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                sale.status === 'Pendente' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                                'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                              }`}>
                                {sale.status}
                              </span>
                            </td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{sale.data}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'estoque' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Controle de Estoque</h2>
                
                {/* Add New Product Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Novo Produto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do Produto"
                      value={newProduct.nome}
                      onChange={(e) => setNewProduct({...newProduct, nome: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-nome"
                    />
                    <input
                      type="text"
                      placeholder="Categoria"
                      value={newProduct.categoria}
                      onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-categoria"
                    />
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={newProduct.estoque}
                      onChange={(e) => setNewProduct({...newProduct, estoque: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-estoque"
                    />
                    <input
                      type="number"
                      placeholder="Mínimo"
                      value={newProduct.minimo}
                      onChange={(e) => setNewProduct({...newProduct, minimo: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-minimo"
                    />
                    <input
                      type="number"
                      placeholder="Preço (R$)"
                      value={newProduct.preco}
                      onChange={(e) => setNewProduct({...newProduct, preco: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-preco"
                    />
                    <button
                      onClick={addProduct}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      data-testid="button-add-product"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* Products List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Produtos em Estoque</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Produto</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Categoria</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Estoque</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Mínimo</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Preço</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Status</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-product-${product.id}`}>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-medium">{product.nome}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{product.categoria}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-semibold">{product.estoque}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{product.minimo}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">R$ {product.preco.toLocaleString('pt-BR')}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                product.estoque <= product.minimo / 2 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                                product.estoque <= product.minimo ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                                'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              }`}>
                                {product.estoque <= product.minimo / 2 ? 'Crítico' : product.estoque <= product.minimo ? 'Baixo' : 'Normal'}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateProductStock(product.id, product.estoque - 1)}
                                  className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/40"
                                  data-testid={`button-decrease-${product.id}`}
                                >
                                  <i className="fas fa-minus text-xs"></i>
                                </button>
                                <button
                                  onClick={() => updateProductStock(product.id, product.estoque + 1)}
                                  className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/40"
                                  data-testid={`button-increase-${product.id}`}
                                >
                                  <i className="fas fa-plus text-xs"></i>
                                </button>
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

            {selectedModule === 'financeiro' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Módulo Financeiro</h2>
                
                {/* Add New Transaction Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Nova Transação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <select
                      value={newTransaction.tipo}
                      onChange={(e) => setNewTransaction({...newTransaction, tipo: e.target.value as 'receita' | 'despesa'})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="select-tipo"
                    >
                      <option value="receita">Receita</option>
                      <option value="despesa">Despesa</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={newTransaction.descricao}
                      onChange={(e) => setNewTransaction({...newTransaction, descricao: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-descricao"
                    />
                    <input
                      type="number"
                      placeholder="Valor (R$)"
                      value={newTransaction.valor}
                      onChange={(e) => setNewTransaction({...newTransaction, valor: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-transaction-valor"
                    />
                    <input
                      type="text"
                      placeholder="Categoria"
                      value={newTransaction.categoria}
                      onChange={(e) => setNewTransaction({...newTransaction, categoria: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-transaction-categoria"
                    />
                    <button
                      onClick={addTransaction}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      data-testid="button-add-transaction"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-up text-green-600 dark:text-green-400"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total Receitas</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-total-receitas">
                          R$ {totalRevenue.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-down text-red-600 dark:text-red-400"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total Despesas</h3>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400" data-testid="text-total-despesas">
                          R$ {totalExpenses.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-balance-scale text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Saldo Líquido</h3>
                        <p className={`text-2xl font-bold ${cashFlow >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} data-testid="text-saldo-liquido">
                          R$ {cashFlow.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Histórico de Transações</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Tipo</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Descrição</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Categoria</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Valor</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-transaction-${transaction.id}`}>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.tipo === 'receita' 
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                              }`}>
                                {transaction.tipo === 'receita' ? 'Receita' : 'Despesa'}
                              </span>
                            </td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{transaction.descricao}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{transaction.categoria}</td>
                            <td className={`py-3 font-semibold ${
                              transaction.tipo === 'receita' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {transaction.tipo === 'receita' ? '+' : '-'}R$ {transaction.valor.toLocaleString('pt-BR')}
                            </td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{transaction.data}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
    </AppShell>
  );
}