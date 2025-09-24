import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  Wallet, 
  Building2, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Target,
  Zap
} from 'lucide-react';
import StandaloneDashboard from './standalone-dashboard';


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: '👋 Olá! Sou seu assistente financeiro. Posso ajudar a registrar suas despesas e receitas de forma rápida e simples.',
      time: '14:30'
    },
    {
      id: 2,
      type: 'agent',
      text: 'Experimente enviar uma despesa, como "Despesa 50 restaurante" ou uma receita como "Recebi 2000 de salário".',
      time: '14:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'expense',
      value: '80,00',
      category: 'Supermercado',
      date: new Date().toLocaleDateString('pt-BR'),
      time: '14:32'
    },
    {
      id: 2,
      type: 'income',
      value: '2000,00',
      category: 'Salário',
      date: new Date().toLocaleDateString('pt-BR'),
      time: '09:15'
    }
  ]);

  // Estados para o chat automatizado de demonstração
  const [demoMessages, setDemoMessages] = useState([
    {
      id: 1,
      type: 'agent',
      text: '👋 Demonstração automática do VoxCash Agent em ação!',
      time: '14:25'
    }
  ]);
  const [demoIsTyping, setDemoIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoRunCount, setDemoRunCount] = useState(0);









  // Sistema automatizado de demonstração
  useEffect(() => {
    const demoSequence = [
      {
        delay: 2000,
        userMessage: 'Despesa 45 restaurante',
        agentResponse: '✅ Perfeito! Registrei uma despesa de R$ 45,00 na categoria Restaurante.\n\nA transação já aparece no seu dashboard!'
      },
      {
        delay: 4000,
        userMessage: 'Recebi 3500 de salário',
        agentResponse: '💰 Excelente! Registrei uma receita de R$ 3500,00 na categoria Salário.\n\nSeu saldo foi atualizado!'
      },
      {
        delay: 6000,
        userMessage: 'Gastei 120 supermercado',
        agentResponse: '✅ Perfeito! Registrei uma despesa de R$ 120,00 na categoria Supermercado.\n\nA transação já aparece no seu dashboard!'
      },
      {
        delay: 8000,
        userMessage: 'Quero ver meu resumo',
        agentResponse: '📊 Aqui está seu resumo financeiro:\n\n💰 Receitas: R$ 3.500,00\n💸 Despesas: R$ 165,00\n💵 Saldo: R$ 3.335,00\n\n📈 Você está positivo este mês!'
      },
      {
        delay: 10000,
        userMessage: 'Mostrar últimas despesas',
        agentResponse: '💸 Últimas Despesas:\n\n💸 R$ 120,00 - Supermercado\n   ' + new Date().toLocaleDateString('pt-BR') + ' às 14:35\n\n💸 R$ 45,00 - Restaurante\n   ' + new Date().toLocaleDateString('pt-BR') + ' às 14:33'
      }
    ];

    const runDemo = () => {
      if (demoStep < demoSequence.length) {
        const currentDemo = demoSequence[demoStep];
        
        setTimeout(() => {
          // Adicionar mensagem do usuário
          const userMsg = {
            id: Date.now(),
            type: 'user',
            text: currentDemo.userMessage,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          };
          
          setDemoMessages(prev => [...prev, userMsg]);
          setDemoIsTyping(true);
          
          // Simular processamento e resposta do agente
          setTimeout(() => {
            const agentMsg = {
              id: Date.now() + 1,
              type: 'agent',
              text: currentDemo.agentResponse,
              time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
            
            setDemoMessages(prev => [...prev, agentMsg]);
            setDemoIsTyping(false);
            setDemoStep(prev => prev + 1);
          }, 1500);
          
        }, currentDemo.delay);
      } else {
        // Verificar se já executou 2 vezes
        if (demoRunCount < 2) {
          // Reiniciar demonstração após completar
          setTimeout(() => {
            setDemoMessages([{
              id: 1,
              type: 'agent',
              text: '👋 Demonstração automática do VoxCash Agent em ação!',
              time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }]);
            setDemoStep(0);
            setDemoRunCount(prev => prev + 1);
          }, 5000);
        } else {
          // Parar demo após 2 execuções
          setTimeout(() => {
            setDemoMessages(prev => [...prev, {
              id: Date.now(),
              type: 'agent',
              text: '✅ Demonstração concluída! Recarregue a página para ver novamente.',
              time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }]);
          }, 2000);
        }
      }
    };

    runDemo();
  }, [demoStep]);

  const formatTransactionHistory = (transactionList, type = 'all') => {
    let filteredTransactions = transactionList;
    
    if (type === 'expense') {
      filteredTransactions = transactionList.filter(t => t.type === 'expense');
    } else if (type === 'income') {
      filteredTransactions = transactionList.filter(t => t.type === 'income');
    }

    if (filteredTransactions.length === 0) {
      return type === 'expense' ? 
        '📝 Nenhuma despesa registrada ainda.' : 
        type === 'income' ? 
        '📝 Nenhuma receita registrada ainda.' :
        '📝 Nenhuma transação registrada ainda.';
    }

    const title = type === 'expense' ? 
      '💸 Últimas Despesas:' : 
      type === 'income' ? 
      '💰 Últimas Receitas:' :
      '📊 Últimas Transações:';

    const items = filteredTransactions.slice(0, 5).map(transaction => {
      const icon = transaction.type === 'expense' ? '💸' : '💰';
      return `${icon} R$ ${transaction.value} - ${transaction.category}\n   ${transaction.date} às ${transaction.time}`;
    }).join('\n\n');

    return `${title}\n\n${items}`;
  };

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Detectar tipo de transação
    if (lowerMessage.includes('despesa') || lowerMessage.includes('gastei') || lowerMessage.includes('paguei')) {
      const value = extractValue(message);
      const category = extractCategory(message);
      return {
        type: 'expense',
        value,
        category,
        response: `✅ Perfeito! Registrei uma despesa de R$ ${value} na categoria ${category}.\n\nA transação já aparece no seu dashboard!`
      };
    } else if (lowerMessage.includes('receita') || lowerMessage.includes('recebi') || lowerMessage.includes('ganho')) {
      const value = extractValue(message);
      const category = extractCategory(message, 'receita');
      return {
        type: 'income',
        value,
        category,
        response: `💰 Excelente! Registrei uma receita de R$ ${value} na categoria ${category}.\n\nSeu saldo foi atualizado!`
      };
    } else if (lowerMessage.includes('resumo') || lowerMessage.includes('saldo') || lowerMessage.includes('relatório')) {
      const totalReceitas = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.value.replace(',', '.')), 0);
      const totalDespesas = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.value.replace(',', '.')), 0);
      const saldo = totalReceitas - totalDespesas;
      
      return {
        type: 'summary',
        response: `📊 Aqui está seu resumo financeiro:\n\n💰 Receitas: R$ ${totalReceitas.toFixed(2).replace('.', ',')}\n💸 Despesas: R$ ${totalDespesas.toFixed(2).replace('.', ',')}\n💵 Saldo: R$ ${saldo.toFixed(2).replace('.', ',')}\n\n📈 Você está ${saldo > 0 ? 'positivo' : 'negativo'} este mês!`
      };
    } else if (lowerMessage.includes('despesas') || lowerMessage.includes('últimas despesas') || lowerMessage.includes('historico despesa')) {
      return {
        type: 'history',
        response: formatTransactionHistory(transactions, 'expense')
      };
    } else if (lowerMessage.includes('receitas') || lowerMessage.includes('últimas receitas') || lowerMessage.includes('historico receita')) {
      return {
        type: 'history',
        response: formatTransactionHistory(transactions, 'income')
      };
    } else if (lowerMessage.includes('histórico') || lowerMessage.includes('historico') || lowerMessage.includes('transações') || lowerMessage.includes('transacoes')) {
      return {
        type: 'history',
        response: formatTransactionHistory(transactions, 'all')
      };
    } else if (lowerMessage.includes('como funciona') || lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
      return {
        type: 'help',
        response: `🤖 Como usar o VoxCash Agente:\n\n💸 Para despesas: "Despesa 50 restaurante"\n💰 Para receitas: "Recebi 2000 salário"\n📊 Para resumo: "Quero ver meu saldo"\n📝 Ver últimas despesas: "Mostrar despesas"\n💰 Ver últimas receitas: "Mostrar receitas"\n📋 Ver histórico: "Mostrar histórico"\n\nO agente identifica automaticamente valores, categorias e registra tudo no seu dashboard!`
      };
    } else {
      return {
        type: 'help',
        response: `🤔 Não consegui identificar o tipo de transação. Tente algo como:\n\n• "Despesa 50 restaurante"\n• "Recebi 2000 de salário"\n• "Gastei 80 supermercado"\n• "Quero ver meu resumo"`
      };
    }
  };

  const extractValue = (message) => {
    const match = message.match(/(\d+(?:,\d{2})?)/);
    return match ? match[1].replace(',', '.') : '0,00';
  };

  const extractCategory = (message, type = 'despesa') => {
    const categories = {
      despesa: {
        'restaurante': 'Restaurante',
        'supermercado': 'Supermercado',
        'combustivel': 'Combustível',
        'farmacia': 'Farmácia',
        'transporte': 'Transporte',
        'lazer': 'Lazer',
        'casa': 'Casa',
        'roupas': 'Roupas'
      },
      receita: {
        'salario': 'Salário',
        'freelance': 'Freelance',
        'vendas': 'Vendas',
        'investimento': 'Investimentos',
        'bonus': 'Bônus'
      }
    };

    const lowerMessage = message.toLowerCase();
    const categoryMap = categories[type] || categories.despesa;
    
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    
    return type === 'receita' ? 'Outras Receitas' : 'Outras Despesas';
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simular processamento
    setTimeout(() => {
      const processed = processMessage(currentMessage);
      
      // Salvar transação no histórico se for despesa ou receita
      if (processed.type === 'expense' || processed.type === 'income') {
        const newTransaction = {
          id: Date.now(),
          type: processed.type,
          value: processed.value,
          category: processed.category,
          date: new Date().toLocaleDateString('pt-BR'),
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setTransactions(prev => [newTransaction, ...prev]);
      }

      const agentResponse = {
        id: Date.now() + 1,
        type: 'agent',
        text: processed.response,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const quickMessages = {
      'despesa': 'Despesa 50 restaurante',
      'receita': 'Recebi 2000 de salário',
      'resumo': 'Quero ver meu resumo financeiro',
      'despesas': 'Mostrar últimas despesas',
      'receitas': 'Mostrar últimas receitas',
      'ajuda': 'Como funciona o VoxCash Agente?'
    };

    setInputMessage(quickMessages[action] || '');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-slate-800 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">VoxCash</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-600 hover:text-orange-500 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-slate-600 hover:text-orange-500 transition-colors">Preços</a>
              <a href="#testimonials" className="text-slate-600 hover:text-orange-500 transition-colors">Depoimentos</a>
              <a href="#faq" className="text-slate-600 hover:text-orange-500 transition-colors">FAQ</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-600 hover:text-slate-800 transition-colors">Login</button>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Teste Grátis
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-4">
                <a href="#features" className="block text-slate-600">Funcionalidades</a>
                <a href="#pricing" className="block text-slate-600">Preços</a>
                <a href="#testimonials" className="block text-slate-600">Depoimentos</a>
                <a href="#faq" className="block text-slate-600">FAQ</a>
                <button className="w-full text-left text-slate-600">Login</button>
                <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg">
                  Teste Grátis
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Controle Financeiro Inteligente para <span className="text-orange-500">Autônomos</span> e Importadores
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Visualize e organize suas finanças em um só painel, com informações essenciais para autônomos e importadores em tempo real.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center">
                  Comece seu teste grátis de 3 dias
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-800 transition-all">
                  Ver demonstração
                </button>
              </div>
              <div className="flex items-center mt-8 space-x-6 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span>Sem compromisso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span>Dados seguros</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span>Suporte completo</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VoxCash Agente Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-cyan-500 p-3 rounded-xl mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
                    Conheça o <span className="text-orange-500">VoxCash Agente</span>
                  </h2>
                  <p className="text-gray-600 text-lg mt-2">Seu assistente financeiro inteligente</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experimente como é simples: envie uma mensagem e tenha sua despesa ou receita 
                registrada automaticamente. Sem formulários, sem complicação.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-lg mr-4 mt-1">
                    <span className="text-orange-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Envie uma mensagem</h3>
                    <p className="text-gray-600">
                      Basta enviar uma mensagem direta para o VoxCash Agente detalhando sua transação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-lg mr-4 mt-1">
                    <span className="text-cyan-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Processamento instantâneo</h3>
                    <p className="text-gray-600">
                      O Agente identifica automaticamente o tipo, valor e categoria da transação.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4 mt-1">
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Registro automático</h3>
                    <p className="text-gray-600">
                      A transação é registrada no sistema e já aparece no seu dashboard e relatórios.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="bg-gradient-to-r from-orange-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center">
                  Experimente o VoxCash Agente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto px-4">
                {/* Chat Interativo */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto w-full h-fit">
                  {/* WhatsApp Header */}
                  <div className="bg-green-600 px-3 py-2 flex items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full flex items-center justify-center mr-2">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-xs">VoxCash Agente</h3>
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-300 rounded-full mr-1"></div>
                          <span className="text-green-100 text-xs">online</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="text-green-100 text-xs font-medium">Interativo</span>
                    </div>
                  </div>

                {/* WhatsApp Messages */}
                <div className="bg-gray-50 p-3 space-y-2 h-64 overflow-y-auto" id="messages-container">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'items-start'}`}>
                      <div className={`p-2 rounded-xl shadow-sm max-w-[180px] ${
                        message.type === 'user' 
                          ? 'bg-green-500 rounded-tr-md' 
                          : 'bg-white rounded-tl-md'
                      }`}>
                        <p className={`text-xs ${
                          message.type === 'user' ? 'text-white font-medium' : 'text-gray-800'
                        }`} style={{ whiteSpace: 'pre-line' }}>
                          {message.text}
                        </p>
                        <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-end'} mt-1`}>
                          <span className={`text-xs ${
                            message.type === 'user' ? 'text-green-100' : 'text-gray-400'
                          }`}>
                            {message.time} {message.type === 'user' ? '✓✓' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                   {isTyping && (
                     <div className="flex items-start">
                       <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm">
                         <div className="flex space-x-1">
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         </div>
                       </div>
                     </div>
                   )}

                 </div>

                {/* WhatsApp Input */}
                <div className="bg-white border-t border-gray-200 p-2">
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                    <input 
                      type="text" 
                      placeholder="Digite uma mensagem..." 
                      className="flex-1 bg-transparent text-xs text-gray-700 placeholder-gray-500 outline-none"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={isTyping}
                    />
                    <button 
                      className="ml-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors disabled:opacity-50"
                      onClick={sendMessage}
                      disabled={isTyping || !inputMessage.trim()}
                    >
                      <ArrowRight className="h-3 w-3 text-white" />
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 px-2 py-2 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <button 
                      className="bg-orange-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('despesa')}
                      disabled={isTyping}
                    >
                      💰 Despesa
                    </button>
                    <button 
                      className="bg-cyan-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-cyan-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('receita')}
                      disabled={isTyping}
                    >
                      💵 Receita
                    </button>
                    <button 
                      className="bg-blue-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('resumo')}
                      disabled={isTyping}
                    >
                      📊 Resumo
                    </button>
                    <button 
                      className="bg-purple-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('despesas')}
                      disabled={isTyping}
                    >
                      📝 Despesas
                    </button>
                    <button 
                      className="bg-green-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('receitas')}
                      disabled={isTyping}
                    >
                      💰 Receitas
                    </button>
                    <button 
                      className="bg-gray-500 text-white py-1.5 px-2 rounded-md font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
                      onClick={() => handleQuickAction('ajuda')}
                      disabled={isTyping}
                    >
                      ❓ Ajuda
                    </button>
                  </div>
                </div>
                </div>

                {/* Chat de Demonstração */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto w-full h-fit">
                  {/* WhatsApp Header */}
                  <div className="bg-blue-600 px-3 py-2 flex items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-xs">VoxCash Demo</h3>
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-1"></div>
                          <span className="text-blue-100 text-xs">demonstração</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="text-blue-100 text-xs font-medium">Automático</span>
                    </div>
                  </div>

                  {/* Demo Messages */}
                  <div className="h-64 overflow-y-auto p-3 bg-gray-50 space-y-2">
                    {demoMessages.map((message) => (
                      <div key={message.id} className={`${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-[180px] p-2 rounded-xl ${
                          message.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white text-gray-800 shadow-sm'
                        }`}>
                          <p className="text-xs whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {demoIsTyping && (
                      <div className="text-left">
                        <div className="inline-block bg-white p-2 rounded-xl shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    

                  </div>

                  {/* Demo Input (disabled) */}
                  <div className="bg-white px-3 py-2 border-t border-gray-200">
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        placeholder="Demo automática..."
                        className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 text-xs bg-gray-100"
                        disabled
                      />
                      <button 
                        className="ml-2 w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center"
                        disabled
                      >
                        <ArrowRight className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Demo Status */}
                  <div className="bg-blue-50 px-3 py-1.5 border-t border-blue-200">
                    <p className="text-xs text-blue-600 text-center font-medium">
                      🤖 Demo automática em ação!
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp floating button */}
              <div className="absolute -bottom-4 -right-4 lg:-right-8">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Visualize suas Finanças em <span className="text-orange-500">Tempo Real</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dashboard inteligente que se adapta ao seu perfil - seja pessoal ou empresarial. 
              Acompanhe métricas essenciais e tome decisões baseadas em dados.
            </p>
          </div>

          {/* Dashboard Component */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <StandaloneDashboard 
              mode="business" 
              showModeToggle={true}
              className="min-h-[600px]"
            />
          </div>

          {/* Dashboard Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Métricas em Tempo Real</h3>
              <p className="text-gray-600">
                Acompanhe receitas, despesas e saldo atualizado automaticamente conforme suas transações.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Modo Duplo</h3>
              <p className="text-gray-600">
                Alterne entre visão pessoal e empresarial com um clique. Cada modo com métricas específicas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Análise Inteligente</h3>
              <p className="text-gray-600">
                Gráficos e indicadores que transformam seus números em insights acionáveis para crescer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Por que escolher o VoxCash?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desenvolvido para quem busca controle total sobre suas finanças com a simplicidade que você merece
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">100% Seguro</h3>
              <p className="text-gray-600">Seus dados protegidos com criptografia de nível bancário e backup automático em nuvem.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Super Rápido</h3>
              <p className="text-gray-600">Interface otimizada que permite gerenciar suas finanças em poucos cliques, sem complicação.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Relatórios Visuais</h3>
              <p className="text-gray-600">Gráficos inteligentes que transformam seus números em insights acionáveis.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Suporte Especializado</h3>
              <p className="text-gray-600">Equipe de especialistas prontos para te ajudar a otimizar suas finanças.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Foque no que Importa</h3>
              <p className="text-gray-600">Automações inteligentes que cuidam do operacional enquanto você foca no estratégico.</p>
            </div>

            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Resultados Comprovados</h3>
              <p className="text-gray-600">Usuários economizam em média 30% mais e aumentam lucros em até 25%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Funcionalidades Poderosas para Cada Necessidade
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o modo que melhor se adapta ao seu perfil
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Modo Pessoal */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Wallet className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Modo Pessoal</h3>
                  <p className="text-gray-600">Para pessoas físicas</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Controle de Receitas e Despesas</span>
                    <p className="text-gray-600 text-sm mt-1">Categorização automática e manual de transações</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Gestão de Orçamento Mensal</span>
                    <p className="text-gray-600 text-sm mt-1">Definição de limites e alertas inteligentes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Controle de Dívidas</span>
                    <p className="text-gray-600 text-sm mt-1">Acompanhamento de parcelamentos e financiamentos</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Metas Financeiras</span>
                    <p className="text-gray-600 text-sm mt-1">Planejamento e acompanhamento de objetivos</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Relatórios Personalizados</span>
                    <p className="text-gray-600 text-sm mt-1">Análises detalhadas do seu comportamento financeiro</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Modo Empresarial */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                  <Building2 className="h-8 w-8 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Modo Empresarial</h3>
                  <p className="text-gray-600">Para empresas e negócios</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Gestão Completa de Produtos</span>
                    <p className="text-gray-600 text-sm mt-1">Controle de estoque e precificação inteligente</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Controle de Custos Avançado</span>
                    <p className="text-gray-600 text-sm mt-1">Compras, frete, impostos e marketing</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Análise de Rentabilidade</span>
                    <p className="text-gray-600 text-sm mt-1">ROI por produto, cliente e campanha</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">CRM Integrado</span>
                    <p className="text-gray-600 text-sm mt-1">Acompanhamento de vendas e relacionamento</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-800">Dashboard Executivo</span>
                    <p className="text-gray-600 text-sm mt-1">KPIs e métricas essenciais em tempo real</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Planos que se adaptam ao seu crescimento
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis por 3 dias, depois escolha o plano ideal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Teste Grátis */}
            <div className={`bg-gradient-to-br from-green-50 to-emerald-50 border-2 rounded-2xl p-8 hover:shadow-lg transition-all ${selectedPlan === 'trial' ? 'border-green-500 shadow-lg' : 'border-green-200'}`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Teste Grátis</h3>
                <div className="text-4xl font-bold text-green-800 mb-2">
                  R$ 0<span className="text-lg text-green-600">,00</span>
                </div>
                <p className="text-green-700">3 dias para experimentar</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Acesso completo por 3 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Todas as funcionalidades</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Sem cartão de crédito</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Cancele quando quiser</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Suporte incluído</span>
                </li>
              </ul>

              <button 
                onClick={() => setSelectedPlan('trial')}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Começar Teste Grátis
              </button>
            </div>

            {/* Plano Básico */}
            <div className={`bg-white border-2 rounded-2xl p-8 hover:shadow-lg transition-all ${selectedPlan === 'basic' ? 'border-orange-500 shadow-lg' : 'border-gray-200'}`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Plano Básico</h3>
                <div className="text-4xl font-bold text-slate-800 mb-2">
                  R$ 19<span className="text-lg text-gray-600">,90/mês</span>
                </div>
                <p className="text-gray-600">Ideal para autônomos iniciantes</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Controle de vendas básico</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Até 1.000 transações/mês</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Relatórios de receitas e despesas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Suporte por email</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Backup em nuvem</span>
                </li>
              </ul>

              <button 
                onClick={() => setSelectedPlan('basic')}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Escolher Básico
              </button>
            </div>

            {/* Plano Premium */}
            <div className={`bg-white border-2 rounded-2xl p-8 hover:shadow-lg transition-all relative ${selectedPlan === 'premium' ? 'border-cyan-500 shadow-lg' : 'border-gray-200'}`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Mais Popular
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Plano Premium</h3>
                <div className="text-4xl font-bold text-slate-800 mb-2">
                  R$ 27<span className="text-lg text-gray-600">,00/mês</span>
                </div>
                <p className="text-gray-600">Para importadores e autônomos avançados</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Controle completo de vendas + importações</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Transações ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Relatórios de lucro e margem</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Integração com bancos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Dashboard de performance</span>
                </li>
              </ul>

              <button 
                onClick={() => setSelectedPlan('premium')}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
              >
                Escolher Premium
              </button>
            </div>
          </div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              O que nossos usuários dizem
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 10.000 autônomos e importadores já organizaram suas vendas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "O VoxCash revolucionou meu negócio. Em 3 meses consegui organizar todas as vendas e aumentar minha margem de lucro em 40%. Recomendo demais!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-semibold">MC</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-slate-800">Maria Clara</div>
                  <div className="text-gray-600 text-sm">Arquiteta</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Como empresário, precisava de uma ferramenta que me desse visão completa do negócio. O VoxCash entrega exatamente isso. Meus lucros aumentaram 25%."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 font-semibold">RS</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-slate-800">Roberto Silva</div>
                  <div className="text-gray-600 text-sm">CEO, TechStart</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Interface super intuitiva e relatórios que realmente fazem diferença. Finalmente consigo entender para onde vai meu dinheiro e como otimizar."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">AP</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-slate-800">Ana Paula</div>
                  <div className="text-gray-600 text-sm">Consultora</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Esclarecemos as principais dúvidas sobre o VoxCash
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Como funciona o teste grátis de 3 dias?
              </h3>
              <p className="text-gray-600">
                Você tem acesso completo a todas as funcionalidades do VoxCash por 3 dias sem custo algum. 
                Não cobramos cartão de crédito no cadastro e você pode cancelar a qualquer momento.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Posso trocar de plano depois?
              </h3>
              <p className="text-gray-600">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Meus dados estão seguros?
              </h3>
              <p className="text-gray-600">
                Absolutamente. Utilizamos criptografia de nível bancário, backup automático em nuvem e 
                seguimos todas as normas da LGPD. Seus dados nunca são compartilhados com terceiros.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Posso integrar com meu banco?
              </h3>
              <p className="text-gray-600">
                No plano Premium, oferecemos integração com os principais bancos do Brasil via Open Banking, 
                permitindo sincronização automática das suas transações.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Qual a diferença entre modo pessoal e empresarial?
              </h3>
              <p className="text-gray-600">
                O modo pessoal foca no controle de finanças individuais, enquanto o empresarial oferece 
                ferramentas avançadas como gestão de produtos, análise de ROI e CRM integrado.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Como funciona o suporte ao cliente?
              </h3>
              <p className="text-gray-600">
                Oferecemos suporte via email para todos os planos, com tempo de resposta de até 24h. 
                Usuários Premium têm acesso a suporte prioritário com resposta em até 4h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Pronto para transformar suas finanças?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de pessoas que já descobriram o poder de ter controle total sobre o dinheiro
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Comece Agora - É Grátis!
            </h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 text-slate-800"
              />
              <input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 text-slate-800"
              />
              <input 
                type="tel" 
                placeholder="Seu WhatsApp (opcional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 text-slate-800"
              />
              <button 
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
              >
                Iniciar Teste Grátis de 3 Dias
              </button>
            </form>
            <p className="text-gray-600 text-sm mt-4">
              ✓ Sem compromisso ✓ Cancele quando quiser ✓ Suporte completo
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">VoxCash</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa de gestão financeira para pessoas físicas e empresas.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demonstração</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Centro de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriais</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>suporte@voxcash.com.br</li>
                <li>(11) 9 9999-9999</li>
                <li>Segunda a Sexta, 9h às 18h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 VoxCash. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;