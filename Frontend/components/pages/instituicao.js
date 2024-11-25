import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  MapPin, 
  Search, 
  Filter, 
  ChevronRight 
} from 'lucide-react';

const SalasData = {
  blocos: [
    {
      nome: 'Centro de Ciências Físicas e Matemáticas (CFM)',
      salas: [
        { codigo: 'A-101', tipo: 'Laboratório', capacidade: 30, equipamentos: ['Computadores', 'Projetores'] },
        { codigo: 'A-202', tipo: 'Sala de Aula', capacidade: 50, equipamentos: ['Ar-condicionado', 'Quadro'] },
        { codigo: 'A-303', tipo: 'Auditório', capacidade: 100, equipamentos: ['Multimídia', 'Palco'] }
      ]
    },
    {
      nome: 'Centro de Ciências Biológicas (CCB)',
      salas: [
        { codigo: 'B-101', tipo: 'Laboratório de Biologia', capacidade: 25, equipamentos: ['Microscópios', 'Bancadas'] },
        { codigo: 'B-202', tipo: 'Sala de Pesquisa', capacidade: 15, equipamentos: ['Computadores', 'Armários'] }
      ]
    }
  ]
};

const UFSCPage = () => {
  const [abaAtiva, setAbaAtiva] = useState('institucional');
  const [filtroSala, setFiltroSala] = useState('');
  const [filtroBusca, setFiltroBusca] = useState('');

  const renderAbaSalas = () => {
    const salasFiltradas = SalasData.blocos.flatMap(bloco => 
      bloco.salas.filter(sala => 
        sala.codigo.toLowerCase().includes(filtroBusca.toLowerCase()) ||
        sala.tipo.toLowerCase().includes(filtroBusca.toLowerCase())
      )
    );

    return (
      <div className="p-6 bg-gray-50">
        <div className="flex mb-6 space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar sala por código ou tipo"
              value={filtroBusca}
              onChange={(e) => setFiltroBusca(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {salasFiltradas.map((sala, index) => (
            <div 
              key={index} 
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{sala.codigo}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {sala.tipo}
                </span>
              </div>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Users className="mr-2 text-gray-500" size={16} />
                  Capacidade: {sala.capacidade} pessoas
                </p>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Equipamentos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sala.equipamentos.map((equip, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {equip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAbaInstitucional = () => (
    <div className="p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <h1 className="text-3xl font-bold">Universidade Federal de Santa Catarina</h1>
            <p className="mt-2 text-blue-100">Conhecimento, Inovação e Transformação Social</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-600 mt-1" />
              <div>
                <h2 className="font-semibold text-lg">Localização</h2>
                <p>Campus Universitário Reitor João David Ferreira Lima, Trindade, Florianópolis - SC</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Building2 className="text-blue-600 mt-1" />
              <div>
                <h2 className="font-semibold text-lg">Sobre a UFSC</h2>
                <p>Fundada em 1960, a UFSC é uma instituição pública federal de ensino superior, reconhecida nacionalmente pela excelência em ensino, pesquisa e extensão.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/api/placeholder/50/50" 
              alt="Logo UFSC" 
              className="h-10 w-10 rounded-full"
            />
            <h1 className="text-xl font-bold">UFSC</h1>
          </div>
        </div>
      </header>

      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto flex">
          <button
            onClick={() => setAbaAtiva('institucional')}
            className={`px-4 py-3 flex items-center ${
              abaAtiva === 'institucional' 
                ? 'bg-blue-700 font-bold' 
                : 'hover:bg-blue-500'
            }`}
          >
            <Building2 className="mr-2" /> Institucional
          </button>
          <button
            onClick={() => setAbaAtiva('salas')}
            className={`px-4 py-3 flex items-center ${
              abaAtiva === 'salas' 
                ? 'bg-blue-700 font-bold' 
                : 'hover:bg-blue-500'
            }`}
          >
            <BookOpen className="mr-2" /> Salas
          </button>
        </div>
      </nav>

      <main>
        {abaAtiva === 'institucional' 
          ? renderAbaInstitucional() 
          : renderAbaSalas()}
      </main>
    </div>
  );
};

export default UFSCPage;