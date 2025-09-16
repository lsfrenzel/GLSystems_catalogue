import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function DemoFinancial() {
  const [selectedModule, setSelectedModule] = useState('dashboard');

  // Navigation items for AppShell
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-chart-pie',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'receitas',
      label: 'Revenue',
      icon: 'fas fa-arrow-up',
      onClick: () => setSelectedModule('receitas'),
      isActive: selectedModule === 'receitas'
    },
    {
      id: 'despesas',
      label: 'Expenses',
      icon: 'fas fa-arrow-down',
      onClick: () => setSelectedModule('despesas'),
      isActive: selectedModule === 'despesas'
    },
    {
      id: 'investimentos',
      label: 'Investments',
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('investimentos'),
      isActive: selectedModule === 'investimentos'
    },
    {
      id: 'relatorios',
      label: 'Reports',
      icon: 'fas fa-file-chart-column',
      onClick: () => setSelectedModule('relatorios'),
      isActive: selectedModule === 'relatorios'
    }
  ];
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showReceivableModal, setShowReceivableModal] = useState(false);
  const [showPayableModal, setShowPayableModal] = useState(false);
  const { toast } = useToast();

  // Dynamic data states
  const [contasReceber, setContasReceber] = useState([
    { cliente: "TechCorp Ltd", valor: "$45,000", vencimento: "Nov 15, 2024", status: "due_soon", dias: 2 },
    { cliente: "Innovation Hub", valor: "$28,900", vencimento: "Nov 20, 2024", status: "on_time", dias: 7 },
    { cliente: "Digital Solutions", valor: "$67,500", vencimento: "Nov 25, 2024", status: "on_time", dias: 12 },
    { cliente: "StartupXYZ", valor: "$15,670", vencimento: "Nov 10, 2024", status: "overdue", dias: -3 }
  ]);

  const [contasPagar, setContasPagar] = useState([
    { fornecedor: "Electric Power", valor: "$3,450", vencimento: "Nov 18, 2024", status: "due_soon", categoria: "Utilities" },
    { fornecedor: "Phone/Internet", valor: "$1,890", vencimento: "Nov 22, 2024", status: "on_time", categoria: "Telecommunications" },
    { fornecedor: "Office Rent", valor: "$12,000", vencimento: "Nov 30, 2024", status: "on_time", categoria: "Real Estate" },
    { fornecedor: "Supplier ABC", valor: "$8,750", vencimento: "Nov 12, 2024", status: "overdue", categoria: "Supplies" }
  ]);

  const [movimentacoes, setMovimentacoes] = useState([
    { tipo: "income", descricao: "Payment - TechCorp Ltd", valor: "$45,000", data: "Nov 13", categoria: "Sales" },
    { tipo: "expense", descricao: "Salary Payment", valor: "$28,500", data: "Nov 10", categoria: "Payroll" },
    { tipo: "income", descricao: "Bank Transfer", valor: "$12,300", data: "Nov 08", categoria: "Transfers" },
    { tipo: "expense", descricao: "Material Supplier", valor: "$5,670", data: "Nov 07", categoria: "Purchases" }
  ]);

  // Open account detail modal
  const openAccountModal = (account: any) => {
    setSelectedAccount(account);
    setShowAccountModal(true);
  };

  // Close account detail modal
  const closeAccountModal = () => {
    setShowAccountModal(false);
    setSelectedAccount(null);
  };

  // Chart data that reacts to selectedPeriod
  const getCashFlowData = () => {
    if (selectedPeriod === 'year') {
      return [
        { mes: 'Jan', entradas: 320000, saidas: 220000, saldo: 100000 },
        { mes: 'Feb', entradas: 340000, saidas: 240000, saldo: 100000 },
        { mes: 'Mar', entradas: 380000, saidas: 260000, saldo: 120000 },
        { mes: 'Apr', entradas: 400000, saidas: 270000, saldo: 130000 },
        { mes: 'May', entradas: 430000, saidas: 290000, saldo: 140000 },
        { mes: 'Jun', entradas: 420000, saidas: 280000, saldo: 140000 },
        { mes: 'Jul', entradas: 450000, saidas: 310000, saldo: 140000 },
        { mes: 'Aug', entradas: 380000, saidas: 320000, saldo: 60000 },
        { mes: 'Sep', entradas: 450000, saidas: 290000, saldo: 160000 },
        { mes: 'Oct', entradas: 510000, saidas: 340000, saldo: 170000 },
        { mes: 'Nov', entradas: 456780, saidas: 234560, saldo: 222220 }
      ];
    } else if (selectedPeriod === 'quarter') {
      return [
        { mes: 'Sep', entradas: 450000, saidas: 290000, saldo: 160000 },
        { mes: 'Oct', entradas: 510000, saidas: 340000, saldo: 170000 },
        { mes: 'Nov', entradas: 456780, saidas: 234560, saldo: 222220 }
      ];
    }
    return [
      { mes: 'Week 1', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Week 2', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Week 3', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Week 4', entradas: 114195, saidas: 58640, saldo: 55555 }
    ];
  };
  
  const cashFlowData = getCashFlowData();

  const expenseCategories = [
    { name: 'Payroll', value: 120000, color: '#3B82F6' },
    { name: 'Suppliers', value: 80000, color: '#10B981' },
    { name: 'Taxes', value: 45000, color: '#F59E0B' },
    { name: 'Operations', value: 35000, color: '#EF4444' },
    { name: 'Marketing', value: 25000, color: '#8B5CF6' }
  ];

  const monthlyComparison = [
    { categoria: 'Revenue', atual: 456780, anterior: 420000, meta: 500000 },
    { categoria: 'Expenses', atual: 234560, anterior: 280000, meta: 200000 },
    { categoria: 'Profit', atual: 222220, anterior: 140000, meta: 300000 }
  ];

  // Utility to calculate status and days
  const calculateStatus = (vencimentoDate: Date) => {
    const hoje = new Date();
    const diffTime = vencimentoDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const status = diffDays < 0 ? 'overdue' : diffDays <= 5 ? 'due_soon' : 'on_time';
    return { status, dias: diffDays };
  };

  // Utility to extract numeric value from currency string
  const extractValue = (valorStr: string) => {
    return parseFloat(valorStr.replace('$', '').replace(/,/g, ''));
  };

  // Utility to format USD
  const formatUSD = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
  };

  // Calculate dynamic financial data
  const calculateFinancialData = () => {
    const totalReceitas = movimentacoes
      .filter(mov => mov.tipo === 'income')
      .reduce((sum, mov) => sum + extractValue(mov.valor), 0);
    
    const totalDespesas = movimentacoes
      .filter(mov => mov.tipo === 'expense')
      .reduce((sum, mov) => sum + extractValue(mov.valor), 0);
    
    const totalReceber = contasReceber
      .reduce((sum, conta) => sum + extractValue(conta.valor), 0);
    
    const totalPagar = contasPagar
      .reduce((sum, conta) => sum + extractValue(conta.valor), 0);
    
    const saldoTotal = 2847650 + totalReceitas - totalDespesas; // Base + dynamic
    const lucroLiquido = totalReceitas - totalDespesas;
    
    return {
      saldoTotal: formatUSD(saldoTotal),
      receitasMes: formatUSD(totalReceitas),
      despesasMes: formatUSD(totalDespesas),
      lucroLiquido: formatUSD(lucroLiquido),
      contasReceber: formatUSD(totalReceber),
      contasPagar: formatUSD(totalPagar),
      fluxoCaixa: lucroLiquido > 0 ? `+${((lucroLiquido/totalDespesas)*100).toFixed(1)}%` : `${((lucroLiquido/totalDespesas)*100).toFixed(1)}%`
    };
  };

  // Dynamic financial data
  const financialData = calculateFinancialData();

  // Add new transaction function
  const addTransaction = (transaction: any) => {
    setMovimentacoes([transaction, ...movimentacoes]);
    toast({
      title: "Transaction Added",
      description: `New ${transaction.tipo} transaction of ${transaction.valor} has been recorded.`
    });
  };

  // Add new receivable function
  const addReceivable = (receivable: any) => {
    setContasReceber([receivable, ...contasReceber]);
    toast({
      title: "Account Receivable Added",
      description: `New receivable from ${receivable.cliente} in the amount of ${receivable.valor} has been recorded.`
    });
  };

  // Add new payable function
  const addPayable = (payable: any) => {
    setContasPagar([payable, ...contasPagar]);
    toast({
      title: "Account Payable Added",
      description: `New payable to ${payable.fornecedor} in the amount of ${payable.valor} has been recorded.`
    });
  };

  // Export comprehensive PDF function
  const exportPDF = () => {
    toast({
      title: "Generating Report...",
      description: "Compiling all graphic information and financial data."
    });
    
    // Generate comprehensive report content
    const generateReportContent = () => {
      const currentDate = new Date().toLocaleDateString('pt-BR');
      const currentTime = new Date().toLocaleTimeString('pt-BR');
      
      let content = `FINANCIAL REPORT TECHSOLUTIONS\n`;
      content += `Date: ${currentDate} - ${currentTime}\n`;
      content += `Period: ${selectedPeriod === 'month' ? 'Monthly' : selectedPeriod === 'quarter' ? 'Quarterly' : 'Annual'}\n\n`;
      
      // Financial Summary
      content += `=== FINANCIAL SUMMARY ===\n`;
      content += `Total Balance: ${financialData.saldoTotal}\n`;
      content += `Monthly Revenue: ${financialData.receitasMes}\n`;
      content += `Monthly Expenses: ${financialData.despesasMes}\n`;
      content += `Net Profit: ${financialData.lucroLiquido}\n`;
      content += `Total Receivable: ${financialData.contasReceber}\n`;
      content += `Total Payable: ${financialData.contasPagar}\n`;
      content += `Cash Flow Variation: ${financialData.fluxoCaixa}\n\n`;
      
      // Cash Flow Data
      content += `=== CASH FLOW (${selectedPeriod.toUpperCase()}) ===\n`;
      cashFlowData.forEach((item, index) => {
        content += `${item.mes}: Income $${item.entradas.toLocaleString('en-US')}, Expenses $${item.saidas.toLocaleString('en-US')}, Balance $${item.saldo.toLocaleString('en-US')}\n`;
      });
      content += `\n`;
      
      // Financial Indicators
      content += `=== FINANCIAL INDICATORS ===\n`;
      indicators.forEach(indicator => {
        content += `${indicator.nome}: ${indicator.valor} (${indicator.variacao})\n`;
      });
      content += `\n`;
      
      // Expense Categories
      content += `=== EXPENSE CATEGORIES ===\n`;
      expenseCategories.forEach(category => {
        content += `${category.name}: $${category.value.toLocaleString('en-US')}\n`;
      });
      content += `\n`;
      
      // Monthly Comparison
      content += `=== MONTHLY COMPARISON ===\n`;
      monthlyComparison.forEach(item => {
        content += `${item.categoria}: Current $${item.atual.toLocaleString('en-US')}, Previous $${item.anterior.toLocaleString('en-US')}, Target $${item.meta.toLocaleString('en-US')}\n`;
      });
      content += `\n`;
      
      // Accounts Receivable
      content += `=== ACCOUNTS RECEIVABLE ===\n`;
      contasReceber.forEach((conta, index) => {
        content += `${index + 1}. ${conta.cliente} - ${conta.valor} - Due: ${conta.vencimento} - Status: ${conta.status === 'overdue' ? 'Overdue' : conta.status === 'due_soon' ? 'Due Soon' : 'On Time'}\n`;
      });
      content += `\n`;
      
      // Accounts Payable
      content += `=== ACCOUNTS PAYABLE ===\n`;
      contasPagar.forEach((conta, index) => {
        content += `${index + 1}. ${conta.fornecedor} - ${conta.valor} - Due: ${conta.vencimento} - Cat: ${conta.categoria} - Status: ${conta.status === 'overdue' ? 'Overdue' : conta.status === 'due_soon' ? 'Due Soon' : 'On Time'}\n`;
      });
      content += `\n`;
      
      // Recent Movements
      content += `=== RECENT TRANSACTIONS ===\n`;
      movimentacoes.forEach((mov, index) => {
        content += `${index + 1}. ${mov.tipo.toUpperCase()} - ${mov.descricao} - ${mov.valor} - ${mov.data} - Cat: ${mov.categoria}\n`;
      });
      content += `\n`;
      
      content += `\n--- Report generated automatically by FinanceMax TechSolutions ---`;
      
      return content;
    };
    
    // Generate and download comprehensive PDF
    setTimeout(() => {
      const content = generateReportContent();
      
      // Create a more detailed PDF with actual data
      const createDetailedPDF = () => {
        // Simple text-based PDF for demonstration
        const lines = content.split('\n');
        const maxLineLength = 80;
        let pdfContent = lines.map(line => {
          if (line.length > maxLineLength) {
            return line.substring(0, maxLineLength) + '...';
          }
          return line;
        }).join('\n');
        
        // Create a properly formatted HTML report that can be viewed and printed as PDF
        const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financial Report TechSolutions</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #3B82F6; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin: 25px 0; }
        .section h2 { color: #1e40af; border-left: 4px solid #3B82F6; padding-left: 10px; }
        .summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
        .summary-item { background: #f8fafc; padding: 15px; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; font-weight: bold; }
        .entrada { color: #10b981; } .saida { color: #ef4444; }
        .status-overdue { color: #ef4444; font-weight: bold; }
        .status-due_soon { color: #f59e0b; font-weight: bold; }
        .status-on_time { color: #10b981; font-weight: bold; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>FINANCIAL REPORT</h1>
        <h2>TechSolutions</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US')} | <strong>Period:</strong> ${selectedPeriod === 'month' ? 'Monthly' : selectedPeriod === 'quarter' ? 'Quarterly' : 'Annual'}</p>
    </div>

    <div class="section">
        <h2>FINANCIAL SUMMARY</h2>
        <div class="summary">
            <div class="summary-item"><strong>Total Balance:</strong> ${financialData.saldoTotal}</div>
            <div class="summary-item"><strong>Revenue:</strong> ${financialData.receitasMes}</div>
            <div class="summary-item"><strong>Expenses:</strong> ${financialData.despesasMes}</div>
            <div class="summary-item"><strong>Net Profit:</strong> ${financialData.lucroLiquido}</div>
            <div class="summary-item"><strong>Receivable:</strong> ${financialData.contasReceber}</div>
            <div class="summary-item"><strong>Payable:</strong> ${financialData.contasPagar}</div>
        </div>
    </div>

    <div class="section">
        <h2>CASH FLOW</h2>
        <table>
            <tr><th>Period</th><th>Income</th><th>Expenses</th><th>Balance</th></tr>
            ${cashFlowData.map(item => `<tr><td>${item.mes}</td><td class="entrada">$${item.entradas.toLocaleString('en-US')}</td><td class="saida">$${item.saidas.toLocaleString('en-US')}</td><td><strong>$${item.saldo.toLocaleString('en-US')}</strong></td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>FINANCIAL INDICATORS</h2>
        <div class="summary">
            ${indicators.map(ind => `<div class="summary-item"><strong>${ind.nome}:</strong> ${ind.valor} (${ind.variacao})</div>`).join('')}
        </div>
    </div>

    <div class="section">
        <h2>ACCOUNTS RECEIVABLE</h2>
        <table>
            <tr><th>Client</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
            ${contasReceber.map(c => `<tr><td>${c.cliente}</td><td><strong>${c.valor}</strong></td><td>${c.vencimento}</td><td class="status-${c.status}">${c.status === 'overdue' ? 'Overdue' : c.status === 'due_soon' ? 'Due Soon' : 'On Time'}</td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>ACCOUNTS PAYABLE</h2>
        <table>
            <tr><th>Supplier</th><th>Amount</th><th>Due Date</th><th>Category</th><th>Status</th></tr>
            ${contasPagar.map(c => `<tr><td>${c.fornecedor}</td><td><strong>${c.valor}</strong></td><td>${c.vencimento}</td><td>${c.categoria}</td><td class="status-${c.status}">${c.status === 'overdue' ? 'Overdue' : c.status === 'due_soon' ? 'Due Soon' : 'On Time'}</td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>RECENT TRANSACTIONS</h2>
        <table>
            <tr><th>Type</th><th>Description</th><th>Amount</th><th>Date</th><th>Category</th></tr>
            ${movimentacoes.map(m => `<tr><td class="${m.tipo}">${m.tipo.toUpperCase()}</td><td>${m.descricao}</td><td><strong>${m.valor}</strong></td><td>${m.data}</td><td>${m.categoria}</td></tr>`).join('')}
        </table>
    </div>

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <p><strong>Report generated automatically by FinanceMax TechSolutions</strong></p>
        <p><em>To save as PDF: Press Ctrl+P and select "Save as PDF"</em></p>
    </div>
</body>
</html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `financial-report-complete-${new Date().toISOString().slice(0, 10)}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      
      createDetailedPDF();
      
      toast({
        title: "HTML Report Generated",
        description: `Complete report downloaded! Open the .html file in your browser and press Ctrl+P to save as PDF.`
      });
    }, 1500);
  };

  const indicators = [
    { nome: "ROI", valor: "23.5%", variacao: "+2.1%", status: "up" },
    { nome: "Net Margin", valor: "18.7%", variacao: "+1.3%", status: "up" },
    { nome: "Current Ratio", valor: "2.4", variacao: "-0.2", status: "down" },
    { nome: "Asset Turnover", valor: "1.8", variacao: "+0.1", status: "up" }
  ];

  return (
    <AppShell
      title="FinancePro - TechSolutions"
      subtitle="Financial Edition"
      systemIcon="fas fa-chart-bar"
      systemColor="from-purple-600 to-purple-500"
      backHref="/sistema/financial"
      statusBadge="Financial System"
      navItems={navItems}
      currentUser="Fiscal Period: Nov 2024"
    >
      {/* Custom Systems Message */}
      <div className="mb-6">
        <CustomSystemsMessage variant="compact" />
      </div>
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Financial Dashboard</h2>
                    <p className="text-blue-200">Complete overview of the company's financial situation</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={selectedPeriod} 
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="bg-blue-700/50 text-white border border-blue-600 rounded-lg px-3 py-2 text-sm"
                      data-testid="select-period"
                    >
                      <option value="month">This Month</option>
                      <option value="quarter">Quarter</option>
                      <option value="year">This Year</option>
                    </select>
                    <button 
                      onClick={() => {
                        // Simulate data refresh by toggling a state
                        setSelectedPeriod(selectedPeriod);
                        alert('Data updated successfully!');
                      }} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      data-testid="button-refresh"
                    >
                      <i className="fas fa-sync-alt mr-2"></i>
                      Refresh
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div 
                    className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg hover:bg-blue-800/40 transition-all cursor-pointer"
                    onClick={() => setSelectedModule('receitas')}
                    data-testid="card-saldo-total"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-wallet text-white"></i>
                      </div>
                      <span className="text-green-400 text-sm font-medium">{financialData.fluxoCaixa}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{financialData.saldoTotal}</h3>
                    <p className="text-blue-200 text-sm">Total Balance</p>
                    <div className="mt-2 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      Click to view cash flow
                    </div>
                  </div>

                  <div 
                    className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg hover:bg-blue-800/40 transition-all cursor-pointer"
                    onClick={() => setSelectedModule('receitas')}
                    data-testid="card-receitas"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-up text-white"></i>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">+12.3%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{financialData.receitasMes}</h3>
                    <p className="text-blue-200 text-sm">Monthly Revenue</p>
                    <p className="text-blue-300 text-xs mt-2">
                      <i className="fas fa-plus mr-1"></i>
                      Confirmed income
                    </p>
                    <div className="mt-1 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      View accounts receivable
                    </div>
                  </div>

                  <div 
                    className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg hover:bg-blue-800/40 transition-all cursor-pointer"
                    onClick={() => setSelectedModule('despesas')}
                    data-testid="card-despesas"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-down text-white"></i>
                      </div>
                      <span className="text-red-400 text-sm font-medium">-8.1%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{financialData.despesasMes}</h3>
                    <p className="text-blue-200 text-sm">Monthly Expenses</p>
                    <p className="text-red-400 text-xs mt-2">
                      <i className="fas fa-minus mr-1"></i>
                      Confirmed expenses
                    </p>
                    <div className="mt-1 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      View accounts payable
                    </div>
                  </div>

                  <div 
                    className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg hover:bg-blue-800/40 transition-all cursor-pointer"
                    onClick={() => setSelectedModule('relatorios')}
                    data-testid="card-lucro"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-line text-white"></i>
                      </div>
                      <span className="text-emerald-400 text-sm font-medium">+23.5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{financialData.lucroLiquido}</h3>
                    <p className="text-blue-200 text-sm">Net Profit</p>
                    <div className="mt-2 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      View detailed reports
                    </div>
                  </div>
                </div>

                {/* Interactive Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-chart-area mr-2 text-blue-400"></i>
                      Cash Flow (5 months)
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                        <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e40af', 
                            border: '1px solid #3b82f6',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                          formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, '']}
                        />
                        <Area type="monotone" dataKey="entradas" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="saidas" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="saldo" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-chart-pie mr-2 text-blue-400"></i>
                      Expense Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={expenseCategories}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e40af', 
                            border: '1px solid #3b82f6',
                            borderRadius: '8px',
                            color: 'white'
                          }}
                          formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {expenseCategories.map((category, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-xs text-blue-200 truncate">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Monthly Comparison */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                    <i className="fas fa-chart-bar mr-2 text-blue-400"></i>
                    Comparação Mensal vs Meta
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                      <XAxis dataKey="categoria" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e40af', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, '']}
                      />
                      <Bar dataKey="atual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="anterior" fill="#6b7280" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meta" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Accounts Receivable and Payable */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-arrow-up mr-2 text-green-400"></i>
                      Accounts Receivable
                    </h3>
                    <div className="space-y-4">
                      {contasReceber.map((conta, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-all"
                          onClick={() => openAccountModal(conta)}
                          data-testid={`receivable-${index}`}
                        >
                          <div>
                            <p className="font-medium text-white">{conta.cliente}</p>
                            <p className="text-sm text-blue-200">Venc: {conta.vencimento}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{conta.valor}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              conta.status === 'overdue' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'due_soon' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {conta.status === 'overdue' ? `${Math.abs(conta.dias)}d overdue` :
                               conta.status === 'due_soon' ? `${conta.dias}d remaining` :
                               `${conta.dias}d remaining`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-600/30">
                      <div className="flex justify-between">
                        <span className="font-medium text-white">Total Receivable:</span>
                        <span className="font-bold text-emerald-400">{financialData.contasReceber}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedModule('receitas')} 
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-view-receivables"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-arrow-down mr-2 text-red-400"></i>
                      Accounts Payable
                    </h3>
                    <div className="space-y-4">
                      {contasPagar.map((conta, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-all"
                          onClick={() => openAccountModal(conta)}
                          data-testid={`payable-${index}`}
                        >
                          <div>
                            <p className="font-medium text-white">{conta.fornecedor}</p>
                            <p className="text-sm text-blue-200">
                              {conta.categoria} • Venc: {conta.vencimento}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{conta.valor}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              conta.status === 'overdue' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'due_soon' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {conta.status === 'overdue' ? 'Overdue' : conta.status === 'due_soon' ? 'Due Soon' : 'On Time'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-600/30">
                      <div className="flex justify-between">
                        <span className="font-medium text-white">Total Payable:</span>
                        <span className="font-bold text-red-400">{financialData.contasPagar}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedModule('despesas')} 
                        className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-view-payables"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Financial Indicators and Recent Movements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Indicadores Financeiros</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {indicators.map((indicator, index) => (
                        <div key={index} className="p-4 bg-blue-700/30 hover:bg-blue-700/40 rounded-lg text-center transition-colors cursor-pointer" data-testid={`indicator-${index}`}>
                          <h4 className="text-sm font-medium text-blue-200 mb-1">{indicator.nome}</h4>
                          <p className="text-xl font-bold text-white">{indicator.valor}</p>
                          <div className={`flex items-center justify-center mt-1 ${
                            indicator.status === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            <i className={`fas fa-arrow-${indicator.status === 'up' ? 'up' : 'down'} text-xs mr-1`}></i>
                            <span className="text-xs">{indicator.variacao}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Movimentações Recentes</h3>
                    <div className="space-y-3">
                      {movimentacoes.map((mov, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-blue-700/40 rounded-lg transition-colors">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            mov.tipo === 'entrada' ? 'bg-green-500/20' : 'bg-red-500/20'
                          }`}>
                            <i className={`${
                              mov.tipo === 'entrada' ? 'fas fa-arrow-up text-green-300' : 'fas fa-arrow-down text-red-300'
                            }`}></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white">{mov.descricao}</p>
                            <p className="text-sm text-blue-200">{mov.categoria} • {mov.data}</p>
                          </div>
                          <span className={`font-semibold ${
                            mov.tipo === 'entrada' ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {mov.tipo === 'entrada' ? '+' : '-'}{mov.valor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'receitas' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Revenue</h2>
                    <p className="text-blue-200">Controle de receitas e contas a receber</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowTransactionModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-transaction"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Nova Transação
                    </button>
                  </div>
                </div>

                {/* Cash Flow Chart */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Cash Flow Evolution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                      <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e40af', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, '']}
                      />
                      <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
                      <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Transactions */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Movimentações Recentes</h3>
                  <div className="space-y-3">
                    {movimentacoes.map((mov, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-4 p-4 hover:bg-blue-700/30 rounded-lg transition-all cursor-pointer"
                        onClick={() => alert(`Detalhes: ${mov.descricao}`)}
                        data-testid={`transaction-${index}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mov.tipo === 'entrada' ? 'bg-green-500/20 border-2 border-green-400' : 'bg-red-500/20 border-2 border-red-400'
                        }`}>
                          <i className={`${
                            mov.tipo === 'entrada' ? 'fas fa-arrow-up text-green-400' : 'fas fa-arrow-down text-red-400'
                          } text-lg`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{mov.descricao}</p>
                          <p className="text-sm text-blue-200">{mov.categoria} • {mov.data}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold text-lg ${
                            mov.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {mov.tipo === 'entrada' ? '+' : '-'}{mov.valor}
                          </span>
                          <p className="text-xs text-blue-300">Clique para detalhes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'despesas' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Expenses</h2>
                    <p className="text-blue-200">Controle de despesas e contas a pagar</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowReceivableModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-receivable"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      New Account Receivable
                    </button>
                    <button 
                      onClick={() => setShowPayableModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-payable"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      New Account Payable
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-up text-green-400 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-green-400 font-bold text-2xl">{financialData.contasReceber}</p>
                        <p className="text-blue-200 text-sm">Total Receivable</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-down text-red-400 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-red-400 font-bold text-2xl">{financialData.contasPagar}</p>
                        <p className="text-blue-200 text-sm">Total Payable</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <i className="fas fa-balance-scale text-blue-400 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-blue-400 font-bold text-2xl">R$ 56.260</p>
                        <p className="text-blue-200 text-sm">Saldo Líquido</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Accounts Receivable */}
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-arrow-up mr-2 text-green-400"></i>
                      Accounts Receivable
                    </h3>
                    <div className="space-y-3">
                      {contasReceber.map((conta, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-all group"
                          onClick={() => openAccountModal(conta)}
                          data-testid={`receivable-detail-${index}`}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-white group-hover:text-green-300 transition-colors">{conta.cliente}</p>
                            <p className="text-sm text-blue-200">Vencimento: {conta.vencimento}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{conta.valor}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              conta.status === 'overdue' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'due_soon' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {conta.status === 'overdue' ? 'Overdue' : conta.status === 'due_soon' ? 'Due Soon' : 'On Time'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accounts Payable */}
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-arrow-down mr-2 text-red-400"></i>
                      Accounts Payable
                    </h3>
                    <div className="space-y-3">
                      {contasPagar.map((conta, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 bg-blue-700/30 hover:bg-blue-700/50 rounded-lg cursor-pointer transition-all group"
                          onClick={() => openAccountModal(conta)}
                          data-testid={`payable-detail-${index}`}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-white group-hover:text-red-300 transition-colors">{conta.fornecedor}</p>
                            <p className="text-sm text-blue-200">{conta.categoria} • {conta.vencimento}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{conta.valor}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              conta.status === 'overdue' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'due_soon' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {conta.status === 'overdue' ? 'Overdue' : conta.status === 'due_soon' ? 'Due Soon' : 'On Time'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'investimentos' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Investments</h2>
                    <p className="text-blue-200">Investment control and tracking</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toast({title: "Under Development", description: "Investment module coming soon!"})}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-investment"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      New Investment
                    </button>
                  </div>
                </div>

                {/* Investment Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chart-pie text-white"></i>
                      </div>
                      <span className="text-purple-400 text-sm font-medium">+8.5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">$125,450</h3>
                    <p className="text-blue-200 text-sm">Total Portfolio</p>
                  </div>
                  
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-trend-up text-white"></i>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+15.2%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">$18,750</h3>
                    <p className="text-blue-200 text-sm">Monthly Return</p>
                  </div>
                  
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-coins text-white"></i>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">7 ativos</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">67%</h3>
                    <p className="text-blue-200 text-sm">Diversification</p>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Investment Distribution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        { tipo: "Fixed Income", valor: "$45,200", percent: "36%", color: "bg-blue-500" },
                        { tipo: "Stocks", valor: "$38,900", percent: "31%", color: "bg-green-500" },
                        { tipo: "Funds", valor: "$28,750", percent: "23%", color: "bg-purple-500" },
                        { tipo: "Crypto", valor: "$12,600", percent: "10%", color: "bg-yellow-500" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-700/20 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-white font-medium">{item.tipo}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{item.valor}</div>
                            <div className="text-blue-300 text-sm">{item.percent}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center text-blue-200">
                        <i className="fas fa-chart-pie text-6xl mb-4 text-purple-400"></i>
                        <p className="text-lg font-medium">Well-diversified portfolio</p>
                        <p className="text-sm">Low risk, good return potential</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'relatorios' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Financial Reports</h2>
                    <p className="text-blue-200">Detailed analysis and reports</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={exportPDF}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-generate-report"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Export PDF
                    </button>
                  </div>
                </div>

                {/* Financial Indicators */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {indicators.map((indicator, index) => (
                    <div key={index} className="bg-blue-800/30 backdrop-blur-sm p-4 rounded-xl border border-blue-600/20 text-center hover:bg-blue-800/40 transition-all cursor-pointer" data-testid={`indicator-${index}`}>
                      <h4 className="text-sm font-medium text-blue-200 mb-2">{indicator.nome}</h4>
                      <p className="text-2xl font-bold text-white mb-1">{indicator.valor}</p>
                      <div className={`flex items-center justify-center ${
                        indicator.status === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <i className={`fas fa-arrow-${indicator.status === 'up' ? 'up' : 'down'} text-xs mr-1`}></i>
                        <span className="text-xs">{indicator.variacao}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly Performance Chart */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Performance vs Meta</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                      <XAxis dataKey="categoria" axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#93c5fd', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e40af', 
                          border: '1px solid #3b82f6',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString('en-US')}`, '']}
                      />
                      <Bar dataKey="atual" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Atual" />
                      <Bar dataKey="anterior" fill="#6b7280" radius={[4, 4, 0, 0]} name="Anterior" />
                      <Bar dataKey="meta" fill="#10b981" radius={[4, 4, 0, 0]} name="Meta" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex items-center justify-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-200">Mês Atual</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm text-blue-200">Mês Anterior</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-blue-200">Meta</span>
                    </div>
                  </div>
                </div>

                {/* Summary Reports */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Demonstração do Resultado</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-700/30 rounded-lg">
                        <span className="text-blue-200">Receita Bruta</span>
                        <span className="font-bold text-green-400">R$ 456.780</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-700/30 rounded-lg">
                        <span className="text-blue-200">(-) Impostos</span>
                        <span className="font-bold text-red-400">R$ 45.678</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-700/30 rounded-lg">
                        <span className="text-blue-200">(-) Despesas</span>
                        <span className="font-bold text-red-400">R$ 188.882</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-emerald-600/30 rounded-lg border border-emerald-500/30">
                        <span className="text-white font-semibold">Lucro Líquido</span>
                        <span className="font-bold text-emerald-400 text-lg">R$ 222.220</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway">Resumo do Período</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-blue-700/30 rounded-lg">
                        <p className="text-blue-200 text-sm mb-1">Faturamento Médio Diário</p>
                        <p className="font-bold text-white text-xl">R$ 14.735</p>
                      </div>
                      <div className="text-center p-4 bg-blue-700/30 rounded-lg">
                        <p className="text-blue-200 text-sm mb-1">Crescimento vs Mês Anterior</p>
                        <p className="font-bold text-emerald-400 text-xl">+15.3%</p>
                      </div>
                      <div className="text-center p-4 bg-blue-700/30 rounded-lg">
                        <p className="text-blue-200 text-sm mb-1">Margem de Lucro</p>
                        <p className="font-bold text-white text-xl">48.7%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Detail Modal */}
            {showAccountModal && selectedAccount && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="account-modal">
                <div className="bg-blue-800/90 backdrop-blur-sm rounded-xl border border-blue-600/20 max-w-lg w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white raleway">
                      {selectedAccount.cliente ? 'Account Receivable Details' : 'Account Payable Details'}
                    </h3>
                    <button 
                      onClick={closeAccountModal}
                      className="text-blue-200 hover:text-white transition-colors"
                      data-testid="button-close-modal"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-blue-200 text-sm mb-1">{selectedAccount.cliente ? 'Client' : 'Supplier'}</p>
                        <p className="text-white font-semibold">{selectedAccount.cliente || selectedAccount.fornecedor}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Valor</p>
                        <p className="text-white font-bold text-lg">{selectedAccount.valor}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Due Date</p>
                        <p className="text-white">{selectedAccount.vencimento}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedAccount.status === 'overdue' ? 'bg-red-500/20 text-red-300' :
                          selectedAccount.status === 'due_soon' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {selectedAccount.status === 'overdue' ? 'Overdue' :
                           selectedAccount.status === 'due_soon' ? 'Due Soon' :
                           'On Time'}
                        </span>
                      </div>
                      {selectedAccount.categoria && (
                        <div className="col-span-2">
                          <p className="text-blue-200 text-sm mb-1">Category</p>
                          <p className="text-white">{selectedAccount.categoria}</p>
                        </div>
                      )}
                      {selectedAccount.dias !== undefined && (
                        <div className="col-span-2">
                          <p className="text-blue-200 text-sm mb-1">Situação</p>
                          <p className="text-white">
                            {selectedAccount.status === 'overdue' ? 
                              `${Math.abs(selectedAccount.dias)} days overdue` :
                              `${selectedAccount.dias} days remaining`}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-3 pt-4 border-t border-blue-600/30">
                      <button 
                        onClick={() => alert(`Ação de ${selectedAccount.cliente ? 'cobrança' : 'pagamento'} registrada!`)}
                        className={`flex-1 ${selectedAccount.cliente ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white py-2 rounded-lg text-sm transition-colors`}
                        data-testid="button-action"
                      >
                        <i className={`fas ${selectedAccount.cliente ? 'fa-phone' : 'fa-credit-card'} mr-2`}></i>
                        {selectedAccount.cliente ? 'Contact Client' : 'Pay Bill'}
                      </button>
                      <button 
                        onClick={closeAccountModal}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-close"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction Modal */}
            {showTransactionModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="transaction-modal">
                <div className="bg-blue-800/90 backdrop-blur-sm rounded-xl border border-blue-600/20 max-w-lg w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white raleway">New Transaction</h3>
                    <button 
                      onClick={() => setShowTransactionModal(false)}
                      className="text-blue-200 hover:text-white transition-colors"
                      data-testid="button-close-transaction-modal"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const transaction = {
                      tipo: formData.get('tipo'),
                      descricao: formData.get('descricao'),
                      valor: formatBRL(parseFloat(formData.get('valor') as string)),
                      data: new Date().toLocaleDateString('pt-BR').slice(0, 5),
                      categoria: formData.get('categoria')
                    };
                    addTransaction(transaction);
                    setShowTransactionModal(false);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Type</label>
                        <select name="tipo" required className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white">
                          <option value="income">Income</option>
                          <option value="expense">Expense</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Amount</label>
                        <input 
                          name="valor" 
                          type="number" 
                          step="0.01" 
                          required 
                          placeholder="0.00" 
                          className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Description</label>
                      <input 
                        name="descricao" 
                        type="text" 
                        required 
                        placeholder="e.g., Client payment" 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Categoria</label>
                      <input 
                        name="categoria" 
                        type="text" 
                        required 
                        placeholder="e.g., Sales, Purchases, etc." 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4 border-t border-blue-600/30">
                      <button 
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-save-transaction"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add Transaction
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowTransactionModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-transaction"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Receivable Modal */}
            {showReceivableModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="receivable-modal">
                <div className="bg-blue-800/90 backdrop-blur-sm rounded-xl border border-blue-600/20 max-w-lg w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white raleway">New Account Receivable</h3>
                    <button 
                      onClick={() => setShowReceivableModal(false)}
                      className="text-blue-200 hover:text-white transition-colors"
                      data-testid="button-close-receivable-modal"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const vencimento = new Date(formData.get('vencimento') as string);
                    const { status, dias } = calculateStatus(vencimento);
                    
                    const receivable = {
                      cliente: formData.get('cliente'),
                      valor: formatBRL(parseFloat(formData.get('valor') as string)),
                      vencimento: vencimento.toLocaleDateString('pt-BR'),
                      status,
                      dias
                    };
                    addReceivable(receivable);
                    setShowReceivableModal(false);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Client</label>
                      <input 
                        name="cliente" 
                        type="text" 
                        required 
                        placeholder="Nome do cliente" 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Amount</label>
                        <input 
                          name="valor" 
                          type="number" 
                          step="0.01" 
                          required 
                          placeholder="0.00" 
                          className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Due Date</label>
                        <input 
                          name="vencimento" 
                          type="date" 
                          required 
                          className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4 border-t border-blue-600/30">
                      <button 
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-save-receivable"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add Account Receivable
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowReceivableModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-receivable"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Payable Modal */}
            {showPayableModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="payable-modal">
                <div className="bg-blue-800/90 backdrop-blur-sm rounded-xl border border-blue-600/20 max-w-lg w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white raleway">New Account Payable</h3>
                    <button 
                      onClick={() => setShowPayableModal(false)}
                      className="text-blue-200 hover:text-white transition-colors"
                      data-testid="button-close-payable-modal"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const vencimento = new Date(formData.get('vencimento') as string);
                    const { status } = calculateStatus(vencimento);
                    
                    const payable = {
                      fornecedor: formData.get('fornecedor'),
                      valor: formatBRL(parseFloat(formData.get('valor') as string)),
                      vencimento: vencimento.toLocaleDateString('pt-BR'),
                      status,
                      categoria: formData.get('categoria')
                    };
                    addPayable(payable);
                    setShowPayableModal(false);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Supplier</label>
                      <input 
                        name="fornecedor" 
                        type="text" 
                        required 
                        placeholder="Nome do fornecedor" 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Amount</label>
                        <input 
                          name="valor" 
                          type="number" 
                          step="0.01" 
                          required 
                          placeholder="0.00" 
                          className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Due Date</label>
                        <input 
                          name="vencimento" 
                          type="date" 
                          required 
                          className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Categoria</label>
                      <input 
                        name="categoria" 
                        type="text" 
                        required 
                        placeholder="Ex: Utilities, Suprimentos, etc." 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div className="flex space-x-3 pt-4 border-t border-blue-600/30">
                      <button 
                        type="submit"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-save-payable"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Add Account Payable
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowPayableModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-payable"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
    </AppShell>
  );
}