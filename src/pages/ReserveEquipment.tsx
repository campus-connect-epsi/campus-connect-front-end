import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const ReserveEquipment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    location: ""
  });

  // Mock equipment data
  const equipment = {
    id: 1,
    name: "Perceuse électrique BOSCH PSB 1800 LI-2",
    category: "Outillage",
    status: "Disponible",
    location: "Atelier Mécanique - Étagère B3",
    owner: "MyDIL - Campus Connect"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
    // Here you would typically submit to an API
    navigate("/reservations");
  };

  const isFormValid = () => {
    return formData.startDate && formData.endDate && formData.startTime && formData.endTime && formData.purpose;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to={`/equipment/${id}`} className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au détail
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Réserver le matériel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Date de début</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Date de fin</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Heure de début</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">Heure de fin</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Purpose */}
                  <div>
                    <Label htmlFor="purpose">Objet de la réservation</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Décrivez brièvement l'utilisation prévue du matériel..."
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <Label htmlFor="location">Lieu de récupération souhaité (optionnel)</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Atelier principal, Bureau étudiant..."
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  {/* Terms */}
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Conditions d'utilisation</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Le matériel doit être restitué dans l'état initial</li>
                      <li>• Tout dommage sera facturé au tarif en vigueur</li>
                      <li>• La réservation peut être annulée jusqu'à 2h avant</li>
                      <li>• Un retard de plus de 30 min annule automatiquement la réservation</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={!isFormValid()}
                    >
                      Confirmer la réservation
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate(-1)}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Equipment Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">{equipment.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{equipment.category}</Badge>
                    <Badge className="bg-green-500">{equipment.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{equipment.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{equipment.owner}</span>
                  </div>
                </div>

                {formData.startDate && formData.endDate && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Période sélectionnée</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Du {new Date(formData.startDate).toLocaleDateString('fr-FR')} 
                          au {new Date(formData.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      {formData.startTime && formData.endTime && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>De {formData.startTime} à {formData.endTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveEquipment;