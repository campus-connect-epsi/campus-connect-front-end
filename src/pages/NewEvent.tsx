import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";

const NewEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxParticipants: "",
    category: "",
    isPublic: true,
  });

  const categories = ["Workshop", "Conférence", "Formation", "Hackathon", "Networking", "Autre"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Event created:", formData);
    // Here you would typically submit to an API
    navigate("/events");
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.date &&
      formData.startTime &&
      formData.endTime &&
      formData.location.trim() &&
      formData.category
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/events"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux événements
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Proposer un Événement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Titre de l'événement</Label>
                  <Input
                    id="title"
                    placeholder="Workshop Impression 3D, Conférence Innovation..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Type d'événement</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre événement : objectifs, programme, prérequis..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
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

                {/* Location */}
                <div>
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    placeholder="Amphi A, Salle de conférence, Atelier..."
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                {/* Max Participants */}
                <div>
                  <Label htmlFor="maxParticipants">
                    Nombre maximum de participants (optionnel)
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="Laissez vide pour aucune limite"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    min="1"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Image de l'événement (optionnel)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
                    <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Glissez-déposez une image ou
                      <Button variant="link" className="p-0 h-auto ml-1">
                        parcourez
                      </Button>
                    </p>
                  </div>
                </div>

                {/* Visibility */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={formData.isPublic}
                      onChange={(e) => handleInputChange("isPublic", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="isPublic" className="text-sm">
                      Événement public (visible par tous les utilisateurs)
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Les événements privés ne sont visibles que par votre département
                  </p>
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Conseils pour un événement réussi
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prévoyez votre événement au moins 1 semaine à l'avance</li>
                    <li>• Vérifiez la disponibilité du lieu et du matériel nécessaire</li>
                    <li>• Indiquez clairement les prérequis ou le niveau requis</li>
                    <li>• Pensez à prévoir des pauses pour les événements longs</li>
                  </ul>
                </div>

                {/* Preview */}
                {formData.title && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-semibold mb-2">Aperçu</h3>
                    <div className="space-y-2">
                      <h4 className="font-medium">{formData.title}</h4>
                      {formData.date && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(formData.date).toLocaleDateString("fr-FR")}
                            {formData.startTime && ` • ${formData.startTime}`}
                            {formData.endTime && ` - ${formData.endTime}`}
                          </span>
                        </div>
                      )}
                      {formData.location && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={!isFormValid()}
                  >
                    Proposer l'événement
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
