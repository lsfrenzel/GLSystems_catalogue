import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import AppShell from "@/components/layout/AppShell";
import { useLanguage } from "@/contexts/LanguageContext";

interface Sale {
  id: string;
  cliente: string;
  valor: number;
  status: 'Paid' | 'Pending' | 'Overdue';
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
  tipo: 'revenue' | 'expense';
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
}

export default function DemoERP() {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState('dashboard');
  
  // States for dynamic data
  const [sales, setSales] = useState<Sale[]>([
    { id: "#12847", cliente: "TechCorp Ltd", valor: 15450, status: "Paid", data: "11/11", produto: "Dell XPS Notebook" },
    { id: "#12846", cliente: "Innovation Hub", valor: 8920, status: "Pending", data: "10/11", produto: "Logitech MX Mouse" },
    { id: "#12845", cliente: "Digital Solutions", valor: 22100, status: "Paid", data: "09/11", produto: "LG 24\" Monitor" },
    { id: "#12844", cliente: "StartupXYZ", valor: 5670, status: "Overdue", data: "08/11", produto: "Mechanical Keyboard" }
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: "1", nome: "Dell XPS Notebook", categoria: "Hardware", estoque: 15, minimo: 10, preco: 4500, custo: 3200 },
    { id: "2", nome: "Logitech MX Mouse", categoria: "Peripherals", estoque: 8, minimo: 15, preco: 350, custo: 180 },
    { id: "3", nome: "LG 24\" Monitor", categoria: "Monitors", estoque: 12, minimo: 8, preco: 800, custo: 520 },
    { id: "4", nome: "Mechanical Keyboard", categoria: "Peripherals", estoque: 25, minimo: 15, preco: 450, custo: 250 },
    { id: "5", nome: "Samsung 1TB SSD", categoria: "Hardware", estoque: 6, minimo: 12, preco: 600, custo: 380 }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", tipo: "revenue", descricao: "Sale - TechCorp", valor: 15450, data: "11/11", categoria: "Sales" },
    { id: "2", tipo: "expense", descricao: "Supplier - Hardware", valor: 8900, data: "10/11", categoria: "Purchases" },
    { id: "3", tipo: "revenue", descricao: "Sale - Digital Solutions", valor: 22100, data: "09/11", categoria: "Sales" },
    { id: "4", tipo: "expense", descricao: "Rent - Office", valor: 3500, data: "08/11", categoria: "Operational" }
  ]);

  // Form states
  const [newSale, setNewSale] = useState({ cliente: '', valor: '', produto: '' });
  const [newProduct, setNewProduct] = useState({ nome: '', categoria: '', estoque: '', minimo: '', preco: '', custo: '' });
  const [newTransaction, setNewTransaction] = useState({ tipo: 'revenue' as 'revenue' | 'expense', descricao: '', valor: '', categoria: '' });

  // Calculated dashboard data
  const totalSales = sales.filter(s => s.status === 'Paid').reduce((sum, sale) => sum + sale.valor, 0);
  const pendingSales = sales.filter(s => s.status === 'Pending').length;
  const totalRevenue = transactions.filter(t => t.tipo === 'revenue').reduce((sum, t) => sum + t.valor, 0);
  const totalExpenses = transactions.filter(t => t.tipo === 'expense').reduce((sum, t) => sum + t.valor, 0);
  const cashFlow = totalRevenue - totalExpenses;
  const stockValue = products.reduce((sum, p) => sum + (p.estoque * p.custo), 0);
  const stockAlerts = products.filter(p => p.estoque <= p.minimo);
  
  // Chart data
  const salesChartData = sales.slice(0, 7).reverse().map((sale, index) => ({
    day: `Day ${index + 1}`,
    vendas: sales.slice(0, index + 1).filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.valor, 0) / 1000
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
    { month: 'Jul', revenue: totalRevenue * 0.8 / 1000, expenses: totalExpenses * 0.7 / 1000 },
    { month: 'Aug', revenue: totalRevenue * 0.9 / 1000, expenses: totalExpenses * 0.8 / 1000 },
    { month: 'Sep', revenue: totalRevenue * 0.95 / 1000, expenses: totalExpenses * 0.9 / 1000 },
    { month: 'Oct', revenue: totalRevenue / 1000, expenses: totalExpenses / 1000 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const addSale = () => {
    if (newSale.cliente && newSale.valor && newSale.produto) {
      const sale: Sale = {
        id: `#${12848 + sales.length}`,
        cliente: newSale.cliente,
        valor: parseFloat(newSale.valor),
        status: 'Paid',
        data: new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }),
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
        data: new Date().toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' }),
        categoria: newTransaction.categoria
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ tipo: 'revenue', descricao: '', valor: '', categoria: '' });
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
      label: t('demo.nav.dashboard'),
      icon: 'fas fa-tachometer-alt',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'vendas',
      label: t('demo.nav.vendas'),
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('vendas'),
      isActive: selectedModule === 'vendas'
    },
    {
      id: 'estoque',
      label: t('demo.nav.estoque'),
      icon: 'fas fa-boxes',
      onClick: () => setSelectedModule('estoque'),
      isActive: selectedModule === 'estoque'
    },
    {
      id: 'financeiro',
      label: t('demo.nav.financeiro'),
      icon: 'fas fa-calculator',
      onClick: () => setSelectedModule('financeiro'),
      isActive: selectedModule === 'financeiro'
    }
  ];

  return (
    <AppShell
      title={t('demo.erp.title')}
      subtitle={t('demo.erp.subtitle')}
      systemIcon="fas fa-chart-line"
      systemColor="from-blue-600 to-blue-500"
      backHref="/sistema-erp"
      statusBadge={t('demo.erp.badge')}
      navItems={navItems}
      currentUser="Admin Demo"
    >
            
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 raleway">Executive Dashboard</h2>
                  <p className="text-slate-600 dark:text-slate-400">Real-time overview of company performance</p>
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
                      $ {totalSales.toLocaleString('en-US')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Monthly Sales</p>
                    <div className="mt-3 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">85% of target</p>
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
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Orders Processed</p>
                    <p className="text-orange-600 dark:text-orange-400 text-xs mt-2">
                      <i className="fas fa-clock mr-1"></i>
                      {pendingSales} pending
                    </p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-boxes text-purple-600 dark:text-purple-400"></i>
                      </div>
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">{stockAlerts.length} alerts</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-estoque-valor">
                      $ {stockValue.toLocaleString('en-US')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Inventory Value</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">{products.length} products</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-wallet text-emerald-600 dark:text-emerald-400"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1" data-testid="text-saldo-caixa">
                      $ {cashFlow.toLocaleString('en-US')}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Cash Balance</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-green-600 dark:text-green-400">+$ {totalRevenue.toLocaleString('en-US')}</span>
                      <span className="text-red-600 dark:text-red-400">-$ {totalExpenses.toLocaleString('en-US')}</span>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Sales Evolution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={salesChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`$${value}k`, 'Sales']} />
                        <Area type="monotone" dataKey="vendas" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Revenue vs Expenses</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [`$${value}k`]} />
                        <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                        <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Data and Category Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Recent Sales</h3>
                    <div className="space-y-4">
                      {sales.slice(0, 4).map((sale) => (
                        <div key={sale.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg" data-testid={`row-sale-${sale.id}`}>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{sale.cliente}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{sale.id} • {sale.data}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">$ {sale.valor.toLocaleString('en-US')}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              sale.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              sale.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
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
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Stock Alerts</h3>
                    <div className="space-y-4">
                      {stockAlerts.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg" data-testid={`row-alert-${index}`}>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{item.nome}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.categoria}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{item.estoque} units</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.estoque <= item.minimo / 2 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                              'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {item.estoque <= item.minimo / 2 ? 'Critical' : 'Low'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Inventory by Category</h3>
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
                        <Tooltip formatter={(value: number) => [`$${value.toLocaleString('en-US')}`]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'vendas' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Sales Module</h2>
                
                {/* Add New Sale Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">New Sale</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Customer Name"
                      value={newSale.cliente}
                      onChange={(e) => setNewSale({...newSale, cliente: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-cliente"
                    />
                    <input
                      type="number"
                      placeholder="Value ($)"
                      value={newSale.valor}
                      onChange={(e) => setNewSale({...newSale, valor: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-valor"
                    />
                    <input
                      type="text"
                      placeholder="Product Sold"
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
                      Add Sale
                    </button>
                  </div>
                </div>

                {/* Sales List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Sales History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">ID</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Customer</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Product</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Value</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Status</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sales.map((sale) => (
                          <tr key={sale.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-sale-detail-${sale.id}`}>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{sale.id}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{sale.cliente}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{sale.produto}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-semibold">$ {sale.valor.toLocaleString('en-US')}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                                sale.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Inventory Control</h2>
                
                {/* Add New Product Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={newProduct.nome}
                      onChange={(e) => setNewProduct({...newProduct, nome: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-nome"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={newProduct.categoria}
                      onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-categoria"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={newProduct.estoque}
                      onChange={(e) => setNewProduct({...newProduct, estoque: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-estoque"
                    />
                    <input
                      type="number"
                      placeholder="Minimum"
                      value={newProduct.minimo}
                      onChange={(e) => setNewProduct({...newProduct, minimo: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-product-minimo"
                    />
                    <input
                      type="number"
                      placeholder="Price ($)"
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
                      Add
                    </button>
                  </div>
                </div>

                {/* Products List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Products in Stock</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Product</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Category</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Stock</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Minimum</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Price</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Status</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-product-${product.id}`}>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-medium">{product.nome}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{product.categoria}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100 font-semibold">{product.estoque}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{product.minimo}</td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">$ {product.preco.toLocaleString('en-US')}</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                product.estoque <= product.minimo / 2 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                                product.estoque <= product.minimo ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                                'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              }`}>
                                {product.estoque <= product.minimo / 2 ? 'Critical' : product.estoque <= product.minimo ? 'Low' : 'Normal'}
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 raleway">Financial Module</h2>
                
                {/* Add New Transaction Form */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">New Transaction</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <select
                      value={newTransaction.tipo}
                      onChange={(e) => setNewTransaction({...newTransaction, tipo: e.target.value as 'revenue' | 'expense'})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="select-tipo"
                    >
                      <option value="revenue">Revenue</option>
                      <option value="expense">Expense</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Description"
                      value={newTransaction.descricao}
                      onChange={(e) => setNewTransaction({...newTransaction, descricao: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-descricao"
                    />
                    <input
                      type="number"
                      placeholder="Value ($)"
                      value={newTransaction.valor}
                      onChange={(e) => setNewTransaction({...newTransaction, valor: e.target.value})}
                      className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      data-testid="input-transaction-valor"
                    />
                    <input
                      type="text"
                      placeholder="Category"
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
                      Add
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
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total Revenue</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-total-receitas">
                          $ {totalRevenue.toLocaleString('en-US')}
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
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total Expenses</h3>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400" data-testid="text-total-despesas">
                          $ {totalExpenses.toLocaleString('en-US')}
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
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Net Balance</h3>
                        <p className={`text-2xl font-bold ${cashFlow >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} data-testid="text-saldo-liquido">
                          $ {cashFlow.toLocaleString('en-US')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Transaction History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Type</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Description</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Category</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Value</th>
                          <th className="text-left py-3 text-slate-900 dark:text-slate-100">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-slate-100 dark:border-slate-700" data-testid={`row-transaction-${transaction.id}`}>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.tipo === 'revenue' 
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                                  : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                              }`}>
                                {transaction.tipo === 'revenue' ? 'Revenue' : 'Expense'}
                              </span>
                            </td>
                            <td className="py-3 text-slate-900 dark:text-slate-100">{transaction.descricao}</td>
                            <td className="py-3 text-slate-600 dark:text-slate-400">{transaction.categoria}</td>
                            <td className={`py-3 font-semibold ${
                              transaction.tipo === 'revenue' 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {transaction.tipo === 'revenue' ? '+' : '-'}$ {transaction.valor.toLocaleString('en-US')}
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