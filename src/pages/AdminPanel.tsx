
import { useState } from "react";
import { Plus, Settings, Users, Wrench, Calendar, BarChart3, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";

const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState("overview");

  const stats = {
    totalUsers: 145,
    activeReservations: 23,
    totalEquipment: 87,
    upcomingEvents: 12
  };

  const recentUsers = [
    { id: 1, name: "Marie Dubois", email: "marie.dubois@univ.fr", department: "Génie Environnemental", joinDate: "2024-06-25" },
    { id: 2, name: "Pierre Martin", email: "pierre.martin@univ.fr", department: "Informatique", joinDate: "2024-06-24" },
    { id: 3, name: "Sophie Chen", email: "sophie.chen@univ.fr", department: "Génie Électrique", joinDate: "2024-06-23" }
  ];

  const equipmentList = [
    { id: 1, name: "Perceuse électrique BOSCH", category: "Outillage", status: "Disponible", reservations: 15 },
    { id: 2, name: "Caméra DSLR Canon", category: "Multimédia", status: "Réservé", reservations: 22 },
    { id: 3, name: "Imprimante 3D Prusa", category: "Fabrication", status: "En maintenance", reservations: 8 }
  ];

  const eventsList = [
    { id: 1, name: "Workshop Impression 3D", date: "2024-07-15", attendees: 15, status: "Confirmé" },
    { id: 2, name: "Hackathon Développement Durable", date: "2024-07-20", attendees: 45, status: "Complet" },
    { id: 3, name: "Conférence Innovation", date: "2024-07-25", attendees: 80, status: "Confirmé" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Panneau d'Administration
          </h1>
          <Badge variant="outline" className="text-[#00796B] border-[#00796B]">
            Administrateur
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center">
              <Wrench className="h-4 w-4 mr-2" />
              Matériel
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Événements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Utilisateurs Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#00796B]">{stats.totalUsers}</div>
                  <p className="text-xs text-green-600">+12% ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Réservations Actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#FFC107]">{stats.activeReservations}</div>
                  <p className="text-xs text-green-600">+5% cette semaine</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Matériel Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-700">{stats.totalEquipment}</div>
                  <p className="text-xs text-blue-600">3 nouveaux ce mois</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Événements à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#00796B]">{stats.upcomingEvents}</div>
                  <p className="text-xs text-gray-600">Ce mois</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nouveaux Utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.department}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Marie D.</span> a réservé une perceuse électrique
                      <span className="text-gray-500 ml-2">Il y a 2h</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Pierre M.</span> a ajouté un nouveau projet
                      <span className="text-gray-500 ml-2">Il y a 4h</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Admin</span> a ajouté du nouveau matériel
                      <span className="text-gray-500 ml-2">Il y a 1j</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
              <Button className="bg-[#00796B] hover:bg-[#00695C]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Utilisateur
              </Button>
            </div>
            
            <Card>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#00796B] rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email} • {user.department}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion du Matériel</h2>
              <Button className="bg-[#00796B] hover:bg-[#00695C]">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Matériel
              </Button>
            </div>
            
            <Card>
              <CardContent>
                <div className="space-y-4">
                  {equipmentList.map(equipment => (
                    <div key={equipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{equipment.name}</div>
                        <div className="text-sm text-gray-600">
                          {equipment.category} • {equipment.reservations} réservations
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          className={equipment.status === 'Disponible' ? 'bg-green-500' : 
                                   equipment.status === 'Réservé' ? 'bg-yellow-500' : 'bg-red-500'}
                        >
                          {equipment.status}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Événements</h2>
              <Button className="bg-[#00796B] hover:bg-[#00695C]">
                <Plus className="h-4 w-4 mr-2" />
                Créer Événement
              </Button>
            </div>
            
            <Card>
              <CardContent>
                <div className="space-y-4">
                  {eventsList.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('fr-FR')} • {event.attendees} participants
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          className={event.status === 'Confirmé' ? 'bg-green-500' : 'bg-blue-500'}
                        >
                          {event.status}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres Système</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration Générale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Inscriptions ouvertes</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Réservations automatiques</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Notifications email</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Sauvegarder la base de données
                  </Button>
                  <Button variant="outline" className="w-full">
                    Nettoyer les logs
                  </Button>
                  <Button variant="outline" className="w-full text-red-600">
                    Mode maintenance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
