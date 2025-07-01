
import { useState } from "react";
import { Search, Menu, X, Calendar, MessageCircle, Share2, Users, Wrench, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/HeroSection";
import EquipmentCard from "@/components/EquipmentCard";
import ProjectCard from "@/components/ProjectCard";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const equipmentItems = [
    {
      id: 1,
      name: "Perceuse électrique BOSCH",
      category: "Outillage",
      status: "Disponible",
      image: "/placeholder.svg",
      description: "Perceuse électrique professionnelle avec accessoires",
      rating: 4.8
    },
    {
      id: 2,
      name: "Caméra DSLR Canon",
      category: "Multimédia",
      status: "Réservé",
      image: "/placeholder.svg",
      description: "Caméra haute résolution pour projets créatifs",
      rating: 4.9
    },
    {
      id: 3,
      name: "Imprimante 3D Prusa",
      category: "Fabrication",
      status: "Disponible",
      image: "/placeholder.svg",
      description: "Imprimante 3D pour prototypage",
      rating: 4.7
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Système de tri automatique des déchets",
      author: "Marie Dubois - Génie Environnemental",
      description: "Développement d'un système IoT pour optimiser le tri des déchets sur le campus",
      image: "/placeholder.svg",
      tags: ["IoT", "Environnement", "Innovation"],
      likes: 42,
      date: "2024-06-15"
    },
    {
      id: 2,
      title: "Application mobile pour covoiturage étudiant",
      author: "Pierre Martin - Informatique",
      description: "App collaborative pour réduire l'empreinte carbone des déplacements étudiants",
      image: "/placeholder.svg",
      tags: ["Mobile", "Durable", "Social"],
      likes: 38,
      date: "2024-06-10"
    }
  ];

  const categories = ["all", "Outillage", "Multimédia", "Fabrication", "Électronique"];

  const filteredEquipment = equipmentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Pourquoi choisir Campus Connect ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wrench className="w-12 h-12 mx-auto text-[#00796B] mb-4" />
                <CardTitle className="text-xl">Matériel Partagé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accédez à une large gamme d'équipements professionnels partagés entre étudiants
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-[#FFC107] mb-4" />
                <CardTitle className="text-xl">Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connectez-vous avec d'autres étudiants pour des projets collaboratifs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-12 h-12 mx-auto text-[#00796B] mb-4" />
                <CardTitle className="text-xl">Projets Étudiants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Partagez vos projets et découvrez ceux des autres étudiants
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Matériel Disponible
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher du matériel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "Toutes catégories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map(item => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Projets Étudiants Récents
            </h2>
            <Button variant="outline" className="border-[#00796B] text-[#00796B] hover:bg-[#00796B] hover:text-white">
              Voir tous les projets
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#00796B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à rejoindre Campus Connect ?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Votre matériel, vos projets, votre avenir
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#FFC107] text-gray-800 hover:bg-yellow-500">
              Créer un compte
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#00796B]">
              Se connecter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Campus Connect</h3>
              <p className="text-gray-400">
                Plateforme collaborative pour étudiants
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Réservation matériel</li>
                <li>Forum d'entraide</li>
                <li>Projets étudiants</li>
                <li>Messagerie</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Documentation</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>campus-connect@univ.fr</li>
                <li>+33 1 23 45 67 89</li>
                <li>Campus Universitaire</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campus Connect. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
