import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { getEvents } from "@/composables/useEvents";
import type { CampusEvent } from "@/types";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getEvents()
      .then((data) => { if (mounted) setEvents(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const categories = ["all", "Formation", "Compétition", "Conférence", "Networking"];

  const filteredEvents = events.filter(event =>
    selectedCategory === "all" || event.category === selectedCategory
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Événements Campus</h1>
          <Button className="bg-[#00796B] hover:bg-[#00695C]">
            <Plus className="h-4 w-4 mr-2" />
            Proposer un événement
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-[#00796B] hover:bg-[#00695C]" : ""}
              >
                {category === "all" ? "Tous" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-[#00796B]">
                    {event.category}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.attendees}/{event.maxAttendees} participants</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#00796B] hover:bg-[#00695C]">
                      S'inscrire
                    </Button>
                    <Button variant="outline" size="sm">
                      Détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
