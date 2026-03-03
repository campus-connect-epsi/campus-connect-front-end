import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User, Clock, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { getEquipment } from "@/composables/useEquipement";
import type { Equipment } from "@/types";

// Static reviews – will come from a dedicated reviews endpoint in the future
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

const EquipmentDetail = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getEquipment(Number(id))
      .then((data) => { if (mounted) setEquipment(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/equipment"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au matériel
          </Link>
        </div>

        {loading && <p className="text-muted-foreground">Chargement...</p>}

        {!loading && !equipment && (
          <p className="text-muted-foreground">Matériel introuvable.</p>
        )}

        {equipment && (
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
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <img
                      src={equipment.image}
                      alt={equipment.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{equipment.description}</p>
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
                                {[1, 2, 3, 4, 5].map((star) => (
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
        )}
      </div>
    </div>
  );
};

export default EquipmentDetail;
