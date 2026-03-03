import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";
import { getScheduleEntries } from "@/composables/useSchedule";
import type { ScheduleEntryWithColor } from "@/composables/useSchedule";

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleEntryWithColor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getScheduleEntries()
      .then((data) => { if (mounted) setSchedule(data); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  const getCourseForSlot = (day: string, time: string) => {
    return schedule.find(course => {
      const courseStart = parseInt(course.startTime.split(':')[0]);
      const courseEnd = parseInt(course.endTime.split(':')[0]);
      const slotTime = parseInt(time.split(':')[0]);
      return course.day === day && slotTime >= courseStart && slotTime < courseEnd;
    });
  };

  const getCourseDuration = (course: ScheduleEntryWithColor) => {
    const start = parseInt(course.startTime.split(':')[0]);
    const end = parseInt(course.endTime.split(':')[0]);
    return end - start;
  };

  // Derive stats from fetched data
  const totalHours = schedule.reduce((sum, c) => sum + getCourseDuration(c), 0);
  const uniqueSubjects = new Set(schedule.map(c => c.subject)).size;
  const uniqueProfessors = new Set(schedule.map(c => c.professor)).size;

  // Most frequent rooms
  const roomCounts = schedule.reduce<Record<string, number>>((acc, c) => {
    acc[c.room] = (acc[c.room] || 0) + 1;
    return acc;
  }, {});
  const topRooms = Object.entries(roomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Next 2 courses (first 2 entries as placeholder for "upcoming")
  const nextCourses = schedule.slice(0, 2);

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
        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-6 gap-0 border-b">
                <div className="p-4 bg-muted font-semibold text-center">Heure</div>
                {days.map(day => (
                  <div key={day} className="p-4 bg-muted font-semibold text-center border-l">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-6 gap-0 min-h-16 border-b last:border-b-0">
                  <div className="p-3 bg-muted/30 font-medium text-center text-sm border-r flex items-center justify-center">
                    {time}
                  </div>
                  {days.map(day => {
                    const course = getCourseForSlot(day, time);
                    const isFirstSlot = course && time === course.startTime;

                    return (
                      <div key={`${day}-${time}`} className="border-l relative">
                        {isFirstSlot && (
                          <div
                            className={`absolute inset-0 m-1 p-2 rounded border-l-4 ${course.color}`}
                            style={{
                              height: `${getCourseDuration(course) * 4 - 0.5}rem`,
                              zIndex: 10
                            }}
                          >
                            <div className="text-xs font-semibold mb-1">
                              {course.subject}
                            </div>
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
        )}

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
                  <span className="font-semibold">{totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Matières</span>
                  <span className="font-semibold">{uniqueSubjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Professeurs</span>
                  <span className="font-semibold">{uniqueProfessors}</span>
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
                {nextCourses.map((course, i) => (
                  <div key={course.id} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue-500' : 'bg-green-500'}`} />
                    <div>
                      <div className="text-sm font-medium">{course.subject}</div>
                      <div className="text-xs text-muted-foreground">
                        {course.day} {course.startTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Salles Fréquentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topRooms.map(([room, count]) => (
                  <div key={room} className="flex justify-between">
                    <span className="text-sm">{room}</span>
                    <Badge variant="secondary" className="text-xs">{count} cours</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
