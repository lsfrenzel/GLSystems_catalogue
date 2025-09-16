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
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showReceivableModal, setShowReceivableModal] = useState(false);
  const [showPayableModal, setShowPayableModal] = useState(false);
  const { toast } = useToast();

  // Dynamic data states
  const [contasReceber, setContasReceber] = useState([
    { cliente: "TechCorp Ltda", valor: "R$ 45.000", vencimento: "15/11/2024", status: "vencendo", dias: 2 },
    { cliente: "Innovation Hub", valor: "R$ 28.900", vencimento: "20/11/2024", status: "normal", dias: 7 },
    { cliente: "Digital Solutions", valor: "R$ 67.500", vencimento: "25/11/2024", status: "normal", dias: 12 },
    { cliente: "StartupXYZ", valor: "R$ 15.670", vencimento: "10/11/2024", status: "vencido", dias: -3 }
  ]);

  const [contasPagar, setContasPagar] = useState([
    { fornecedor: "Energia Elétrica", valor: "R$ 3.450", vencimento: "18/11/2024", status: "vencendo", categoria: "Utilities" },
    { fornecedor: "Telefonia/Internet", valor: "R$ 1.890", vencimento: "22/11/2024", status: "normal", categoria: "Telecomunicações" },
    { fornecedor: "Aluguel Escritório", valor: "R$ 12.000", vencimento: "30/11/2024", status: "normal", categoria: "Imóveis" },
    { fornecedor: "Fornecedor ABC", valor: "R$ 8.750", vencimento: "12/11/2024", status: "vencido", categoria: "Suprimentos" }
  ]);

  const [movimentacoes, setMovimentacoes] = useState([
    { tipo: "entrada", descricao: "Pagamento - TechCorp Ltda", valor: "R$ 45.000", data: "13/11", categoria: "Vendas" },
    { tipo: "saida", descricao: "Pagamento Salários", valor: "R$ 28.500", data: "10/11", categoria: "Folha de Pagamento" },
    { tipo: "entrada", descricao: "Transferência Bancária", valor: "R$ 12.300", data: "08/11", categoria: "Transferências" },
    { tipo: "saida", descricao: "Fornecedor Material", valor: "R$ 5.670", data: "07/11", categoria: "Compras" }
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
    if (selectedPeriod === 'ano') {
      return [
        { mes: 'Jan', entradas: 320000, saidas: 220000, saldo: 100000 },
        { mes: 'Fev', entradas: 340000, saidas: 240000, saldo: 100000 },
        { mes: 'Mar', entradas: 380000, saidas: 260000, saldo: 120000 },
        { mes: 'Abr', entradas: 400000, saidas: 270000, saldo: 130000 },
        { mes: 'Mai', entradas: 430000, saidas: 290000, saldo: 140000 },
        { mes: 'Jun', entradas: 420000, saidas: 280000, saldo: 140000 },
        { mes: 'Jul', entradas: 450000, saidas: 310000, saldo: 140000 },
        { mes: 'Ago', entradas: 380000, saidas: 320000, saldo: 60000 },
        { mes: 'Set', entradas: 450000, saidas: 290000, saldo: 160000 },
        { mes: 'Out', entradas: 510000, saidas: 340000, saldo: 170000 },
        { mes: 'Nov', entradas: 456780, saidas: 234560, saldo: 222220 }
      ];
    } else if (selectedPeriod === 'trimestre') {
      return [
        { mes: 'Set', entradas: 450000, saidas: 290000, saldo: 160000 },
        { mes: 'Out', entradas: 510000, saidas: 340000, saldo: 170000 },
        { mes: 'Nov', entradas: 456780, saidas: 234560, saldo: 222220 }
      ];
    }
    return [
      { mes: 'Sem 1', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Sem 2', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Sem 3', entradas: 114195, saidas: 58640, saldo: 55555 },
      { mes: 'Sem 4', entradas: 114195, saidas: 58640, saldo: 55555 }
    ];
  };
  
  const cashFlowData = getCashFlowData();

  const expenseCategories = [
    { name: 'Folha de Pagamento', value: 120000, color: '#3B82F6' },
    { name: 'Fornecedores', value: 80000, color: '#10B981' },
    { name: 'Impostos', value: 45000, color: '#F59E0B' },
    { name: 'Operacional', value: 35000, color: '#EF4444' },
    { name: 'Marketing', value: 25000, color: '#8B5CF6' }
  ];

  const monthlyComparison = [
    { categoria: 'Receitas', atual: 456780, anterior: 420000, meta: 500000 },
    { categoria: 'Despesas', atual: 234560, anterior: 280000, meta: 200000 },
    { categoria: 'Lucro', atual: 222220, anterior: 140000, meta: 300000 }
  ];

  // Utility to calculate status and days
  const calculateStatus = (vencimentoDate: Date) => {
    const hoje = new Date();
    const diffTime = vencimentoDate.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const status = diffDays < 0 ? 'vencido' : diffDays <= 5 ? 'vencendo' : 'normal';
    return { status, dias: diffDays };
  };

  // Utility to extract numeric value from BRL string
  const extractValue = (valorStr: string) => {
    return parseFloat(valorStr.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
  };

  // Utility to format BRL
  const formatBRL = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  // Calculate dynamic financial data
  const calculateFinancialData = () => {
    const totalReceitas = movimentacoes
      .filter(mov => mov.tipo === 'entrada')
      .reduce((sum, mov) => sum + extractValue(mov.valor), 0);
    
    const totalDespesas = movimentacoes
      .filter(mov => mov.tipo === 'saida')
      .reduce((sum, mov) => sum + extractValue(mov.valor), 0);
    
    const totalReceber = contasReceber
      .reduce((sum, conta) => sum + extractValue(conta.valor), 0);
    
    const totalPagar = contasPagar
      .reduce((sum, conta) => sum + extractValue(conta.valor), 0);
    
    const saldoTotal = 2847650 + totalReceitas - totalDespesas; // Base + dynamic
    const lucroLiquido = totalReceitas - totalDespesas;
    
    return {
      saldoTotal: formatBRL(saldoTotal),
      receitasMes: formatBRL(totalReceitas),
      despesasMes: formatBRL(totalDespesas),
      lucroLiquido: formatBRL(lucroLiquido),
      contasReceber: formatBRL(totalReceber),
      contasPagar: formatBRL(totalPagar),
      fluxoCaixa: lucroLiquido > 0 ? `+${((lucroLiquido/totalDespesas)*100).toFixed(1)}%` : `${((lucroLiquido/totalDespesas)*100).toFixed(1)}%`
    };
  };

  // Dynamic financial data
  const financialData = calculateFinancialData();

  // Add new transaction function
  const addTransaction = (transaction: any) => {
    setMovimentacoes([transaction, ...movimentacoes]);
    toast({
      title: "Transação Adicionada",
      description: `Nova transação de ${transaction.tipo} no valor de ${transaction.valor} foi registrada.`
    });
  };

  // Add new receivable function
  const addReceivable = (receivable: any) => {
    setContasReceber([receivable, ...contasReceber]);
    toast({
      title: "Conta a Receber Adicionada",
      description: `Nova conta a receber de ${receivable.cliente} no valor de ${receivable.valor} foi registrada.`
    });
  };

  // Add new payable function
  const addPayable = (payable: any) => {
    setContasPagar([payable, ...contasPagar]);
    toast({
      title: "Conta a Pagar Adicionada",
      description: `Nova conta a pagar para ${payable.fornecedor} no valor de ${payable.valor} foi registrada.`
    });
  };

  // Export comprehensive PDF function
  const exportPDF = () => {
    toast({
      title: "Gerando Relatório...",
      description: "Compilando todas as informações gráficas e dados financeiros."
    });
    
    // Generate comprehensive report content
    const generateReportContent = () => {
      const currentDate = new Date().toLocaleDateString('pt-BR');
      const currentTime = new Date().toLocaleTimeString('pt-BR');
      
      let content = `RELATÓRIO FINANCEIRO TECHSOLUTIONS\n`;
      content += `Data: ${currentDate} - ${currentTime}\n`;
      content += `Período: ${selectedPeriod === 'mes' ? 'Mensal' : selectedPeriod === 'trimestre' ? 'Trimestral' : 'Anual'}\n\n`;
      
      // Financial Summary
      content += `=== RESUMO FINANCEIRO ===\n`;
      content += `Saldo Total: ${financialData.saldoTotal}\n`;
      content += `Receitas do Mês: ${financialData.receitasMes}\n`;
      content += `Despesas do Mês: ${financialData.despesasMes}\n`;
      content += `Lucro Líquido: ${financialData.lucroLiquido}\n`;
      content += `Total a Receber: ${financialData.contasReceber}\n`;
      content += `Total a Pagar: ${financialData.contasPagar}\n`;
      content += `Variação Fluxo de Caixa: ${financialData.fluxoCaixa}\n\n`;
      
      // Cash Flow Data
      content += `=== FLUXO DE CAIXA (${selectedPeriod.toUpperCase()}) ===\n`;
      cashFlowData.forEach((item, index) => {
        content += `${item.mes}: Entradas R$ ${item.entradas.toLocaleString('pt-BR')}, Saídas R$ ${item.saidas.toLocaleString('pt-BR')}, Saldo R$ ${item.saldo.toLocaleString('pt-BR')}\n`;
      });
      content += `\n`;
      
      // Financial Indicators
      content += `=== INDICADORES FINANCEIROS ===\n`;
      indicators.forEach(indicator => {
        content += `${indicator.nome}: ${indicator.valor} (${indicator.variacao})\n`;
      });
      content += `\n`;
      
      // Expense Categories
      content += `=== CATEGORIAS DE DESPESAS ===\n`;
      expenseCategories.forEach(category => {
        content += `${category.name}: R$ ${category.value.toLocaleString('pt-BR')}\n`;
      });
      content += `\n`;
      
      // Monthly Comparison
      content += `=== COMPARAÇÃO MENSAL ===\n`;
      monthlyComparison.forEach(item => {
        content += `${item.categoria}: Atual R$ ${item.atual.toLocaleString('pt-BR')}, Anterior R$ ${item.anterior.toLocaleString('pt-BR')}, Meta R$ ${item.meta.toLocaleString('pt-BR')}\n`;
      });
      content += `\n`;
      
      // Accounts Receivable
      content += `=== CONTAS A RECEBER ===\n`;
      contasReceber.forEach((conta, index) => {
        content += `${index + 1}. ${conta.cliente} - ${conta.valor} - Venc: ${conta.vencimento} - Status: ${conta.status === 'vencido' ? 'Vencida' : conta.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}\n`;
      });
      content += `\n`;
      
      // Accounts Payable
      content += `=== CONTAS A PAGAR ===\n`;
      contasPagar.forEach((conta, index) => {
        content += `${index + 1}. ${conta.fornecedor} - ${conta.valor} - Venc: ${conta.vencimento} - Cat: ${conta.categoria} - Status: ${conta.status === 'vencido' ? 'Vencida' : conta.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}\n`;
      });
      content += `\n`;
      
      // Recent Movements
      content += `=== MOVIMENTAÇÕES RECENTES ===\n`;
      movimentacoes.forEach((mov, index) => {
        content += `${index + 1}. ${mov.tipo.toUpperCase()} - ${mov.descricao} - ${mov.valor} - ${mov.data} - Cat: ${mov.categoria}\n`;
      });
      content += `\n`;
      
      content += `\n--- Relatório gerado automaticamente pelo FinanceMax TechSolutions ---`;
      
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
    <title>Relatório Financeiro TechSolutions</title>
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
        .status-vencido { color: #ef4444; font-weight: bold; }
        .status-vencendo { color: #f59e0b; font-weight: bold; }
        .status-normal { color: #10b981; font-weight: bold; }
        @media print { body { margin: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>RELATÓRIO FINANCEIRO</h1>
        <h2>TechSolutions</h2>
        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')} | <strong>Período:</strong> ${selectedPeriod === 'mes' ? 'Mensal' : selectedPeriod === 'trimestre' ? 'Trimestral' : 'Anual'}</p>
    </div>

    <div class="section">
        <h2>RESUMO FINANCEIRO</h2>
        <div class="summary">
            <div class="summary-item"><strong>Saldo Total:</strong> ${financialData.saldoTotal}</div>
            <div class="summary-item"><strong>Receitas:</strong> ${financialData.receitasMes}</div>
            <div class="summary-item"><strong>Despesas:</strong> ${financialData.despesasMes}</div>
            <div class="summary-item"><strong>Lucro Líquido:</strong> ${financialData.lucroLiquido}</div>
            <div class="summary-item"><strong>A Receber:</strong> ${financialData.contasReceber}</div>
            <div class="summary-item"><strong>A Pagar:</strong> ${financialData.contasPagar}</div>
        </div>
    </div>

    <div class="section">
        <h2>FLUXO DE CAIXA</h2>
        <table>
            <tr><th>Período</th><th>Entradas</th><th>Saídas</th><th>Saldo</th></tr>
            ${cashFlowData.map(item => `<tr><td>${item.mes}</td><td class="entrada">R$ ${item.entradas.toLocaleString('pt-BR')}</td><td class="saida">R$ ${item.saidas.toLocaleString('pt-BR')}</td><td><strong>R$ ${item.saldo.toLocaleString('pt-BR')}</strong></td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>INDICADORES FINANCEIROS</h2>
        <div class="summary">
            ${indicators.map(ind => `<div class="summary-item"><strong>${ind.nome}:</strong> ${ind.valor} (${ind.variacao})</div>`).join('')}
        </div>
    </div>

    <div class="section">
        <h2>CONTAS A RECEBER</h2>
        <table>
            <tr><th>Cliente</th><th>Valor</th><th>Vencimento</th><th>Status</th></tr>
            ${contasReceber.map(c => `<tr><td>${c.cliente}</td><td><strong>${c.valor}</strong></td><td>${c.vencimento}</td><td class="status-${c.status}">${c.status === 'vencido' ? 'Vencida' : c.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}</td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>CONTAS A PAGAR</h2>
        <table>
            <tr><th>Fornecedor</th><th>Valor</th><th>Vencimento</th><th>Categoria</th><th>Status</th></tr>
            ${contasPagar.map(c => `<tr><td>${c.fornecedor}</td><td><strong>${c.valor}</strong></td><td>${c.vencimento}</td><td>${c.categoria}</td><td class="status-${c.status}">${c.status === 'vencido' ? 'Vencida' : c.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}</td></tr>`).join('')}
        </table>
    </div>

    <div class="section">
        <h2>MOVIMENTAÇÕES RECENTES</h2>
        <table>
            <tr><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Data</th><th>Categoria</th></tr>
            ${movimentacoes.map(m => `<tr><td class="${m.tipo}">${m.tipo.toUpperCase()}</td><td>${m.descricao}</td><td><strong>${m.valor}</strong></td><td>${m.data}</td><td>${m.categoria}</td></tr>`).join('')}
        </table>
    </div>

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <p><strong>Relatório gerado automaticamente pelo FinanceMax TechSolutions</strong></p>
        <p><em>Para salvar como PDF: Pressione Ctrl+P e selecione "Salvar como PDF"</em></p>
    </div>
</body>
</html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-financeiro-completo-${new Date().toISOString().slice(0, 10)}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      
      createDetailedPDF();
      
      toast({
        title: "Relatório HTML Gerado",
        description: `Relatório completo baixado! Abra o arquivo .html no navegador e pressione Ctrl+P para salvar como PDF.`
      });
    }, 1500);
  };

  const indicators = [
    { nome: "ROI", valor: "23.5%", variacao: "+2.1%", status: "up" },
    { nome: "Margem Líquida", valor: "18.7%", variacao: "+1.3%", status: "up" },
    { nome: "Liquidez Corrente", valor: "2.4", variacao: "-0.2", status: "down" },
    { nome: "Giro do Ativo", valor: "1.8", variacao: "+0.1", status: "up" }
  ];

  return (
    <AppShell
      title="FinancePro - TechSolutions"
      subtitle="Financial Edition"
      systemIcon="fas fa-chart-bar"
      systemColor="from-purple-600 to-purple-500"
      backHref="/sistema/financial"
      statusBadge="Sistema Financeiro"
      navItems={navItems}
      currentUser="Período Fiscal: Nov 2024"
    >
      {/* Custom Systems Message */}
      <div className="mb-6">
        <CustomSystemsMessage variant="compact" />
      </div>
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Dashboard Financeiro</h2>
                    <p className="text-blue-200">Visão geral da situação financeira da empresa</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select 
                      value={selectedPeriod} 
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="bg-blue-700/50 text-white border border-blue-600 rounded-lg px-3 py-2 text-sm"
                      data-testid="select-period"
                    >
                      <option value="mes">Este Mês</option>
                      <option value="trimestre">Trimestre</option>
                      <option value="ano">Este Ano</option>
                    </select>
                    <button 
                      onClick={() => {
                        // Simulate data refresh by toggling a state
                        setSelectedPeriod(selectedPeriod);
                        alert('Dados atualizados com sucesso!');
                      }} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      data-testid="button-refresh"
                    >
                      <i className="fas fa-sync-alt mr-2"></i>
                      Atualizar
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
                    <p className="text-blue-200 text-sm">Saldo Total</p>
                    <div className="mt-2 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      Clique para ver fluxo de caixa
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
                    <p className="text-blue-200 text-sm">Receitas do Mês</p>
                    <p className="text-blue-300 text-xs mt-2">
                      <i className="fas fa-plus mr-1"></i>
                      Entradas confirmadas
                    </p>
                    <div className="mt-1 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      Ver contas a receber
                    </div>
                  </div>

                  <div 
                    className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg hover:bg-blue-800/40 transition-all cursor-pointer"
                    onClick={() => setSelectedModule('contas')}
                    data-testid="card-despesas"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-down text-white"></i>
                      </div>
                      <span className="text-red-400 text-sm font-medium">-8.1%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{financialData.despesasMes}</h3>
                    <p className="text-blue-200 text-sm">Despesas do Mês</p>
                    <p className="text-red-400 text-xs mt-2">
                      <i className="fas fa-minus mr-1"></i>
                      Saídas confirmadas
                    </p>
                    <div className="mt-1 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      Ver contas a pagar
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
                    <p className="text-blue-200 text-sm">Lucro Líquido</p>
                    <div className="mt-2 text-xs text-blue-300">
                      <i className="fas fa-mouse-pointer mr-1"></i>
                      Ver relatórios detalhados
                    </div>
                  </div>
                </div>

                {/* Interactive Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-chart-area mr-2 text-blue-400"></i>
                      Fluxo de Caixa (5 meses)
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
                          formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
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
                      Distribuição de Despesas
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
                          formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
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
                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
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
                      Contas a Receber
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
                              conta.status === 'vencido' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'vencendo' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {conta.status === 'vencido' ? `${Math.abs(conta.dias)}d atraso` :
                               conta.status === 'vencendo' ? `${conta.dias}d restantes` :
                               `${conta.dias}d restantes`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-600/30">
                      <div className="flex justify-between">
                        <span className="font-medium text-white">Total a Receber:</span>
                        <span className="font-bold text-emerald-400">{financialData.contasReceber}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedModule('contas')} 
                        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-view-receivables"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        Ver Detalhes
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 raleway flex items-center">
                      <i className="fas fa-arrow-down mr-2 text-red-400"></i>
                      Contas a Pagar
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
                              conta.status === 'vencido' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'vencendo' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {conta.status === 'vencido' ? 'Vencida' : conta.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-600/30">
                      <div className="flex justify-between">
                        <span className="font-medium text-white">Total a Pagar:</span>
                        <span className="font-bold text-red-400">{financialData.contasPagar}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedModule('contas')} 
                        className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm transition-colors"
                        data-testid="button-view-payables"
                      >
                        <i className="fas fa-eye mr-2"></i>
                        Ver Detalhes
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
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Receitas</h2>
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
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Evolução do Fluxo de Caixa</h3>
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
                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
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
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Despesas</h2>
                    <p className="text-blue-200">Controle de despesas e contas a pagar</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowReceivableModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-receivable"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Nova Conta a Receber
                    </button>
                    <button 
                      onClick={() => setShowPayableModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-payable"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Nova Conta a Pagar
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
                        <p className="text-blue-200 text-sm">Total a Receber</p>
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
                        <p className="text-blue-200 text-sm">Total a Pagar</p>
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
                      Contas a Receber
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
                              conta.status === 'vencido' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'vencendo' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {conta.status === 'vencido' ? 'Vencida' : conta.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}
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
                      Contas a Pagar
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
                              conta.status === 'vencido' ? 'bg-red-500/20 text-red-300' :
                              conta.status === 'vencendo' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {conta.status === 'vencido' ? 'Vencida' : conta.status === 'vencendo' ? 'Vencendo' : 'No Prazo'}
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
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Investimentos</h2>
                    <p className="text-blue-200">Controle e acompanhamento de investimentos</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toast({title: "Em Desenvolvimento", description: "Módulo de investimentos em breve!"})}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-add-investment"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Novo Investimento
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
                    <h3 className="text-2xl font-bold text-white mb-1">R$ 125.450</h3>
                    <p className="text-blue-200 text-sm">Portfolio Total</p>
                  </div>
                  
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-arrow-trend-up text-white"></i>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+15.2%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">R$ 18.750</h3>
                    <p className="text-blue-200 text-sm">Rendimento Mês</p>
                  </div>
                  
                  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-xl border border-blue-600/20 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-coins text-white"></i>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">7 ativos</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">67%</h3>
                    <p className="text-blue-200 text-sm">Diversificação</p>
                  </div>
                </div>

                {/* Investment Breakdown */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-600/20 shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 raleway">Distribuição de Investimentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[
                        { tipo: "Renda Fixa", valor: "R$ 45.200", percent: "36%", color: "bg-blue-500" },
                        { tipo: "Ações", valor: "R$ 38.900", percent: "31%", color: "bg-green-500" },
                        { tipo: "Fundos", valor: "R$ 28.750", percent: "23%", color: "bg-purple-500" },
                        { tipo: "Cripto", valor: "R$ 12.600", percent: "10%", color: "bg-yellow-500" }
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
                        <p className="text-lg font-medium">Portfolio bem diversificado</p>
                        <p className="text-sm">Baixo risco, bom potencial de retorno</p>
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
                    <h2 className="text-2xl font-bold text-white mb-2 raleway">Relatórios Financeiros</h2>
                    <p className="text-blue-200">Análises e relatórios detalhados</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={exportPDF}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors" 
                      data-testid="button-generate-report"
                    >
                      <i className="fas fa-download mr-2"></i>
                      Exportar PDF
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
                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
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
                      {selectedAccount.cliente ? 'Detalhes da Conta a Receber' : 'Detalhes da Conta a Pagar'}
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
                        <p className="text-blue-200 text-sm mb-1">{selectedAccount.cliente ? 'Cliente' : 'Fornecedor'}</p>
                        <p className="text-white font-semibold">{selectedAccount.cliente || selectedAccount.fornecedor}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Valor</p>
                        <p className="text-white font-bold text-lg">{selectedAccount.valor}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Vencimento</p>
                        <p className="text-white">{selectedAccount.vencimento}</p>
                      </div>
                      <div>
                        <p className="text-blue-200 text-sm mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedAccount.status === 'vencido' ? 'bg-red-500/20 text-red-300' :
                          selectedAccount.status === 'vencendo' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {selectedAccount.status === 'vencido' ? 'Vencida' :
                           selectedAccount.status === 'vencendo' ? 'Vencendo' :
                           'No Prazo'}
                        </span>
                      </div>
                      {selectedAccount.categoria && (
                        <div className="col-span-2">
                          <p className="text-blue-200 text-sm mb-1">Categoria</p>
                          <p className="text-white">{selectedAccount.categoria}</p>
                        </div>
                      )}
                      {selectedAccount.dias !== undefined && (
                        <div className="col-span-2">
                          <p className="text-blue-200 text-sm mb-1">Situação</p>
                          <p className="text-white">
                            {selectedAccount.status === 'vencido' ? 
                              `${Math.abs(selectedAccount.dias)} dias em atraso` :
                              `${selectedAccount.dias} dias restantes`}
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
                        {selectedAccount.cliente ? 'Entrar em Contato' : 'Pagar Conta'}
                      </button>
                      <button 
                        onClick={closeAccountModal}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-close"
                      >
                        Fechar
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
                    <h3 className="text-xl font-bold text-white raleway">Nova Transação</h3>
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
                        <label className="block text-blue-200 text-sm mb-2">Tipo</label>
                        <select name="tipo" required className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white">
                          <option value="entrada">Entrada</option>
                          <option value="saida">Saída</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-blue-200 text-sm mb-2">Valor</label>
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
                      <label className="block text-blue-200 text-sm mb-2">Descrição</label>
                      <input 
                        name="descricao" 
                        type="text" 
                        required 
                        placeholder="Ex: Pagamento de cliente" 
                        className="w-full bg-blue-700/30 border border-blue-600/30 rounded-lg px-3 py-2 text-white placeholder-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-200 text-sm mb-2">Categoria</label>
                      <input 
                        name="categoria" 
                        type="text" 
                        required 
                        placeholder="Ex: Vendas, Compras, etc." 
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
                        Adicionar Transação
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowTransactionModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-transaction"
                      >
                        Cancelar
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
                    <h3 className="text-xl font-bold text-white raleway">Nova Conta a Receber</h3>
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
                      <label className="block text-blue-200 text-sm mb-2">Cliente</label>
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
                        <label className="block text-blue-200 text-sm mb-2">Valor</label>
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
                        <label className="block text-blue-200 text-sm mb-2">Vencimento</label>
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
                        Adicionar Conta a Receber
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowReceivableModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-receivable"
                      >
                        Cancelar
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
                    <h3 className="text-xl font-bold text-white raleway">Nova Conta a Pagar</h3>
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
                      <label className="block text-blue-200 text-sm mb-2">Fornecedor</label>
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
                        <label className="block text-blue-200 text-sm mb-2">Valor</label>
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
                        <label className="block text-blue-200 text-sm mb-2">Vencimento</label>
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
                        Adicionar Conta a Pagar
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowPayableModal(false)}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                        data-testid="button-cancel-payable"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
    </AppShell>
  );
}