
import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#00796B] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Campus Connect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
              Matériel
            </a>
            <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
              Projets
            </a>
            <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
              Forum
            </a>
            <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
              Événements
            </a>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button className="bg-[#00796B] hover:bg-[#00695C]">
                Se connecter
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
                Matériel
              </a>
              <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
                Projets
              </a>
              <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
                Forum
              </a>
              <a href="#" className="text-gray-700 hover:text-[#00796B] transition-colors">
                Événements
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" className="border-[#00796B] text-[#00796B]">
                  Notifications
                </Button>
                <Button className="bg-[#00796B] hover:bg-[#00695C]">
                  Se connecter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
