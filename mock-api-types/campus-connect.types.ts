/**
 * Campus Connect – API type definitions for TS-Mock-API.
 *
 * Drop this file into the TS-Mock-API `test-types/` directory.
 * Start the server: npx ts-mock-proxy --types-dir ./test-types --port 3000
 *
 * Only interfaces marked with `// @endpoint` are exposed as routes.
 * Multi-word interfaces MUST use hyphenated URLs:
 *   ForumPost      → GET /forum-posts      (array) | GET /forum-post       (single)
 *   CampusEvent    → GET /campus-events    (array) | GET /campus-event      (single)
 *   ScheduleEntry  → GET /schedule-entries (array) | GET /schedule-entry   (single)
 *   CampusDocument → GET /campus-documents (array) | GET /campus-document  (single)
 * Single-word interfaces use plain lowercase:
 *   Equipment      → GET /equipments       (array) | GET /equipment         (single)
 *   Project        → GET /projects         (array) | GET /project            (single)
 *   Discussion     → GET /discussions      (array) | GET /discussion         (single)
 *   Message        → GET /messages         (array) | GET /message            (single)
 *   Reservation    → GET /reservations     (array) | GET /reservation        (single)
 *
 * NOTE: "Event" and "Document" are reserved DOM type names in TypeScript.
 *       Use "CampusEvent" and "CampusDocument" to avoid Intermock conflicts.
 */

// @endpoint
export interface Equipment {
  id: number;
  name: string;
  category: string;
  status: string;
  image: string;
  description: string;
  rating: number;
  location: string;
  owner: string;
}

// @endpoint
export interface CampusEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  image: string;
}

// @endpoint
export interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  replies: number;
  createdAt: string;
  isResolved: boolean;
}

// @endpoint
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

// @endpoint
export interface Discussion {
  id: number;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  participants: number;
  unread: number;
  pinned: boolean;
  category: string;
}

// @endpoint
export interface Message {
  id: number;
  discussionId: number;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

// @endpoint
export interface ScheduleEntry {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  professor: string;
  room: string;
}

// @endpoint
export interface Reservation {
  id: number;
  equipmentName: string;
  equipmentImage: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  purpose: string;
}

// @endpoint
export interface CampusDocument {
  id: number;
  name: string;
  category: string;
  size: string;
  type: string;
  shared: boolean;
  uploadDate: string;
  owner: string;
}
