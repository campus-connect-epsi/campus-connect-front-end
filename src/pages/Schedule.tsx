import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

const Schedule = () => {
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  interface ScheduleItem {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    subject: string;
    professor: string;
    room: string;
    color: string;
  }

  const schedule: ScheduleItem[] = [
    {
      id: 1,
      day: "Lundi",
      startTime: "09:00",
      endTime: "11:00",
      subject: "Programmation Web",
      professor: "Dr. Martin Dubois",
      room: "Salle A201",
      color: "bg-blue-100 border-blue-300 text-blue-800",
    },
    {
      id: 2,
      day: "Lundi",
      startTime: "14:00",
      endTime: "16:00",
      subject: "Base de données",
      professor: "Mme. Sarah Laurent",
      room: "Labo Info B",
      color: "bg-green-100 border-green-300 text-green-800",
    },
    {
      id: 3,
      day: "Mardi",
      startTime: "08:00",
      endTime: "10:00",
      subject: "Réseaux",
      professor: "M. Pierre Moreau",
      room: "Salle C103",
      color: "bg-purple-100 border-purple-300 text-purple-800",
    },
    {
      id: 4,
      day: "Mardi",
      startTime: "15:00",
      endTime: "17:00",
      subject: "Projet Tutoré",
      professor: "Dr. Anne Rousseau",
      room: "Salle Projet",
      color: "bg-orange-100 border-orange-300 text-orange-800",
    },
    {
      id: 5,
      day: "Mercredi",
      startTime: "10:00",
      endTime: "12:00",
      subject: "Intelligence Artificielle",
      professor: "Dr. Jean Petit",
      room: "Amphithéâtre",
      color: "bg-red-100 border-red-300 text-red-800",
    },
    {
      id: 6,
      day: "Jeudi",
      startTime: "09:00",
      endTime: "11:00",
      subject: "Sécurité Informatique",
      professor: "M. Marc Durand",
      room: "Salle D205",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      id: 7,
      day: "Vendredi",
      startTime: "13:00",
      endTime: "15:00",
      subject: "Stage en Entreprise",
      professor: "Mme. Claire Bernard",
      room: "Salle Réunion",
      color: "bg-indigo-100 border-indigo-300 text-indigo-800",
    },
  ];

  const getCourseForSlot = (day: string, time: string) => {
    return schedule.find((course) => {
      const courseStart = parseInt(course.startTime.split(":")[0]);
      const courseEnd = parseInt(course.endTime.split(":")[0]);
      const slotTime = parseInt(time.split(":")[0]);

      return course.day === day && slotTime >= courseStart && slotTime < courseEnd;
    });
  };

  const getCourseDuration = (course: ScheduleItem) => {
    const start = parseInt(course.startTime.split(":")[0]);
    const end = parseInt(course.endTime.split(":")[0]);
    return end - start;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mon Emploi du Temps</h1>
          <Badge variant="outline" className="text-sm">
            Semaine du 2-6 Décembre 2024
          </Badge>
        </div>

        {/* Schedule Grid */}
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-6 gap-0 border-b">
              <div className="p-4 bg-muted font-semibold text-center">Heure</div>
              {days.map((day) => (
                <div key={day} className="p-4 bg-muted font-semibold text-center border-l">
                  {day}
                </div>
              ))}
            </div>

            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-6 gap-0 min-h-16 border-b last:border-b-0">
                <div className="p-3 bg-muted/30 font-medium text-center text-sm border-r flex items-center justify-center">
                  {time}
                </div>
                {days.map((day) => {
                  const course = getCourseForSlot(day, time);
                  const isFirstSlot = course && time === course.startTime;

                  return (
                    <div key={`${day}-${time}`} className="border-l relative">
                      {isFirstSlot && (
                        <div
                          className={`absolute inset-0 m-1 p-2 rounded border-l-4 ${course.color}`}
                          style={{
                            height: `${getCourseDuration(course) * 4 - 0.5}rem`,
                            zIndex: 10,
                          }}
                        >
                          <div className="text-xs font-semibold mb-1">{course.subject}</div>
                          <div className="flex items-center text-xs mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.startTime} - {course.endTime}
                          </div>
                          <div className="flex items-center text-xs mb-1">
                            <User className="h-3 w-3 mr-1" />
                            {course.professor}
                          </div>
                          <div className="flex items-center text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {course.room}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Heures de cours</span>
                  <span className="font-semibold">18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Matières</span>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Professeurs</span>
                  <span className="font-semibold">7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochains Cours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium">Programmation Web</div>
                    <div className="text-xs text-muted-foreground">Demain 09:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium">Base de données</div>
                    <div className="text-xs text-muted-foreground">Demain 14:00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Salles Fréquentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Salle A201</span>
                  <Badge variant="secondary" className="text-xs">
                    2 cours
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Labo Info B</span>
                  <Badge variant="secondary" className="text-xs">
                    1 cours
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Amphithéâtre</span>
                  <Badge variant="secondary" className="text-xs">
                    1 cours
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
