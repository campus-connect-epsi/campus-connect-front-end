import { useState } from "react";
import { Search, Plus, ThumbsUp, MessageCircle, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const forumPosts = [
    {
      id: 1,
      title: "Comment utiliser l'imprimante 3D du Fab Lab ?",
      author: "Marie Dubois",
      avatar: "/placeholder.svg",
      content:
        "Bonjour, je cherche des informations sur l'utilisation de l'imprimante 3D. Quelqu'un peut-il m'expliquer la procédure de réservation ?",
      category: "Matériel",
      tags: ["impression-3d", "fab-lab", "aide"],
      likes: 12,
      replies: 8,
      createdAt: "2024-06-25T10:30:00Z",
      isResolved: false,
    },
    {
      id: 2,
      title: "Recherche coéquipiers pour projet robotique",
      author: "Pierre Martin",
      avatar: "/placeholder.svg",
      content:
        "Je travaille sur un projet de robot autonome et je cherche des étudiants en électronique et programmation pour m'aider.",
      category: "Projets",
      tags: ["robotique", "collaboration", "électronique"],
      likes: 25,
      replies: 15,
      createdAt: "2024-06-24T14:20:00Z",
      isResolved: false,
    },
    {
      id: 3,
      title: "Problème avec le microscope du labo",
      author: "Sophie Chen",
      avatar: "/placeholder.svg",
      content:
        "Le microscope optique semble avoir un problème d'éclairage. À qui dois-je signaler ce dysfonctionnement ?",
      category: "Support",
      tags: ["microscope", "maintenance", "laboratoire"],
      likes: 5,
      replies: 3,
      createdAt: "2024-06-23T16:45:00Z",
      isResolved: true,
    },
    {
      id: 4,
      title: "Tutoriel : Programmation Arduino pour débutants",
      author: "Alex Moreau",
      avatar: "/placeholder.svg",
      content:
        "Voici un guide complet pour débuter avec Arduino. Je partage mon expérience et quelques projets simples à réaliser.",
      category: "Tutoriels",
      tags: ["arduino", "programmation", "débutant"],
      likes: 38,
      replies: 22,
      createdAt: "2024-06-22T09:15:00Z",
      isResolved: false,
    },
  ];

  const categories = ["all", "Matériel", "Projets", "Support", "Tutoriels", "Général"];

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Forum d'Entraide</h1>
          <Button className="bg-[#00796B] hover:bg-[#00695C]">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle discussion
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-[#00796B] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category === "all" ? "Toutes" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Forum Posts */}
          <div className="flex-1 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 hover:text-[#00796B] cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Par {post.author} • {formatDate(post.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.isResolved && (
                        <Badge className="bg-green-500 hover:bg-green-600">Résolu</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-[#00796B]">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-[#00796B]">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.replies}</span>
                      </button>
                    </div>
                    <Button variant="outline" size="sm">
                      Répondre
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
