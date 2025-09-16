import { useState, useEffect } from "react";
import { Link } from "wouter";
import AppShell from "@/components/layout/AppShell";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Student {
  id: number;
  nome: string;
  email: string;
  curso: string;
  progresso: number;
  ultimoAcesso: string;
  status: 'ativo' | 'inativo';
  nota: number;
}

interface Course {
  id: number;
  nome: string;
  categoria: string;
  alunos: number;
  professor: string;
  conclusao: number;
  avaliacao: number;
  status: 'ativo' | 'inativo';
}

interface Evaluation {
  id: number;
  titulo: string;
  curso: string;
  prazo: string;
  entregas: number;
  total: number;
  professor: string;
  status: 'pendente' | 'corrigida';
  nota_media: number;
}

interface Professor {
  id: number;
  nome: string;
  email: string;
  departamento: string;
  disciplinas: string[];
  telefone: string;
  status: 'ativo' | 'inativo';
  dataContratacao: string;
  titulacao: string;
}

export default function DemoEducation() {
  const [selectedModule, setSelectedModule] = useState('dashboard');
  const { toast } = useToast();

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
      id: 'alunos',
      label: 'Alunos',
      icon: 'fas fa-users',
      onClick: () => setSelectedModule('alunos'),
      isActive: selectedModule === 'alunos'
    },
    {
      id: 'cursos',
      label: 'Cursos',
      icon: 'fas fa-book',
      onClick: () => setSelectedModule('cursos'),
      isActive: selectedModule === 'cursos'
    },
    {
      id: 'professores',
      label: 'Professores',
      icon: 'fas fa-chalkboard-teacher',
      onClick: () => setSelectedModule('professores'),
      isActive: selectedModule === 'professores'
    },
    {
      id: 'avaliacoes',
      label: 'Avaliações',
      icon: 'fas fa-clipboard-check',
      onClick: () => setSelectedModule('avaliacoes'),
      isActive: selectedModule === 'avaliacoes'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: 'fas fa-chart-line',
      onClick: () => setSelectedModule('relatorios'),
      isActive: selectedModule === 'relatorios'
    }
  ];

  // State for data management
  const [students, setStudents] = useState<Student[]>([
    { id: 1, nome: "Ana Silva", email: "ana.silva@email.com", curso: "Engenharia de Software", progresso: 78, ultimoAcesso: "2h atrás", status: "ativo", nota: 8.5 },
    { id: 2, nome: "Carlos Santos", email: "carlos.santos@email.com", curso: "Marketing Digital", progresso: 92, ultimoAcesso: "30min atrás", status: "ativo", nota: 9.2 },
    { id: 3, nome: "Maria Costa", email: "maria.costa@email.com", curso: "Design Gráfico", progresso: 45, ultimoAcesso: "1 dia atrás", status: "inativo", nota: 7.8 },
    { id: 4, nome: "Pedro Lima", email: "pedro.lima@email.com", curso: "Administração", progresso: 67, ultimoAcesso: "5h atrás", status: "ativo", nota: 8.0 }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, nome: "Engenharia de Software", categoria: "Tecnologia", alunos: 487, professor: "Prof. João Silva", conclusao: 89, avaliacao: 4.8, status: "ativo" },
    { id: 2, nome: "Marketing Digital", categoria: "Marketing", alunos: 356, professor: "Prof. Ana Costa", conclusao: 92, avaliacao: 4.7, status: "ativo" },
    { id: 3, nome: "Design Gráfico", categoria: "Design", alunos: 298, professor: "Prof. Maria Santos", conclusao: 85, avaliacao: 4.6, status: "ativo" },
    { id: 4, nome: "Administração", categoria: "Negócios", alunos: 423, professor: "Prof. Carlos Lima", conclusao: 88, avaliacao: 4.5, status: "ativo" }
  ]);

  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    { id: 1, titulo: "Projeto Final - Sistema Web", curso: "Engenharia de Software", prazo: "15/11/2024", entregas: 28, total: 35, professor: "Prof. João Silva", status: "pendente", nota_media: 0 },
    { id: 2, titulo: "Análise de Mercado", curso: "Marketing Digital", prazo: "18/11/2024", entregas: 31, total: 35, professor: "Prof. Ana Costa", status: "pendente", nota_media: 0 },
    { id: 3, titulo: "Portfolio Criativo", curso: "Design Gráfico", prazo: "20/11/2024", entregas: 15, total: 22, professor: "Prof. Maria Santos", status: "corrigida", nota_media: 8.2 },
    { id: 4, titulo: "Plano de Negócios", curso: "Administração", prazo: "25/11/2024", entregas: 23, total: 41, professor: "Prof. Carlos Lima", status: "pendente", nota_media: 0 }
  ]);

  const [professors, setProfessors] = useState<Professor[]>([
    { id: 1, nome: "João Silva", email: "joao.silva@universidade.edu", departamento: "Tecnologia", disciplinas: ["Engenharia de Software", "Banco de Dados"], telefone: "(11) 99999-0001", status: "ativo", dataContratacao: "2020-03-15", titulacao: "Doutor" },
    { id: 2, nome: "Ana Costa", email: "ana.costa@universidade.edu", departamento: "Marketing", disciplinas: ["Marketing Digital", "Estratégia de Marketing"], telefone: "(11) 99999-0002", status: "ativo", dataContratacao: "2019-08-22", titulacao: "Mestre" },
    { id: 3, nome: "Maria Santos", email: "maria.santos@universidade.edu", departamento: "Design", disciplinas: ["Design Gráfico", "UX/UI Design"], telefone: "(11) 99999-0003", status: "ativo", dataContratacao: "2021-01-10", titulacao: "Especialista" },
    { id: 4, nome: "Carlos Lima", email: "carlos.lima@universidade.edu", departamento: "Negócios", disciplinas: ["Administração", "Gestão Empresarial"], telefone: "(11) 99999-0004", status: "ativo", dataContratacao: "2018-06-30", titulacao: "Doutor" },
    { id: 5, nome: "Patricia Oliveira", email: "patricia.oliveira@universidade.edu", departamento: "Tecnologia", disciplinas: ["Programação Web", "Desenvolvimento Mobile"], telefone: "(11) 99999-0005", status: "inativo", dataContratacao: "2022-02-14", titulacao: "Mestre" }
  ]);

  // Form states
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});
  const [newEvaluation, setNewEvaluation] = useState<Partial<Evaluation>>({});
  const [newProfessor, setNewProfessor] = useState<Partial<Professor>>({});
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);

  // Calculate occupation rates for professors
  const MAX_DISCIPLINAS_POR_PROFESSOR = 5; // Capacidade máxima de disciplinas por professor
  
  const calculateProfessorOccupation = () => {
    const activeProfessors = professors.filter(p => p.status === 'ativo');
    return activeProfessors.map(professor => {
      const ocupacaoRaw = (professor.disciplinas.length / MAX_DISCIPLINAS_POR_PROFESSOR) * 100;
      const ocupacao = Math.min(Math.max(Math.round(ocupacaoRaw), 0), 100); // Limita entre 0-100%
      return {
        nome: professor.nome.split(' ')[0], // Primeiro nome para simplificar
        ocupacao,
        disciplinas: professor.disciplinas.length,
        maxDisciplinas: MAX_DISCIPLINAS_POR_PROFESSOR
      };
    });
  };
  
  const calculateAverageOccupation = () => {
    const activeProfessors = professors.filter(p => p.status === 'ativo');
    if (activeProfessors.length === 0) return 0;
    
    const totalOccupation = activeProfessors.reduce((acc, professor) => {
      const ocupacaoRaw = (professor.disciplinas.length / MAX_DISCIPLINAS_POR_PROFESSOR) * 100;
      const ocupacao = Math.min(Math.max(ocupacaoRaw, 0), 100); // Limita entre 0-100%
      return acc + ocupacao;
    }, 0);
    
    return Math.round(totalOccupation / activeProfessors.length);
  };
  
  const professorOccupationData = calculateProfessorOccupation();
  const averageOccupation = calculateAverageOccupation();
  
  // Data for average occupation pie chart
  const averageOccupationPieData = [
    { name: 'Ocupado', value: averageOccupation, color: '#10b981' },
    { name: 'Disponível', value: 100 - averageOccupation, color: '#e5e7eb' }
  ];

  // Calculate dashboard data dynamically
  const educationData = {
    totalAlunos: students.length.toString(),
    alunosAtivos: students.filter(s => s.status === 'ativo').length.toString(),
    cursosDisponiveis: courses.filter(c => c.status === 'ativo').length,
    professorAtivos: professors.filter(p => p.status === 'ativo').length,
    totalProfessores: professors.length,
    aulasHoje: 23,
    avaliacoesPendentes: evaluations.filter(e => e.status === 'pendente').length,
    taxaConclusao: courses.length > 0 ? `${Math.round(courses.reduce((acc, c) => acc + c.conclusao, 0) / courses.length)}%` : '0%'
  };

  // Helper functions for CRUD operations
  const addStudent = (student: Partial<Student>) => {
    const newStudent: Student = {
      id: Date.now(),
      nome: student.nome || '',
      email: student.email || '',
      curso: student.curso || '',
      progresso: student.progresso || 0,
      ultimoAcesso: 'Agora',
      status: student.status || 'ativo',
      nota: student.nota || 0
    };
    setStudents(prev => [...prev, newStudent]);
    setNewStudent({});
    toast({
      title: "Aluno adicionado!",
      description: `${newStudent.nome} foi matriculado com sucesso.`,
    });
  };

  const updateStudent = (id: number, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates, ultimoAcesso: 'Agora' } : s));
    setEditingStudent(null);
    toast({
      title: "Aluno atualizado!",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  const deleteStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Aluno removido!",
      description: `${student?.nome} foi removido do sistema.`,
    });
  };

  const addCourse = (course: Partial<Course>) => {
    const newCourse: Course = {
      id: Date.now(),
      nome: course.nome || '',
      categoria: course.categoria || '',
      alunos: course.alunos || 0,
      professor: course.professor || '',
      conclusao: course.conclusao || 0,
      avaliacao: course.avaliacao || 0,
      status: course.status || 'ativo'
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourse({});
    toast({
      title: "Curso criado!",
      description: `${newCourse.nome} foi adicionado ao catálogo.`,
    });
  };

  const updateCourse = (id: number, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    setEditingCourse(null);
    toast({
      title: "Curso atualizado!",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  const deleteCourse = (id: number) => {
    const course = courses.find(c => c.id === id);
    setCourses(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Curso removido!",
      description: `${course?.nome} foi removido do catálogo.`,
    });
  };

  const addEvaluation = (evaluation: Partial<Evaluation>) => {
    const newEvaluation: Evaluation = {
      id: Date.now(),
      titulo: evaluation.titulo || '',
      curso: evaluation.curso || '',
      prazo: evaluation.prazo || '',
      entregas: evaluation.entregas || 0,
      total: evaluation.total || 0,
      professor: evaluation.professor || '',
      status: evaluation.status || 'pendente',
      nota_media: evaluation.nota_media || 0
    };
    setEvaluations(prev => [...prev, newEvaluation]);
    setNewEvaluation({});
    toast({
      title: "Avaliação criada!",
      description: `${newEvaluation.titulo} foi adicionada ao sistema.`,
    });
  };

  const updateEvaluation = (id: number, updates: Partial<Evaluation>) => {
    setEvaluations(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    setEditingEvaluation(null);
    toast({
      title: "Avaliação atualizada!",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  const gradeEvaluation = (id: number, nota: number) => {
    setEvaluations(prev => prev.map(e => 
      e.id === id ? { ...e, status: 'corrigida' as const, nota_media: nota } : e
    ));
    toast({
      title: "Avaliação corrigida!",
      description: `Nota média atribuída: ${nota.toFixed(1)}`,
    });
  };

  // Professor CRUD functions
  const addProfessor = (professor: Partial<Professor>) => {
    const newProfessor: Professor = {
      id: Date.now(),
      nome: professor.nome || '',
      email: professor.email || '',
      departamento: professor.departamento || '',
      disciplinas: professor.disciplinas || [],
      telefone: professor.telefone || '',
      status: professor.status || 'ativo',
      dataContratacao: professor.dataContratacao || new Date().toISOString().split('T')[0],
      titulacao: professor.titulacao || ''
    };
    setProfessors(prev => [...prev, newProfessor]);
    setNewProfessor({});
    toast({
      title: "Professor cadastrado!",
      description: `${newProfessor.nome} foi adicionado ao quadro docente.`,
    });
  };

  const updateProfessor = (id: number, updates: Partial<Professor>) => {
    setProfessors(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    setEditingProfessor(null);
    toast({
      title: "Professor atualizado!",
      description: "As informações foram atualizadas com sucesso.",
    });
  };

  const deleteProfessor = (id: number) => {
    const professor = professors.find(p => p.id === id);
    setProfessors(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Professor removido!",
      description: `${professor?.nome} foi removido do quadro docente.`,
    });
  };

  const recentStudents = students.slice(0, 4).map(s => ({
    nome: s.nome,
    curso: s.curso,
    progresso: `${s.progresso}%`,
    ultimoAcesso: s.ultimoAcesso,
    status: s.status === 'ativo' ? 'ativo' : 'ausente'
  }));

  const todayClasses = [
    { 
      horario: "09:00", 
      disciplina: "Algoritmos e Estruturas de Dados", 
      professor: "Prof. João Silva", 
      alunos: 28, 
      sala: "Virtual - Sala 01",
      status: "concluida"
    },
    { 
      horario: "14:00", 
      disciplina: "Marketing Estratégico", 
      professor: "Prof. Ana Costa", 
      alunos: 35, 
      sala: "Virtual - Sala 02",
      status: "em_andamento"
    },
    { 
      horario: "16:30", 
      disciplina: "Design Thinking", 
      professor: "Prof. Maria Santos", 
      alunos: 22, 
      sala: "Virtual - Sala 03",
      status: "agendada"
    },
    { 
      horario: "19:00", 
      disciplina: "Gestão de Projetos", 
      professor: "Prof. Carlos Lima", 
      alunos: 41, 
      sala: "Virtual - Sala 04",
      status: "agendada"
    }
  ];

  const topCourses = [
    { nome: "Engenharia de Software", alunos: 487, conclusao: "89%", avaliacao: 4.8, categoria: "Tecnologia" },
    { nome: "Marketing Digital", alunos: 356, conclusao: "92%", avaliacao: 4.7, categoria: "Marketing" },
    { nome: "Design Gráfico", alunos: 298, conclusao: "85%", avaliacao: 4.6, categoria: "Design" },
    { nome: "Administração", alunos: 423, conclusao: "88%", avaliacao: 4.5, categoria: "Negócios" }
  ];


  const recentActivities = [
    { tipo: "entrega", acao: "Projeto entregue", aluno: "Ana Silva", curso: "Engenharia de Software", tempo: "15 min atrás" },
    { tipo: "aula", acao: "Aula iniciada", professor: "Prof. Ana Costa", curso: "Marketing Digital", tempo: "1h atrás" },
    { tipo: "avaliacao", acao: "Prova concluída", aluno: "Carlos Santos", curso: "Marketing Digital", tempo: "2h atrás" },
    { tipo: "mensagem", acao: "Mensagem enviada", professor: "Prof. João Silva", curso: "Engenharia de Software", tempo: "3h atrás" }
  ];

  return (
    <AppShell
      title="EduSoftware - TechSolutions"
      subtitle="Education Edition"
      systemIcon="fas fa-graduation-cap"
      systemColor="from-indigo-600 to-indigo-500"
      backHref="/sistema/education"
      statusBadge="Sistema Educacional"
      navItems={navItems}
      currentUser="Período Letivo 2024.2"
    >
      {/* Custom Systems Message */}
      <div className="mb-6">
        <CustomSystemsMessage variant="compact" />
      </div>
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 raleway">Dashboard Acadêmico</h2>
                  <p className="text-slate-600 dark:text-slate-400">Visão geral das atividades educacionais</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-user-graduate text-white"></i>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">+127</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{educationData.totalAlunos}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total de Alunos</p>
                    <p className="text-blue-600 dark:text-blue-400 text-xs mt-2">{educationData.alunosAtivos} ativos</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-book-open text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{educationData.cursosDisponiveis}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Cursos Disponíveis</p>
                    <p className="text-purple-600 dark:text-purple-400 text-xs mt-2">{educationData.professorAtivos} professores</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-chalkboard-teacher text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{educationData.aulasHoje}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Aulas Hoje</p>
                    <p className="text-green-600 dark:text-green-400 text-xs mt-2">4 em andamento</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-clipboard-check text-white"></i>
                      </div>
                      <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">Pendente</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{educationData.avaliacoesPendentes}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Avaliações</p>
                    <p className="text-orange-600 dark:text-orange-400 text-xs mt-2">Para correção</p>
                  </div>
                </div>

                {/* Professor Occupation Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Individual Professor Occupation Rates */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway flex items-center">
                      <i className="fas fa-chart-bar text-indigo-600 mr-2"></i>
                      Taxa de Ocupação por Professor
                    </h3>
                    <div className="h-64" data-testid="chart-professor-occupation">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={professorOccupationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="nome" 
                            stroke="#6b7280" 
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="#6b7280" 
                            fontSize={12}
                            domain={[0, 100]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            formatter={(value: number, name) => [`${value}%`, 'Taxa de Ocupação']}
                            labelFormatter={(name) => `Professor: ${name}`}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Bar 
                            dataKey="ocupacao" 
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                      <p>Capacidade máxima: {MAX_DISCIPLINAS_POR_PROFESSOR} disciplinas por professor</p>
                    </div>
                  </div>

                  {/* Average Occupation Rate */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway flex items-center">
                      <i className="fas fa-chart-pie text-purple-600 mr-2"></i>
                      Média de Ocupação Geral
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <div data-testid="chart-average-occupation" className="relative">
                        <ResponsiveContainer width={200} height={200}>
                          <PieChart>
                            <Pie
                              data={averageOccupationPieData}
                              cx={100}
                              cy={100}
                              innerRadius={60}
                              outerRadius={90}
                              dataKey="value"
                              startAngle={90}
                              endAngle={-270}
                            >
                              {averageOccupationPieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: number) => [`${value}%`]}
                              contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{averageOccupation}%</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Média</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-center space-x-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Ocupado</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Disponível</span>
                        </div>
                      </div>
                      <div className="mt-2 text-center text-xs text-slate-500 dark:text-slate-500">
                        Baseado em {professors.filter(p => p.status === 'ativo').length} professores ativos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Classes and Student Progress */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Aulas de Hoje</h3>
                    <div className="space-y-4">
                      {todayClasses.map((aula, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{aula.disciplina}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{aula.professor} • {aula.alunos} alunos</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{aula.sala}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{aula.horario}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              aula.status === 'concluida' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              aula.status === 'em_andamento' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' :
                              'bg-gray-100 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400'
                            }`}>
                              {aula.status === 'concluida' ? 'Concluída' :
                               aula.status === 'em_andamento' ? 'Em Andamento' :
                               'Agendada'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Atividade dos Alunos</h3>
                    <div className="space-y-4">
                      {recentStudents.map((aluno, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{aluno.nome.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{aluno.nome}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{aluno.curso}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{aluno.progresso}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{aluno.ultimoAcesso}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              aluno.status === 'ativo' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                              'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {aluno.status === 'ativo' ? 'Ativo' : 'Ausente'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Courses and Assignments */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Cursos Populares</h3>
                    <div className="space-y-4">
                      {topCourses.map((curso, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{curso.nome}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{curso.categoria} • {curso.alunos} alunos</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star text-xs ${
                                  i < Math.floor(curso.avaliacao) ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-600'
                                }`}></i>
                              ))}
                              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">{curso.avaliacao}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{curso.conclusao}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Taxa de conclusão</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Atividades Recentes</h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.tipo === 'entrega' ? 'bg-green-100 dark:bg-green-900/20' :
                            activity.tipo === 'aula' ? 'bg-blue-100 dark:bg-blue-900/20' :
                            activity.tipo === 'avaliacao' ? 'bg-purple-100 dark:bg-purple-900/20' :
                            'bg-orange-100 dark:bg-orange-900/20'
                          }`}>
                            <i className={`${
                              activity.tipo === 'entrega' ? 'fas fa-upload text-green-600 dark:text-green-400' :
                              activity.tipo === 'aula' ? 'fas fa-play text-blue-600 dark:text-blue-400' :
                              activity.tipo === 'avaliacao' ? 'fas fa-check text-purple-600 dark:text-purple-400' :
                              'fas fa-envelope text-orange-600 dark:text-orange-400'
                            }`}></i>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-slate-100">{activity.acao}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {activity.aluno || activity.professor} • {activity.curso}
                            </p>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{activity.tempo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'alunos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Gestão de Alunos</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-student">
                        <i className="fas fa-plus mr-2"></i>
                        Adicionar Aluno
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Aluno</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nome">Nome</Label>
                          <Input
                            id="nome"
                            value={newStudent.nome || ''}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, nome: e.target.value }))}
                            data-testid="input-student-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newStudent.email || ''}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                            data-testid="input-student-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="curso">Curso</Label>
                          <Select value={newStudent.curso} onValueChange={(value) => setNewStudent(prev => ({ ...prev, curso: value }))}>
                            <SelectTrigger data-testid="select-student-course">
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.filter(c => c.status === 'ativo').map(course => (
                                <SelectItem key={course.id} value={course.nome}>{course.nome}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="progresso">Progresso (%)</Label>
                          <Input
                            id="progresso"
                            type="number"
                            min="0"
                            max="100"
                            value={newStudent.progresso || 0}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, progresso: parseInt(e.target.value) || 0 }))}
                            data-testid="input-student-progress"
                          />
                        </div>
                        <div>
                          <Label htmlFor="nota">Nota</Label>
                          <Input
                            id="nota"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={newStudent.nota || 0}
                            onChange={(e) => setNewStudent(prev => ({ ...prev, nota: parseFloat(e.target.value) || 0 }))}
                            data-testid="input-student-grade"
                          />
                        </div>
                        <Button 
                          onClick={() => addStudent(newStudent)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          data-testid="button-save-student"
                        >
                          Matricular Aluno
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-4">
                  {students.map((student) => (
                    <Card key={student.id} className="bg-white dark:bg-slate-800" data-testid={`card-student-${student.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {student.nome.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-slate-100" data-testid={`text-student-name-${student.id}`}>
                                {student.nome}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{student.curso}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Progresso</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100">{student.progresso}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Nota</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100">{student.nota.toFixed(1)}</p>
                              </div>
                              <Badge 
                                variant={student.status === 'ativo' ? 'default' : 'secondary'}
                                data-testid={`status-student-${student.id}`}
                              >
                                {student.status === 'ativo' ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingStudent(student)}
                                data-testid={`button-edit-student-${student.id}`}
                              >
                                <i className="fas fa-edit mr-1"></i>
                                Editar
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateStudent(student.id, { status: student.status === 'ativo' ? 'inativo' : 'ativo' })}
                                data-testid={`button-toggle-student-${student.id}`}
                              >
                                <i className={`fas ${student.status === 'ativo' ? 'fa-pause' : 'fa-play'} mr-1`}></i>
                                {student.status === 'ativo' ? 'Suspender' : 'Ativar'}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => deleteStudent(student.id)}
                                data-testid={`button-delete-student-${student.id}`}
                              >
                                <i className="fas fa-trash mr-1"></i>
                                Remover
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Student Dialog */}
                <Dialog open={!!editingStudent} onOpenChange={(open) => !open && setEditingStudent(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Aluno</DialogTitle>
                    </DialogHeader>
                    {editingStudent && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-nome">Nome Completo</Label>
                          <Input
                            id="edit-nome"
                            value={editingStudent.nome || ''}
                            onChange={(e) => setEditingStudent(prev => prev ? { ...prev, nome: e.target.value } : null)}
                            data-testid="input-edit-student-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={editingStudent.email || ''}
                            onChange={(e) => setEditingStudent(prev => prev ? { ...prev, email: e.target.value } : null)}
                            data-testid="input-edit-student-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-curso">Curso</Label>
                          <Select
                            value={editingStudent.curso || ''}
                            onValueChange={(value) => setEditingStudent(prev => prev ? { ...prev, curso: value } : null)}
                          >
                            <SelectTrigger data-testid="select-edit-student-course">
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engenharia de Software">Engenharia de Software</SelectItem>
                              <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                              <SelectItem value="Design Gráfico">Design Gráfico</SelectItem>
                              <SelectItem value="Administração">Administração</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-progresso">Progresso (%)</Label>
                          <Input
                            id="edit-progresso"
                            type="number"
                            min="0"
                            max="100"
                            value={editingStudent.progresso || 0}
                            onChange={(e) => setEditingStudent(prev => prev ? { ...prev, progresso: parseInt(e.target.value) || 0 } : null)}
                            data-testid="input-edit-student-progress"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-nota">Nota</Label>
                          <Input
                            id="edit-nota"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={editingStudent.nota || 0}
                            onChange={(e) => setEditingStudent(prev => prev ? { ...prev, nota: parseFloat(e.target.value) || 0 } : null)}
                            data-testid="input-edit-student-grade"
                          />
                        </div>
                        <Button 
                          onClick={() => updateStudent(editingStudent.id, editingStudent)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          data-testid="button-save-edit-student"
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {selectedModule === 'cursos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Gestão de Cursos</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700" data-testid="button-add-course">
                        <i className="fas fa-plus mr-2"></i>
                        Criar Curso
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Curso</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nome-curso">Nome do Curso</Label>
                          <Input
                            id="nome-curso"
                            value={newCourse.nome || ''}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, nome: e.target.value }))}
                            data-testid="input-course-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoria-curso">Categoria</Label>
                          <Input
                            id="categoria-curso"
                            value={newCourse.categoria || ''}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, categoria: e.target.value }))}
                            data-testid="input-course-category"
                          />
                        </div>
                        <div>
                          <Label htmlFor="professor">Professor</Label>
                          <Input
                            id="professor"
                            value={newCourse.professor || ''}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, professor: e.target.value }))}
                            data-testid="input-course-professor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="alunos-curso">Número de Alunos</Label>
                          <Input
                            id="alunos-curso"
                            type="number"
                            min="0"
                            value={newCourse.alunos || 0}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, alunos: parseInt(e.target.value) || 0 }))}
                            data-testid="input-course-students"
                          />
                        </div>
                        <Button 
                          onClick={() => addCourse(newCourse)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          data-testid="button-save-course"
                        >
                          Criar Curso
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="bg-white dark:bg-slate-800" data-testid={`card-course-${course.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-slate-900 dark:text-slate-100" data-testid={`text-course-name-${course.id}`}>
                              {course.nome}
                            </CardTitle>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{course.categoria}</p>
                          </div>
                          <Badge 
                            variant={course.status === 'ativo' ? 'default' : 'secondary'}
                            data-testid={`status-course-${course.id}`}
                          >
                            {course.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Professor:</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.professor}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Alunos:</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.alunos}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Taxa de Conclusão:</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{course.conclusao}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Avaliação:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star text-xs ${
                                  i < Math.floor(course.avaliacao) ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-600'
                                }`}></i>
                              ))}
                              <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">{course.avaliacao}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingCourse(course)}
                              data-testid={`button-edit-course-${course.id}`}
                            >
                              <i className="fas fa-edit mr-1"></i>
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCourse(course.id, { alunos: course.alunos + 1 })}
                              data-testid={`button-enroll-course-${course.id}`}
                            >
                              <i className="fas fa-user-plus mr-1"></i>
                              Matricular
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCourse(course.id, { status: course.status === 'ativo' ? 'inativo' : 'ativo' })}
                              data-testid={`button-toggle-course-${course.id}`}
                            >
                              <i className={`fas ${course.status === 'ativo' ? 'fa-pause' : 'fa-play'} mr-1`}></i>
                              {course.status === 'ativo' ? 'Desativar' : 'Ativar'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteCourse(course.id)}
                              data-testid={`button-delete-course-${course.id}`}
                            >
                              <i className="fas fa-trash mr-1"></i>
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Course Dialog */}
                <Dialog open={!!editingCourse} onOpenChange={(open) => !open && setEditingCourse(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Curso</DialogTitle>
                    </DialogHeader>
                    {editingCourse && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-curso-nome">Nome do Curso</Label>
                          <Input
                            id="edit-curso-nome"
                            value={editingCourse.nome || ''}
                            onChange={(e) => setEditingCourse(prev => prev ? { ...prev, nome: e.target.value } : null)}
                            data-testid="input-edit-course-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-categoria">Categoria</Label>
                          <Input
                            id="edit-categoria"
                            value={editingCourse.categoria || ''}
                            onChange={(e) => setEditingCourse(prev => prev ? { ...prev, categoria: e.target.value } : null)}
                            data-testid="input-edit-course-category"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-professor-curso">Professor</Label>
                          <Input
                            id="edit-professor-curso"
                            value={editingCourse.professor || ''}
                            onChange={(e) => setEditingCourse(prev => prev ? { ...prev, professor: e.target.value } : null)}
                            data-testid="input-edit-course-professor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-alunos-curso">Número de Alunos</Label>
                          <Input
                            id="edit-alunos-curso"
                            type="number"
                            min="0"
                            value={editingCourse.alunos || 0}
                            onChange={(e) => setEditingCourse(prev => prev ? { ...prev, alunos: parseInt(e.target.value) || 0 } : null)}
                            data-testid="input-edit-course-students"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-avaliacao-curso">Avaliação (1-5)</Label>
                          <Input
                            id="edit-avaliacao-curso"
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={editingCourse.avaliacao || 0}
                            onChange={(e) => setEditingCourse(prev => prev ? { ...prev, avaliacao: parseFloat(e.target.value) || 0 } : null)}
                            data-testid="input-edit-course-rating"
                          />
                        </div>
                        <Button 
                          onClick={() => updateCourse(editingCourse.id, editingCourse)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          data-testid="button-save-edit-course"
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {selectedModule === 'avaliacoes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Centro de Avaliações</h2>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" data-testid="button-add-evaluation">
                          <i className="fas fa-plus mr-2"></i>
                          Nova Avaliação
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nova Avaliação</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="titulo-avaliacao">Título da Avaliação</Label>
                            <Input
                              id="titulo-avaliacao"
                              value={newEvaluation.titulo || ''}
                              onChange={(e) => setNewEvaluation(prev => ({ ...prev, titulo: e.target.value }))}
                              data-testid="input-evaluation-title"
                            />
                          </div>
                          <div>
                            <Label htmlFor="curso-avaliacao">Curso</Label>
                            <Select
                              value={newEvaluation.curso || ''}
                              onValueChange={(value) => setNewEvaluation(prev => ({ ...prev, curso: value }))}
                            >
                              <SelectTrigger data-testid="select-evaluation-course">
                                <SelectValue placeholder="Selecione o curso" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Engenharia de Software">Engenharia de Software</SelectItem>
                                <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                                <SelectItem value="Design Gráfico">Design Gráfico</SelectItem>
                                <SelectItem value="Administração">Administração</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="prazo-avaliacao">Prazo</Label>
                            <Input
                              id="prazo-avaliacao"
                              type="date"
                              value={newEvaluation.prazo || ''}
                              onChange={(e) => setNewEvaluation(prev => ({ ...prev, prazo: e.target.value }))}
                              data-testid="input-evaluation-deadline"
                            />
                          </div>
                          <div>
                            <Label htmlFor="professor-avaliacao">Professor</Label>
                            <Input
                              id="professor-avaliacao"
                              value={newEvaluation.professor || ''}
                              onChange={(e) => setNewEvaluation(prev => ({ ...prev, professor: e.target.value }))}
                              data-testid="input-evaluation-professor"
                            />
                          </div>
                          <div>
                            <Label htmlFor="total-avaliacao">Número Total de Alunos</Label>
                            <Input
                              id="total-avaliacao"
                              type="number"
                              min="1"
                              value={newEvaluation.total || 0}
                              onChange={(e) => setNewEvaluation(prev => ({ ...prev, total: parseInt(e.target.value) || 0 }))}
                              data-testid="input-evaluation-total"
                            />
                          </div>
                          <Button 
                            onClick={() => addEvaluation(newEvaluation)}
                            className="w-full bg-green-600 hover:bg-green-700"
                            data-testid="button-save-evaluation"
                          >
                            Criar Avaliação
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        // Simulate new submissions
                        const randomEval = evaluations[Math.floor(Math.random() * evaluations.length)];
                        setEvaluations(prev => prev.map(e => 
                          e.id === randomEval.id ? { ...e, entregas: Math.min(e.entregas + Math.floor(Math.random() * 3) + 1, e.total) } : e
                        ));
                        toast({
                          title: "Novas entregas!",
                          description: "Alunos enviaram novas avaliações para correção.",
                        });
                      }}
                      data-testid="button-simulate-submissions"
                    >
                      <i className="fas fa-upload mr-2"></i>
                      Simular Entregas
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        // Auto-grade all pending evaluations
                        setEvaluations(prev => prev.map(e => 
                          e.status === 'pendente' ? { 
                            ...e, 
                            status: 'corrigida' as const, 
                            nota_media: Math.round((Math.random() * 3 + 7) * 10) / 10 
                          } : e
                        ));
                        toast({
                          title: "Avaliações corrigidas!",
                          description: "Todas as avaliações pendentes foram automaticamente corrigidas.",
                        });
                      }}
                      data-testid="button-auto-grade"
                    >
                      <i className="fas fa-magic mr-2"></i>
                      Correção Automática
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {evaluations.map((evaluation) => (
                    <Card key={evaluation.id} className="bg-white dark:bg-slate-800" data-testid={`card-evaluation-${evaluation.id}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg text-slate-900 dark:text-slate-100" data-testid={`text-evaluation-title-${evaluation.id}`}>
                              {evaluation.titulo}
                            </CardTitle>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {evaluation.curso} • {evaluation.professor}
                            </p>
                          </div>
                          <Badge 
                            variant={evaluation.status === 'corrigida' ? 'default' : 'secondary'}
                            data-testid={`status-evaluation-${evaluation.id}`}
                          >
                            {evaluation.status === 'corrigida' ? 'Corrigida' : 'Pendente'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Prazo:</span>
                            <span className="text-slate-900 dark:text-slate-100">{evaluation.prazo}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Entregas:</span>
                            <span className="text-slate-900 dark:text-slate-100">{evaluation.entregas}/{evaluation.total}</span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(evaluation.entregas / evaluation.total) * 100}%` }}
                            ></div>
                          </div>

                          {/* Grade Display */}
                          {evaluation.status === 'corrigida' && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">Nota Média:</span>
                              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                {evaluation.nota_media.toFixed(1)}
                              </span>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex space-x-2 mt-4">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingEvaluation(evaluation)}
                              data-testid={`button-edit-evaluation-${evaluation.id}`}
                            >
                              <i className="fas fa-edit mr-1"></i>
                              Editar
                            </Button>
                            {evaluation.status === 'pendente' && evaluation.entregas > 0 && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700"
                                    data-testid={`button-grade-evaluation-${evaluation.id}`}
                                  >
                                    <i className="fas fa-check mr-1"></i>
                                    Corrigir
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Corrigir Avaliação</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                      {evaluation.titulo} - {evaluation.curso}
                                    </p>
                                    <div>
                                      <Label htmlFor="nota-avaliacao">Nota Média (0-10)</Label>
                                      <Input
                                        id="nota-avaliacao"
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        placeholder="Digite a nota média"
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            const nota = parseFloat((e.target as HTMLInputElement).value);
                                            if (nota >= 0 && nota <= 10) {
                                              gradeEvaluation(evaluation.id, nota);
                                              (e.target as HTMLInputElement).value = '';
                                            }
                                          }
                                        }}
                                        data-testid={`input-grade-${evaluation.id}`}
                                      />
                                    </div>
                                    <Button 
                                      onClick={(e) => {
                                        const input = (e.currentTarget.parentElement?.querySelector('input')) as HTMLInputElement;
                                        const nota = parseFloat(input?.value || '0');
                                        if (nota >= 0 && nota <= 10) {
                                          gradeEvaluation(evaluation.id, nota);
                                          input.value = '';
                                        }
                                      }}
                                      className="w-full bg-green-600 hover:bg-green-700"
                                      data-testid={`button-submit-grade-${evaluation.id}`}
                                    >
                                      Atribuir Nota
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "Relatório gerado!",
                                  description: `Relatório de ${evaluation.titulo} foi exportado.`,
                                });
                              }}
                              data-testid={`button-export-evaluation-${evaluation.id}`}
                            >
                              <i className="fas fa-download mr-1"></i>
                              Exportar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEvaluations(prev => prev.map(e => 
                                  e.id === evaluation.id ? { 
                                    ...e, 
                                    entregas: Math.min(e.entregas + 1, e.total) 
                                  } : e
                                ));
                                toast({
                                  title: "Nova entrega!",
                                  description: "Um aluno enviou sua avaliação.",
                                });
                              }}
                              data-testid={`button-add-submission-${evaluation.id}`}
                            >
                              <i className="fas fa-plus mr-1"></i>
                              +1 Entrega
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Evaluation Dialog */}
                <Dialog open={!!editingEvaluation} onOpenChange={(open) => !open && setEditingEvaluation(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Avaliação</DialogTitle>
                    </DialogHeader>
                    {editingEvaluation && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-titulo-avaliacao">Título da Avaliação</Label>
                          <Input
                            id="edit-titulo-avaliacao"
                            value={editingEvaluation.titulo || ''}
                            onChange={(e) => setEditingEvaluation(prev => prev ? { ...prev, titulo: e.target.value } : null)}
                            data-testid="input-edit-evaluation-title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-curso-avaliacao">Curso</Label>
                          <Select
                            value={editingEvaluation.curso || ''}
                            onValueChange={(value) => setEditingEvaluation(prev => prev ? { ...prev, curso: value } : null)}
                          >
                            <SelectTrigger data-testid="select-edit-evaluation-course">
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Engenharia de Software">Engenharia de Software</SelectItem>
                              <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                              <SelectItem value="Design Gráfico">Design Gráfico</SelectItem>
                              <SelectItem value="Administração">Administração</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-prazo-avaliacao">Prazo</Label>
                          <Input
                            id="edit-prazo-avaliacao"
                            type="date"
                            value={editingEvaluation.prazo || ''}
                            onChange={(e) => setEditingEvaluation(prev => prev ? { ...prev, prazo: e.target.value } : null)}
                            data-testid="input-edit-evaluation-deadline"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-professor-avaliacao">Professor</Label>
                          <Input
                            id="edit-professor-avaliacao"
                            value={editingEvaluation.professor || ''}
                            onChange={(e) => setEditingEvaluation(prev => prev ? { ...prev, professor: e.target.value } : null)}
                            data-testid="input-edit-evaluation-professor"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-total-avaliacao">Número Total de Alunos</Label>
                          <Input
                            id="edit-total-avaliacao"
                            type="number"
                            min="1"
                            value={editingEvaluation.total || 0}
                            onChange={(e) => setEditingEvaluation(prev => prev ? { ...prev, total: parseInt(e.target.value) || 0 } : null)}
                            data-testid="input-edit-evaluation-total"
                          />
                        </div>
                        <Button 
                          onClick={() => updateEvaluation(editingEvaluation.id, editingEvaluation)}
                          className="w-full bg-green-600 hover:bg-green-700"
                          data-testid="button-save-edit-evaluation"
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Professores Section */}
            {selectedModule === 'professores' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Gestão do Corpo Docente</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700" data-testid="button-add-professor">
                        <i className="fas fa-plus mr-2"></i>
                        Cadastrar Professor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Professor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nome-professor">Nome Completo</Label>
                          <Input
                            id="nome-professor"
                            value={newProfessor.nome || ''}
                            onChange={(e) => setNewProfessor(prev => ({ ...prev, nome: e.target.value }))}
                            data-testid="input-professor-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-professor">Email Institucional</Label>
                          <Input
                            id="email-professor"
                            type="email"
                            value={newProfessor.email || ''}
                            onChange={(e) => setNewProfessor(prev => ({ ...prev, email: e.target.value }))}
                            data-testid="input-professor-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="departamento-professor">Departamento</Label>
                          <Select value={newProfessor.departamento} onValueChange={(value) => setNewProfessor(prev => ({ ...prev, departamento: value }))}>
                            <SelectTrigger data-testid="select-professor-department">
                              <SelectValue placeholder="Selecione o departamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Negócios">Negócios</SelectItem>
                              <SelectItem value="Humanas">Ciências Humanas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="telefone-professor">Telefone</Label>
                          <Input
                            id="telefone-professor"
                            value={newProfessor.telefone || ''}
                            onChange={(e) => setNewProfessor(prev => ({ ...prev, telefone: e.target.value }))}
                            placeholder="(11) 99999-9999"
                            data-testid="input-professor-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="titulacao-professor">Titulação</Label>
                          <Select value={newProfessor.titulacao} onValueChange={(value) => setNewProfessor(prev => ({ ...prev, titulacao: value }))}>
                            <SelectTrigger data-testid="select-professor-degree">
                              <SelectValue placeholder="Selecione a titulação" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Especialista">Especialista</SelectItem>
                              <SelectItem value="Mestre">Mestre</SelectItem>
                              <SelectItem value="Doutor">Doutor</SelectItem>
                              <SelectItem value="Pós-doutor">Pós-doutor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="data-contratacao">Data de Contratação</Label>
                          <Input
                            id="data-contratacao"
                            type="date"
                            value={newProfessor.dataContratacao || ''}
                            onChange={(e) => setNewProfessor(prev => ({ ...prev, dataContratacao: e.target.value }))}
                            data-testid="input-professor-hiring-date"
                          />
                        </div>
                        <Button 
                          onClick={() => addProfessor(newProfessor)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                          data-testid="button-save-professor"
                        >
                          Cadastrar Professor
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Professor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {professors.map(professor => (
                    <Card key={professor.id} className="bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {professor.nome}
                            </CardTitle>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{professor.departamento}</p>
                            <Badge 
                              className={`mt-2 ${professor.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                              data-testid={`status-professor-${professor.id}`}
                            >
                              {professor.status === 'ativo' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-1">
                              <i className="fas fa-envelope w-4 mr-2"></i>
                              <span>{professor.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-1">
                              <i className="fas fa-phone w-4 mr-2"></i>
                              <span>{professor.telefone}</span>
                            </div>
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-1">
                              <i className="fas fa-graduation-cap w-4 mr-2"></i>
                              <span>{professor.titulacao}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Disciplinas:</h4>
                            <div className="flex flex-wrap gap-1">
                              {professor.disciplinas.map((disciplina, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {disciplina}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-600">
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              <i className="fas fa-calendar-alt mr-1"></i>
                              Desde {new Date(professor.dataContratacao).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setEditingProfessor(professor)}
                                data-testid={`button-edit-professor-${professor.id}`}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteProfessor(professor.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                data-testid={`button-delete-professor-${professor.id}`}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Professor Dialog */}
                <Dialog open={!!editingProfessor} onOpenChange={(open) => !open && setEditingProfessor(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Professor</DialogTitle>
                    </DialogHeader>
                    {editingProfessor && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-nome-professor">Nome Completo</Label>
                          <Input
                            id="edit-nome-professor"
                            value={editingProfessor.nome || ''}
                            onChange={(e) => setEditingProfessor(prev => prev ? { ...prev, nome: e.target.value } : null)}
                            data-testid="input-edit-professor-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-email-professor">Email Institucional</Label>
                          <Input
                            id="edit-email-professor"
                            type="email"
                            value={editingProfessor.email || ''}
                            onChange={(e) => setEditingProfessor(prev => prev ? { ...prev, email: e.target.value } : null)}
                            data-testid="input-edit-professor-email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-departamento-professor">Departamento</Label>
                          <Select
                            value={editingProfessor.departamento || ''}
                            onValueChange={(value) => setEditingProfessor(prev => prev ? { ...prev, departamento: value } : null)}
                          >
                            <SelectTrigger data-testid="select-edit-professor-department">
                              <SelectValue placeholder="Selecione o departamento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Negócios">Negócios</SelectItem>
                              <SelectItem value="Humanas">Ciências Humanas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-telefone-professor">Telefone</Label>
                          <Input
                            id="edit-telefone-professor"
                            value={editingProfessor.telefone || ''}
                            onChange={(e) => setEditingProfessor(prev => prev ? { ...prev, telefone: e.target.value } : null)}
                            data-testid="input-edit-professor-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-titulacao-professor">Titulação</Label>
                          <Select
                            value={editingProfessor.titulacao || ''}
                            onValueChange={(value) => setEditingProfessor(prev => prev ? { ...prev, titulacao: value } : null)}
                          >
                            <SelectTrigger data-testid="select-edit-professor-degree">
                              <SelectValue placeholder="Selecione a titulação" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Especialista">Especialista</SelectItem>
                              <SelectItem value="Mestre">Mestre</SelectItem>
                              <SelectItem value="Doutor">Doutor</SelectItem>
                              <SelectItem value="Pós-doutor">Pós-doutor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-status-professor">Status</Label>
                          <Select
                            value={editingProfessor.status || ''}
                            onValueChange={(value: 'ativo' | 'inativo') => setEditingProfessor(prev => prev ? { ...prev, status: value } : null)}
                          >
                            <SelectTrigger data-testid="select-edit-professor-status">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-data-contratacao">Data de Contratação</Label>
                          <Input
                            id="edit-data-contratacao"
                            type="date"
                            value={editingProfessor.dataContratacao || ''}
                            onChange={(e) => setEditingProfessor(prev => prev ? { ...prev, dataContratacao: e.target.value } : null)}
                            data-testid="input-edit-professor-hiring-date"
                          />
                        </div>
                        <Button 
                          onClick={() => updateProfessor(editingProfessor.id, editingProfessor)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700"
                          data-testid="button-save-edit-professor"
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}

      {selectedModule === 'relatorios' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 raleway">Relatórios Acadêmicos</h2>
            <p className="text-slate-600 dark:text-slate-400">Análises e relatórios do sistema educacional</p>
          </div>

          {/* Reports Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white"></i>
                </div>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Mensal</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Performance Acadêmica</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Análise de desempenho dos alunos</p>
              <p className="text-blue-600 dark:text-blue-400 text-xs mt-2">Taxa média: 87.3%</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-white"></i>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">Semanal</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Engajamento</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Participação em aulas e atividades</p>
              <p className="text-green-600 dark:text-green-400 text-xs mt-2">Média: 92.1%</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white"></i>
                </div>
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">Anual</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Taxa de Conclusão</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Cursos concluídos vs iniciados</p>
              <p className="text-purple-600 dark:text-purple-400 text-xs mt-2">88.5% de sucesso</p>
            </div>
          </div>

          {/* Quick Reports */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway flex items-center">
              <i className="fas fa-file-alt text-indigo-600 mr-2"></i>
              Relatórios Disponíveis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 h-auto" data-testid="button-academic-performance">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-chart-bar text-blue-600"></i>
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-slate-100">Performance Acadêmica</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Notas e aproveitamento por curso</p>
                  </div>
                </div>
                <i className="fas fa-download text-slate-400"></i>
              </Button>
              
              <Button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 h-auto" data-testid="button-attendance">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-calendar-check text-green-600"></i>
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-slate-100">Relatório de Frequência</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Presença em aulas e atividades</p>
                  </div>
                </div>
                <i className="fas fa-download text-slate-400"></i>
              </Button>
              
              <Button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 h-auto" data-testid="button-professor-performance">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-chalkboard-teacher text-purple-600"></i>
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-slate-100">Desempenho Docente</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Avaliações e carga horária</p>
                  </div>
                </div>
                <i className="fas fa-download text-slate-400"></i>
              </Button>
              
              <Button className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 h-auto" data-testid="button-financial">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-dollar-sign text-orange-600"></i>
                  <div className="text-left">
                    <p className="font-medium text-slate-900 dark:text-slate-100">Relatório Financeiro</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Matrículas e receitas por curso</p>
                  </div>
                </div>
                <i className="fas fa-download text-slate-400"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}