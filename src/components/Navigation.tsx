import { useState } from "react";
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  Calendar,
  MessageSquare,
  FolderOpen,
  Wrench,
  FileText,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/equipment", label: "Matériel", icon: Wrench },
    { path: "/projects", label: "Projets", icon: FolderOpen },
    { path: "/forum", label: "Forum", icon: MessageSquare },
    { path: "/events", label: "Événements", icon: Calendar },
    { path: "/schedule", label: "Emploi du Temps", icon: CalendarDays },
    { path: "/documents", label: "Documents", icon: FileText },
    { path: "/discussions", label: "Discussions", icon: MessageCircle },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-[#00796B] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Campus Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center text-gray-700 hover:text-[#00796B] transition-colors ${
                  isActive(path) ? "text-[#00796B] font-semibold" : ""
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link to="/reservations">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
              </Link>

              <div className="relative group">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Link>
                  <Link
                    to="/reservations"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Mes réservations
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Administration
                  </Link>
                  <div className="border-t my-1"></div>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Link>
                </div>
              </div>

              <Link to="/login">
                <Button className="bg-[#00796B] hover:bg-[#00695C]">Se connecter</Button>
              </Link>
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
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center text-gray-700 hover:text-[#00796B] transition-colors ${
                    isActive(path) ? "text-[#00796B] font-semibold" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link to="/reservations" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#00796B] text-[#00796B]"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Mes réservations
                  </Button>
                </Link>
                <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#00796B] text-[#00796B]"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-[#00796B] hover:bg-[#00695C]">Se connecter</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
