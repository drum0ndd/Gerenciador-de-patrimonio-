import React, { useState } from 'react';
import { 
  User, 
  Plus, 
  Trash2, 
  Edit, 
  BookOpen, 
  Laptop, 
  Save, 
  X 
} from 'lucide-react';

const ProfessorSpace = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'João Silva', course: 'Ciência da Computação', email: 'joao@exemplo.com' },
    { id: 2, name: 'Maria Santos', course: 'Engenharia Elétrica', email: 'maria@exemplo.com' }
  ]);

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Notebook Dell', category: 'Computadores', quantity: 2 },
    { id: 2, name: 'Projetor Multimidia', category: 'Apresentação', quantity: 1 }
  ]);

  const [newStudent, setNewStudent] = useState({ name: '', course: '', email: '' });
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 1 });

  const [editingStudent, setEditingStudent] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.course && newStudent.email) {
      setStudents([
        ...students, 
        { 
          id: students.length + 1, 
          ...newStudent 
        }
      ]);
      setNewStudent({ name: '', course: '', email: '' });
    }
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity > 0) {
      setInventoryItems([
        ...inventoryItems, 
        { 
          id: inventoryItems.length + 1, 
          ...newItem 
        }
      ]);
      setNewItem({ name: '', category: '', quantity: 1 });
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleDeleteItem = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleSaveStudent = () => {
    setStudents(students.map(s => 
      s.id === editingStudent.id ? editingStudent : s
    ));
    setEditingStudent(null);
  };

  const handleSaveItem = () => {
    setInventoryItems(inventoryItems.map(i => 
      i.id === editingItem.id ? editingItem : i
    ));
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">UFSC - Espaço do Professor</h1>
          <User className="w-6 h-6" />
        </div>
      </header>

      <main className="p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Alunos Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Meus Alunos</h2>
                <p className="text-blue-100">Gerenciamento de Alunos</p>
              </div>
              <Plus className="w-6 h-6 cursor-pointer" />
            </div>

            <div className="p-6 space-y-4">
              {/* Add Student Form */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <input 
                  placeholder="Nome"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="p-2 border rounded"
                />
                <input 
                  placeholder="Curso"
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                  className="p-2 border rounded"
                />
                <input 
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="p-2 border rounded"
                />
                <button 
                  onClick={handleAddStudent}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                  Adicionar Aluno
                </button>
              </div>

              {/* Students List */}
              {students.map((student) => (
                <div 
                  key={student.id} 
                  className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
                >
                  {editingStudent?.id === student.id ? (
                    <div className="grid grid-cols-4 gap-4 w-full">
                      <input 
                        value={editingStudent.name}
                        onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <input 
                        value={editingStudent.course}
                        onChange={(e) => setEditingStudent({...editingStudent, course: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <input 
                        value={editingStudent.email}
                        onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveStudent}
                          className="bg-green-500 text-white p-2 rounded"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setEditingStudent(null)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-gray-500">{student.course}</p>
                        <p className="text-sm text-gray-400">{student.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Edit 
                          onClick={() => handleEditStudent(student)} 
                          className="text-blue-600 cursor-pointer" 
                        />
                        <Trash2 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="text-red-600 cursor-pointer" 
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Inventário</h2>
                <p className="text-blue-100">Gerenciamento de Equipamentos</p>
              </div>
              <Plus className="w-6 h-6 cursor-pointer" />
            </div>

            <div className="p-6 space-y-4">
              {/* Add Item Form */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <input 
                  placeholder="Nome do Item"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="p-2 border rounded"
                />
                <input 
                  placeholder="Categoria"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="p-2 border rounded"
                />
                <input 
                  type="number"
                  placeholder="Quantidade"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                  className="p-2 border rounded"
                />
                <button 
                  onClick={handleAddItem}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                  Adicionar Item
                </button>
              </div>

              {/* Inventory List */}
              {inventoryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center p-4 border rounded hover:bg-gray-50"
                >
                  {editingItem?.id === item.id ? (
                    <div className="grid grid-cols-4 gap-4 w-full">
                      <input 
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <input 
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        className="p-2 border rounded"
                      />
                      <input 
                        type="number"
                        value={editingItem.quantity}
                        onChange={(e) => setEditingItem({...editingItem, quantity: parseInt(e.target.value) || 0})}
                        className="p-2 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveItem}
                          className="bg-green-500 text-white p-2 rounded"
                        >
                          <Save className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => setEditingItem(null)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Edit 
                          onClick={() => handleEditItem(item)} 
                          className="text-blue-600 cursor-pointer" 
                        />
                        <Trash2 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 cursor-pointer" 
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessorSpace;