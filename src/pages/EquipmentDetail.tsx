import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User, Clock, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";

const EquipmentDetail = () => {
  const { id } = useParams();

  // Mock data - in real app would fetch based on id
  const equipment = {
    id: 1,
    name: "Perceuse électrique BOSCH PSB 1800 LI-2",
    category: "Outillage",
    status: "Disponible",
    description: "Perceuse sans fil professionnelle avec 2 batteries lithium-ion. Idéale pour percer dans le bois, métal et béton. Couple de serrage réglable et éclairage LED intégré.",
    specifications: {
      "Puissance": "18V",
      "Couple max": "46 Nm",
      "Mandrin": "1.5-13 mm",
      "Poids": "1.4 kg",
      "Autonomie": "45 min"
    },
    images: ["/placeholder.svg"],
    location: "Atelier Mécanique - Étagère B3",
    owner: "MyDIL - Campus Connect",
    rating: 4.5,
    totalReservations: 23,
    availableUntil: "2024-07-15"
  };

  const reviews = [
    {
      id: 1,
      user: "Pierre Martin",
      rating: 5,
      comment: "Excellent matériel, très efficace pour mon projet de menuiserie !",
      date: "2024-06-20"
    },
    {
      id: 2,
      user: "Sophie Chen", 
      rating: 4,
      comment: "Bonne perceuse, batterie qui tient bien. Quelques signes d'usure mais fonctionne parfaitement.",
      date: "2024-06-15"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/equipment" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au matériel
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{equipment.name}</CardTitle>
                    <div className="flex items-center space-x-3 mt-2">
                      <Badge variant="outline">{equipment.category}</Badge>
                      <Badge className="bg-green-500">{equipment.status}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{equipment.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({equipment.totalReservations} avis)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Images */}
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={equipment.images[0]} 
                    alt={equipment.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{equipment.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold mb-3">Spécifications techniques</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(equipment.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{equipment.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Avis utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {review.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="flex items-center">
                              {[1,2,3,4,5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-3 w-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Réserver ce matériel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{equipment.owner}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Disponible jusqu'au {new Date(equipment.availableUntil).toLocaleDateString('fr-FR')}</span>
                </div>

                <Link to={`/equipment/${id}/reserve`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver maintenant
                  </Button>
                </Link>

                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contacter le propriétaire
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Réservations totales</span>
                    <span className="font-medium">{equipment.totalReservations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Note moyenne</span>
                    <span className="font-medium">{equipment.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statut</span>
                    <Badge className="bg-green-500">{equipment.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;