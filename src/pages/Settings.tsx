
import { useState } from "react";
import { User, Lock, Bell, Eye, Save, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@univ.fr",
    studentId: "20240001",
    department: "Génie Environnemental",
    phone: "+33 6 12 34 56 78",
    bio: "Étudiante passionnée par l'innovation durable et les technologies vertes."
  });

  const [notifications, setNotifications] = useState({
    emailReservations: true,
    emailMessages: true,
    emailForum: false,
    pushReservations: true,
    pushMessages: true,
    pushEvents: true
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "security", label: "Sécurité", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Confidentialité", icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Paramètres
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#00796B] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Informations du profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentId">Numéro étudiant</Label>
                      <Input
                        id="studentId"
                        value={profileData.studentId}
                        onChange={(e) => handleProfileChange("studentId", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Département</Label>
                      <select
                        id="department"
                        value={profileData.department}
                        onChange={(e) => handleProfileChange("department", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                      >
                        <option value="Informatique">Informatique</option>
                        <option value="Génie Civil">Génie Civil</option>
                        <option value="Génie Électrique">Génie Électrique</option>
                        <option value="Génie Mécanique">Génie Mécanique</option>
                        <option value="Génie Environnemental">Génie Environnemental</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                      rows={3}
                    />
                  </div>
                  
                  <Button className="bg-[#00796B] hover:bg-[#00695C]">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button className="bg-[#00796B] hover:bg-[#00695C]">
                        Mettre à jour le mot de passe
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Sessions actives</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <div className="font-medium">Session actuelle</div>
                          <div className="text-sm text-gray-600">Chrome sur Windows • Paris, France</div>
                        </div>
                        <div className="text-sm text-green-600">Actif maintenant</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Préférences de notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications par email</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Réservations</div>
                          <div className="text-sm text-gray-600">Confirmations et rappels de réservation</div>
                        </div>
                        <Switch
                          checked={notifications.emailReservations}
                          onCheckedChange={(value) => handleNotificationChange("emailReservations", value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Messages</div>
                          <div className="text-sm text-gray-600">Nouveaux messages privés</div>
                        </div>
                        <Switch
                          checked={notifications.emailMessages}
                          onCheckedChange={(value) => handleNotificationChange("emailMessages", value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Forum</div>
                          <div className="text-sm text-gray-600">Réponses à vos posts</div>
                        </div>
                        <Switch
                          checked={notifications.emailForum}
                          onCheckedChange={(value) => handleNotificationChange("emailForum", value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Notifications push</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Réservations</div>
                          <div className="text-sm text-gray-600">Confirmations et rappels</div>
                        </div>
                        <Switch
                          checked={notifications.pushReservations}
                          onCheckedChange={(value) => handleNotificationChange("pushReservations", value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Messages</div>
                          <div className="text-sm text-gray-600">Nouveaux messages</div>
                        </div>
                        <Switch
                          checked={notifications.pushMessages}
                          onCheckedChange={(value) => handleNotificationChange("pushMessages", value)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Événements</div>
                          <div className="text-sm text-gray-600">Nouveaux événements</div>
                        </div>
                        <Switch
                          checked={notifications.pushEvents}
                          onCheckedChange={(value) => handleNotificationChange("pushEvents", value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-[#00796B] hover:bg-[#00695C]">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder les préférences
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Confidentialité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Visibilité du profil</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Profil public</div>
                          <div className="text-sm text-gray-600">Autres étudiants peuvent voir votre profil</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Afficher l'email</div>
                          <div className="text-sm text-gray-600">Votre email est visible sur votre profil</div>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Afficher le téléphone</div>
                          <div className="text-sm text-gray-600">Votre numéro est visible sur votre profil</div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Données et confidentialité</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Télécharger mes données
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        Supprimer mon compte
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
