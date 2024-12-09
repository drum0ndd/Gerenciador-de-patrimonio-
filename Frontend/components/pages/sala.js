import React, { useState } from 'react';
import { Laptop, Projector, Printer, Monitor, Tv, BookOpen, Clipboard } from 'lucide-react';

// Sample inventory data (would typically come from a backend)
const initialInventory = [
  { id: 1, name: 'Projetor Multimidia', category: 'Apresentação', quantity: 5, icon: Projector },
  { id: 2, name: 'Notebook Dell', category: 'Computadores', quantity: 10, icon: Laptop },
  { id: 3, name: 'Monitor LCD 24"', category: 'Computadores', quantity: 15, icon: Monitor },
  { id: 4, name: 'Impressora Laser', category: 'Impressão', quantity: 3, icon: Printer },
  { id: 5, name: 'TV LED 55"', category: 'Apresentação', quantity: 2, icon: Tv },
  { id: 6, name: 'Livro Didático', category: 'Biblioteca', quantity: 50, icon: BookOpen },
];

const RoomInventoryPage = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [filter, setFilter] = useState('');

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">UFSC - Empréstimo de Patrimônio</h1>
          <Clipboard className="w-6 h-6" />
        </div>
      </header>

      <main className="p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-blue-600 text-white">
              <h1 className="text-3xl font-bold">Inventário de Equipamentos</h1>
              <p className="mt-2 text-blue-100">Patrimônio Disponível para Empréstimo</p>
            </div>

            {/* Search/Filter Input */}
            <div className="p-4 bg-gray-50 border-b">
              <input 
                type="text" 
                placeholder="Buscar equipamentos por nome ou categoria" 
                className="w-full p-2 border rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {/* Inventory List */}
            <div className="p-6 space-y-4">
              {filteredInventory.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  Nenhum equipamento encontrado
                </div>
              ) : (
                filteredInventory.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <item.icon className="text-blue-600 w-8 h-8" />
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                      </div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      Disponíveis: {item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomInventoryPage;