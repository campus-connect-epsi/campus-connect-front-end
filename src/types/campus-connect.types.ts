// Named CampusEvent (not Event) to avoid conflict with the TypeScript DOM Event built-in.
export interface CampusEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Formation' | 'Compétition' | 'Conférence' | 'Networking';
  attendees: number;
  maxAttendees: number;
  description: string;
  image: string;
}

export interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  content: string;
  category: 'Matériel' | 'Projets' | 'Support' | 'Tutoriels' | 'Général';
  tags: string[];
  likes: number;
  replies: number;
  createdAt: string;
  isResolved: boolean;
}

export interface Project {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  tags: string[];
  likes: number;
  views: number;
  date: string;
}

export interface Discussion {
  id: number;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  participants: number;
  unread: number;
  pinned: boolean;
  category: 'Matériel' | 'Projet' | 'Réservation' | 'Général';
}

export interface Message {
  id: number;
  discussionId: number;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ScheduleEntry {
  id: number;
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi';
  startTime: string;
  endTime: string;
  subject: string;
  professor: string;
  room: string;
}

export interface Reservation {
  id: number;
  equipmentName: string;
  equipmentImage: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'confirmée' | 'en_attente' | 'terminée' | 'annulée';
  purpose: string;
}

// Named CampusDocument (not Document) to avoid conflict with the TypeScript DOM Document built-in.
export interface CampusDocument {
  id: number;
  name: string;
  category: 'personnel' | 'partage' | 'projet';
  size: string;
  type: string;
  shared: boolean;
  uploadDate: string;
  owner: string;
}
