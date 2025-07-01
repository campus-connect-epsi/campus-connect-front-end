
import { useState } from "react";
import { Search, Filter, Plus, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Système de tri automatique des déchets",
      author: "Marie Dubois - Génie Environnemental",
      description: "Développement d'un système IoT pour optimiser le tri des déchets sur le campus avec reconnaissance d'images",
      image: "/placeholder.svg",
      tags: ["IoT", "Environnement", "Innovation", "Machine Learning"],
      likes: 42,
      views: 235,
      date: "2024-06-15"
    },
    {
      id: 2,
      title: "Application mobile pour covoiturage étudiant",
      author: "Pierre Martin - Informatique",
      description: "App collaborative pour réduire l'empreinte carbone des déplacements étudiants avec système de points",
      image: "/placeholder.svg",
      tags: ["Mobile", "Durable", "Social", "React Native"],
      likes: 38,
      views: 189,
      date: "2024-06-10"
    },
    {
      id: 3,
      title: "Robot de nettoyage autonome pour laboratoires",
      author: "Sophie Chen - Génie Mécanique",
      description: "Conception d'un robot autonome pour maintenir la propreté des espaces de laboratoire",
      image: "/placeholder.svg",
      tags: ["Robotique", "Automatisation", "Innovation"],
      likes: 55,
      views: 312,
      date: "2024-06-08"
    },
    {
      id: 4,
      title: "Capteur de qualité de l'air connecté",
      author: "Alex Moreau - Génie Électrique",
      description: "Développement d'un réseau de capteurs pour surveiller la qualité de l'air sur le campus",
      image: "/placeholder.svg",
      tags: ["IoT", "Environnement", "Électronique", "Données"],
      likes: 29,
      views: 156,
      date: "2024-06-05"
    },
    {
      id: 5,
      title: "Plateforme de gestion énergétique intelligente",
      author: "Emma Lefebvre - Génie Civil",
      description: "Système intelligent pour optimiser la consommation énergétique des bâtiments universitaires",
      image: "/placeholder.svg",
      tags: ["Énergie", "IA", "Bâtiment", "Optimisation"],
      likes: 47,
      views: 278,
      date: "2024-06-02"
    },
    {
      id: 6,
      title: "Assistant virtuel pour l'apprentissage",
      author: "Lucas Dubois - Informatique",
      description: "Chatbot intelligent pour aider les étudiants dans leurs révisions et répondre aux questions fréquentes",
      image: "/placeholder.svg",
      tags: ["IA", "Éducation", "NLP", "Chatbot"],
      likes: 63,
      views: 445,
      date: "2024-05-28"
    }
  ];

  const departments = ["all", "Informatique", "Génie Civil", "Génie Mécanique", "Génie Électrique", "Génie Environnemental"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || project.author.includes(selectedDepartment);
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Projets Étudiants
          </h1>
          <Button className="bg-[#00796B] hover:bg-[#00695C]">
            <Plus className="h-4 w-4 mr-2" />
            Partager mon projet
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-[#00796B]">{projects.length}</div>
            <div className="text-sm text-gray-600">Projets partagés</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-[#FFC107]">
              {projects.reduce((sum, p) => sum + p.likes, 0)}
            </div>
            <div className="text-sm text-gray-600">J'aime au total</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-700">
              {projects.reduce((sum, p) => sum + p.views, 0)}
            </div>
            <div className="text-sm text-gray-600">Vues totales</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-[#00796B]">
              {departments.length - 1}
            </div>
            <div className="text-sm text-gray-600">Départements actifs</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recherche
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "Tous départements" : dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]">
                  <option value="recent">Plus récent</option>
                  <option value="likes">Plus aimé</option>
                  <option value="views">Plus vu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <div key={project.id} className="relative">
                  <ProjectCard project={project} />
                  <div className="absolute top-2 left-2 flex items-center space-x-2">
                    <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {project.views}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
