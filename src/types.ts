/* src/types.ts */

export type TicketStatus = 'Reported' | 'Assigned' | 'In Progress' | 'Resolved' | 'Reopened';

export interface Location {
  lat: number;
  lng: number;
  ward: string;
}

export interface Ticket {
  id: string;             // e.g., CC-2026-00042
  category: string;       // Garbage, Potholes, etc.
  note: string;           // description of the issue
  photo?: string;         // data URL
  location: Location;
  status: TicketStatus;
  createdAt: string;      // ISO date
  updatedAt: string;      // ISO date
  priority: number;       // 0-100
  duplicates?: number;    // number of duplicate reports
  rating?: number;        // 1-5 stars after resolved
  phone?: string;         // citizen contact phone
}

export interface Officer {
  id: string;
  name: string;
  ward: string;
  role: 'Officer' | 'Senior Officer';
}
