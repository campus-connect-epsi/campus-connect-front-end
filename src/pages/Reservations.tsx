
import { useState } from "react";
import { Calendar, Clock, MapPin, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Reservations = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const reservations = [
    {
      id: 1,
      equipmentName: "Perceuse électrique BOSCH",
      equipmentImage: "/placeholder.svg",
      startDate: "2024-07-02",
      endDate: "2024-07-05",
      startTime: "09:00",
      endTime: "17:00",
      location: "Atelier Mécanique - Bâtiment B",
      status: "confirmée",
      purpose: "Projet de prototypage pour le cours de conception mécanique"
    },
    {
      id: 2,
      equipmentName: "Caméra DSLR Canon",
      equipmentImage: "/placeholder.svg",
      startDate: "2024-07-08",
      endDate: "2024-07-08",
      startTime: "14:00",
      endTime: "18:00",
      location: "Studio Photo - Bâtiment C",
      status: "en_attente",
      purpose: "Tournage vidéo pour présentation de projet"
    },
    {
      id: 3,
      equipmentName: "Imprimante 3D Prusa",
      equipmentImage: "/placeholder.svg",
      startDate: "2024-06-28",
      endDate: "2024-06-30",
      startTime: "10:00",
      endTime: "16:00",
      location: "Fab Lab - Bâtiment A",
      status: "terminée",
      purpose: "Impression de pièces pour robot autonome"
    },
    {
      id: 4,
      equipmentName: "Oscilloscope numérique",
      equipmentImage: "/placeholder.svg",
      startDate: "2024-07-12",
      endDate: "2024-07-15",
      startTime: "08:00",
      endTime: "12:00",
      location: "Laboratoire Électronique",
      status: "confirmée",
      purpose: "Analyse de signaux pour projet de filtrage"
    },
    {
      id: 5,
      equipmentName: "Kit Arduino Uno",
      equipmentImage: "/placeholder.svg",
      startDate: "2024-06-20",
      endDate: "2024-06-22",
      startTime: "13:00",
      endTime: "17:00",
      location: "Salle d'électronique",
      status: "annulée",
      purpose: "Développement capteur de température"
    }
  ];

  const statusLabels = {
    confirmée: { label: "Confirmée", color: "bg-green-500" },
    en_attente: { label: "En attente", color: "bg-yellow-500" },
    terminée: { label: "Terminée", color: "bg-gray-500" },
    annulée: { label: "Annulée", color: "bg-red-500" }
  };

  const statusOptions = ["all", "confirmée", "en_attente", "terminée", "annulée"];

  const filteredReservations = reservations.filter(reservation => 
    selectedStatus === "all" || reservation.status === selectedStatus
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const getStatusColor = (status: string) => {
    return statusLabels[status as keyof typeof statusLabels]?.color || "bg-gray-500";
  };

  const getStatusLabel = (status: string) => {
    return statusLabels[status as keyof typeof statusLabels]?.label || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Mes Réservations
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-500">
              {reservations.filter(r => r.status === 'confirmée').length}
            </div>
            <div className="text-sm text-gray-600">Confirmées</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {reservations.filter(r => r.status === 'en_attente').length}
            </div>
            <div className="text-sm text-gray-600">En attente</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-500">
              {reservations.filter(r => r.status === 'terminée').length}
            </div>
            <div className="text-sm text-gray-600">Terminées</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-red-500">
              {reservations.filter(r => r.status === 'annulée').length}
            </div>
            <div className="text-sm text-gray-600">Annulées</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            >
              <option value="all">Toutes les réservations</option>
              {statusOptions.slice(1).map(status => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.map(reservation => (
            <Card key={reservation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={reservation.equipmentImage}
                      alt={reservation.equipmentName}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                    />
                    <div>
                      <CardTitle className="text-xl text-gray-800">
                        {reservation.equipmentName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {reservation.purpose}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(reservation.status)} hover:${getStatusColor(reservation.status)}`}>
                    {getStatusLabel(reservation.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {formatDate(reservation.startDate)} - {formatDate(reservation.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {reservation.startTime} - {reservation.endTime}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{reservation.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                  {reservation.status === 'confirmée' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Annuler
                    </Button>
                  )}
                  {reservation.status === 'en_attente' && (
                    <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-700">
                      Modifier
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              Aucune réservation trouvée
            </div>
            <Button className="bg-[#00796B] hover:bg-[#00695C]">
              Réserver du matériel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
