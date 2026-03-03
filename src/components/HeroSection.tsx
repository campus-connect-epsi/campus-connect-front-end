import { Search, Calendar, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#00796B] to-[#00695C] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Campus Connect</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Votre matériel, vos projets, votre avenir
          </p>
          <p className="text-lg mb-10 text-green-100 max-w-2xl mx-auto">
            Plateforme collaborative pour étudiants : partagez du matériel, collaborez sur des
            projets et construisez votre réseau universitaire.
          </p>

          {/* Quick Search */}
          <div className="bg-white rounded-lg p-6 mb-10 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Rechercher du matériel, des projets..."
                  className="pl-10 h-12 text-gray-800"
                />
              </div>
              <Button className="bg-[#FFC107] text-gray-800 hover:bg-yellow-500 h-12 px-8">
                Rechercher
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#00796B] h-auto py-4 flex flex-col items-center"
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Réserver</span>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#00796B] h-auto py-4 flex flex-col items-center"
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="text-sm">Forum</span>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#00796B] h-auto py-4 flex flex-col items-center"
            >
              <Share2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Partager</span>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#00796B] h-auto py-4 flex flex-col items-center"
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Événements</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
