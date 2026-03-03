import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Tag, Users } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const NewDiscussion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [] as string[],
    newTag: "",
  });

  const categories = ["Matériel", "Projet", "Réservation", "Technique", "Général"];

  const popularTags = [
    "imprimante-3d",
    "arduino",
    "raspberry-pi",
    "electronique",
    "menuiserie",
    "soudure",
    "programmation",
    "aide",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
        newTag: "",
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Discussion created:", formData);
    // Here you would typically submit to an API
    navigate("/discussions");
  };

  const isFormValid = () => {
    return formData.title.trim() && formData.category && formData.content.trim();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/discussions"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux discussions
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Nouvelle Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Titre de la discussion</Label>
                  <Input
                    id="title"
                    placeholder="Posez votre question ou décrivez votre sujet..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
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

                {/* Content */}
                <div>
                  <Label htmlFor="content">Description détaillée</Label>
                  <Textarea
                    id="content"
                    placeholder="Décrivez votre question, problème ou sujet de discussion en détail..."
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="space-y-3">
                    {/* Selected Tags */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Add Custom Tag */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ajouter un tag personnalisé..."
                        value={formData.newTag}
                        onChange={(e) => handleInputChange("newTag", e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(formData.newTag);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addTag(formData.newTag)}
                        disabled={!formData.newTag.trim()}
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>

                    {/* Popular Tags */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Tags populaires :</p>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => addTag(tag)}
                          >
                            + {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Conseils pour une bonne discussion
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Soyez précis dans votre titre et votre description</li>
                    <li>• Utilisez des tags pertinents pour faciliter la recherche</li>
                    <li>• Restez respectueux et constructif</li>
                    <li>• N'hésitez pas à partager des images si nécessaire</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={!isFormValid()}
                  >
                    Publier la discussion
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

export default NewDiscussion;
