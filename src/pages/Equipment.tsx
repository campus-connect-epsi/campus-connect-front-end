
import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import EquipmentCard from "@/components/EquipmentCard";

const Equipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const equipmentItems = [
    {
      id: 1,
      name: "Perceuse électrique BOSCH",
      category: "Outillage",
      status: "Disponible",
      image: "/equipement/Perceuse-electrique-BOSCH.png",
      description: "Perceuse électrique professionnelle avec accessoires",
      rating: 4.8
    },
    {
      id: 2,
      name: "Caméra DSLR Canon",
      category: "Multimédia",
      status: "Réservé",
      image: "/equipement/Camera-DSLR-Canon.png",
      description: "Caméra haute résolution pour projets créatifs",
      rating: 4.9
    },
    {
      id: 3,
      name: "Imprimante 3D Prusa",
      category: "Fabrication",
      status: "Disponible",
      image: "/equipement/Imprimante-3D-Prusa.png",
      description: "Imprimante 3D pour prototypage",
      rating: 4.7
    },
    {
      id: 4,
      name: "Oscilloscope numérique",
      category: "Électronique",
      status: "Disponible",
      image: "/equipement/Oscilloscope-numerique.png",
      description: "Oscilloscope 4 canaux pour mesures électroniques",
      rating: 4.6
    },
    {
      id: 5,
      name: "Microscope optique",
      category: "Laboratoire",
      status: "En maintenance",
      image: "/equipement/Microscope-optique.png",
      description: "Microscope binoculaire avec éclairage LED",
      rating: 4.5
    },
    {
      id: 6,
      name: "Kit Arduino Uno",
      category: "Électronique",
      status: "Disponible",
      image: "/equipement/Kit-Arduino-Uno.png",
      description: "Kit complet avec capteurs et composants",
      rating: 4.9
    }
  ];

  const categories = ["all", "Outillage", "Multimédia", "Fabrication", "Électronique", "Laboratoire"];

  const filteredEquipment = equipmentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Matériel Disponible
          </h1>
          <Button className="bg-[#00796B] hover:bg-[#00695C]">
            <Plus className="h-4 w-4 mr-2" />
            Demander du matériel
          </Button>
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
                  Catégorie
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "Toutes catégories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilité
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Disponible</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Réservé</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">En maintenance</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEquipment.map(item => (
                <EquipmentCard key={item.id} equipment={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipment;
