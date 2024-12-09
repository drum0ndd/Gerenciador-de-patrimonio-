import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";

const InstitutionRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/salas', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setRooms(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchRooms();
  }, []);

  const handleRoomDetails = (room) => {
    setSelectedRoom(room);
  };

  if (isLoading) {
    return <p>Carregando salas...</p>;
  }

  if (error) {
    return <p>Erro ao carregar salas: {error}</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">UFSC - Salas Disponíveis</h1>
          <Building2 className="w-6 h-6" />
        </div>
      </header>

      <main className="p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" />
                Gerenciamento de Salas
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <div 
                    key={room.id} 
                    className={`border rounded-lg p-4 shadow-sm transition-all 
                      ${room.available 
                        ? 'bg-white hover:bg-blue-50 border-blue-200' 
                        : 'bg-gray-100 border-gray-300 opacity-70'}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs ${
                          room.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {room.available ? 'Disponível' : 'Ocupado'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{room.building}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Capacidade: {room.capacity} pessoas</span>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger 
                        onClick={() => handleRoomDetails(room)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                      >
                        Ver Detalhes
                      </DialogTrigger>
                      
                      {selectedRoom && (
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{selectedRoom.name}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                              <span>{selectedRoom.building}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Users className="w-5 h-5 mr-2 text-blue-600" />
                              <span>Capacidade: {selectedRoom.capacity} pessoas</span>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold mb-2">Horários Disponíveis:</h4>
                              {selectedRoom.schedule.map((slot, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center text-gray-600 mb-1"
                                >
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span>{slot.day}: </span>
                                  {slot.periods.map((period, periodIndex) => (
                                    <span 
                                      key={periodIndex} 
                                      className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                    >
                                      {period}
                                    </span>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InstitutionRooms;