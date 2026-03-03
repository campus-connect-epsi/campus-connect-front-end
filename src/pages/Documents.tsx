import { useEffect, useState } from "react";
import { FileText, Upload, Share, Eye, Edit, Trash2, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { getDocuments, deleteDocument } from "@/composables/useDocuments";
import type { CampusDocument } from "@/types";

const Documents = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<CampusDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getDocuments()
      .then((data) => { if (mounted) setDocuments(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id: number) => {
    await deleteDocument(id);
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      personnel: "default",
      partage: "secondary",
      projet: "outline"
    };

    const labels = {
      personnel: "Personnel",
      partage: "Partagé",
      projet: "Projet",
    };

    return (
      <Badge variant={variants[category] || "default"}>
        {labels[category as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Gestion des Documents</h1>
          <Button className="bg-primary hover:bg-primary/90">
            <a href="/documents/upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Nouveau Document
            </a>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les documents</SelectItem>
                  <SelectItem value="personnel">Personnels</SelectItem>
                  <SelectItem value="partage">Partagés</SelectItem>
                  <SelectItem value="projet">Projets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-foreground">{doc.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getCategoryBadge(doc.category)}
                          <span className="text-sm text-muted-foreground">{doc.size}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{doc.owner}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {doc.shared && (
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Area */}
        <Card className="mt-8">
          <CardContent className="p-8">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Télécharger un nouveau document</h3>
              <p className="text-muted-foreground mb-4">
                Glissez-déposez vos fichiers ici ou cliquez pour parcourir
              </p>
              <Button>Choisir des fichiers</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
