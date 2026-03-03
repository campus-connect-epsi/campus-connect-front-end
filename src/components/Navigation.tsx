import { useState, useEffect } from "react";
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
import { useSettings, AppSettings } from "@/hooks/use-settings";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { settings } = useSettings();
  const [enabledSections, setEnabledSections] = useState(settings.enabledSections);
  const location = useLocation();

  useEffect(() => {
    const handleSettingsUpdate = () => {
      const saved = localStorage.getItem("campus-connect-settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setEnabledSections(parsed.enabledSections);
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
    };

    window.addEventListener("settings-updated", handleSettingsUpdate);
    return () => window.removeEventListener("settings-updated", handleSettingsUpdate);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const allNavLinks = [
    { path: "/equipment", label: "Matériel", icon: Wrench, key: "equipment" },
    { path: "/projects", label: "Projets", icon: FolderOpen, key: "projects" },
    { path: "/forum", label: "Forum", icon: MessageSquare, key: "forum" },
    { path: "/events", label: "Événements", icon: Calendar, key: "events" },
    { path: "/schedule", label: "Emploi du Temps", icon: CalendarDays, key: "schedule" },
    { path: "/documents", label: "Documents", icon: FileText, key: "documents" },
    { path: "/discussions", label: "Discussions", icon: MessageCircle, key: "discussions" },
  ];

  const navLinks = allNavLinks.filter(
    (link) => enabledSections[link.key as keyof AppSettings["enabledSections"]]
  );

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
                className={`relative flex items-center h-16 text-gray-700 hover:text-[#00796B] transition-colors ${
                  isActive(path) ? "text-[#00796B] font-semibold" : ""
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
                {isActive(path) && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#00796B] rounded-t-full"></span>
                )}
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
            <div className="flex flex-col space-y-1">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:text-[#00796B] hover:bg-gray-50 transition-colors border-l-4 ${
                    isActive(path)
                      ? "text-[#00796B] font-semibold bg-[#00796B]/5 border-[#00796B]"
                      : "border-transparent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 px-4 border-t mt-2">
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
