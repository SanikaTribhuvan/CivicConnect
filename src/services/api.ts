/* src/services/api.ts */
// Simple mock API backed by localStorage with BroadcastChannel for live updates

import type { Ticket, Officer } from '../types';

const TICKETS_KEY = 'civic_tickets';
const OFFICERS_KEY = 'civic_officers';
const CHANNEL_NAME = 'civic_updates';

const channel = new BroadcastChannel(CHANNEL_NAME);

// Initial demo seed tickets with realistic Ahilyanagar localities and Demo data tags
const INITIAL_DEMO_TICKETS: Ticket[] = [
  {
    id: 'CC-2026-00041',
    category: 'Potholes',
    note: 'Deep pothole cluster near Savedi vegetable market causing traffic congestion.',
    location: { lat: 19.1128, lng: 74.7381, ward: 'Ward 3 (Savedi)' },
    status: 'In Progress',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    priority: 85,
    phone: '9822012345',
  },
  {
    id: 'CC-2026-00042',
    category: 'Garbage',
    note: 'Uncollected domestic waste pile near Kedgaon secondary school corner.',
    location: { lat: 19.0789, lng: 74.7214, ward: 'Ward 7 (Kedgaon)' },
    status: 'Reported',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    priority: 60,
    phone: '9822054321',
  },
  {
    id: 'CC-2026-00043',
    category: 'Streetlights',
    note: 'Three consecutive streetlights flickering continuously on Station Road.',
    location: { lat: 19.0965, lng: 74.7412, ward: 'Ward 2 (Station Road)' },
    status: 'Resolved',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    priority: 40,
    rating: 5,
    phone: '9822099999',
  },
  {
    id: 'CC-2026-00044',
    category: 'Open Drains',
    note: 'Choked open stormwater drain overflowing onto pedestrian footpath at Delhi Gate.',
    location: { lat: 19.1023, lng: 74.7335, ward: 'Ward 5 (Delhi Gate)' },
    status: 'Reported',
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    priority: 75,
    phone: '9822011111',
  },
  {
    id: 'CC-2026-00045',
    category: 'Waterlogging',
    note: 'Severe rainwater accumulation under Bhingar railway underpass.',
    location: { lat: 19.0621, lng: 74.7612, ward: 'Ward 12 (Bhingar)' },
    status: 'Assigned',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    priority: 90,
    phone: '9822022222',
  },
];

const INITIAL_DEMO_OFFICERS: Officer[] = [
  { id: 'OFF-01', name: 'R. K. Kadam', ward: 'Ward 3 (Savedi)', role: 'Senior Officer' },
  { id: 'OFF-02', name: 'S. N. Shinde', ward: 'Ward 7 (Kedgaon)', role: 'Officer' },
  { id: 'OFF-03', name: 'A. P. Deshmukh', ward: 'Ward 2 (Station Road)', role: 'Senior Officer' },
  { id: 'OFF-04', name: 'V. S. Patil', ward: 'Ward 5 (Delhi Gate)', role: 'Officer' },
  { id: 'OFF-05', name: 'M. B. Jagtap', ward: 'Ward 12 (Bhingar)', role: 'Officer' },
];

// Utility to load JSON from localStorage
function load<T>(key: string, defaultValue: T): T {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as T;
      }
    } catch {
      console.warn(`Failed to parse ${key}, resetting.`);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}

// Initialise seed data if not present
function ensureSeedData() {
  load<Ticket[]>(TICKETS_KEY, INITIAL_DEMO_TICKETS);
  load<Officer[]>(OFFICERS_KEY, INITIAL_DEMO_OFFICERS);
}

ensureSeedData();

// ---------- Ticket API ----------
export async function getTickets(): Promise<Ticket[]> {
  return load<Ticket[]>(TICKETS_KEY, INITIAL_DEMO_TICKETS);
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const tickets = await getTickets();
  const cleanId = id.trim().toUpperCase();
  return tickets.find((t) => t.id.toUpperCase() === cleanId);
}

export async function getTicketsByPhone(phone: string): Promise<Ticket[]> {
  const tickets = await getTickets();
  const cleanPhone = phone.trim().replace(/\D/g, '');
  if (!cleanPhone) return [];
  return tickets.filter((t) => t.phone && t.phone.replace(/\D/g, '').includes(cleanPhone));
}

export interface NewTicketInput {
  category: string;
  note: string;
  photo?: string;
  ward?: string;
  phone?: string;
}

export async function addTicket(input: NewTicketInput): Promise<Ticket> {
  const tickets = await getTickets();
  const nextNumber = tickets.length + 1;
  const newTicket: Ticket = {
    id: `CC-${new Date().getFullYear()}-${String(nextNumber).padStart(5, '0')}`,
    category: input.category,
    note: input.note,
    photo: input.photo,
    phone: input.phone,
    location: {
      lat: 19.0948,
      lng: 74.7480,
      ward: input.ward || 'Ward 1 (Tophkhana)',
    },
    status: 'Reported',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    priority: 70,
    duplicates: 0,
  };
  tickets.unshift(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  // Broadcast creation event across browser tabs
  channel.postMessage({ type: 'ticket_created', ticket: newTicket });
  return newTicket;
}

export async function updateTicket(updated: Partial<Ticket> & { id: string }): Promise<Ticket | undefined> {
  const tickets = await getTickets();
  const idx = tickets.findIndex((t) => t.id === updated.id);
  if (idx === -1) return undefined;
  const before = tickets[idx];
  const after = { ...before, ...updated, updatedAt: new Date().toISOString() };
  tickets[idx] = after;
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  channel.postMessage({ type: 'ticket_updated', before, after });
  return after;
}

// ---------- Officer API ----------
export async function getOfficers(): Promise<Officer[]> {
  return load<Officer[]>(OFFICERS_KEY, INITIAL_DEMO_OFFICERS);
}

export async function setOfficers(officers: Officer[]): Promise<void> {
  localStorage.setItem(OFFICERS_KEY, JSON.stringify(officers));
  channel.postMessage({ type: 'officers_updated', officers });
}

// ---------- Broadcast handling ----------
export function subscribeUpdates(callback: (msg: unknown) => void) {
  const handler = (e: MessageEvent) => callback(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

// ---------- Seed helper (can be called manually) ----------
export function seedData(seed: { tickets?: Ticket[]; officers?: Officer[] }) {
  if (seed.tickets) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(seed.tickets));
  }
  if (seed.officers) {
    localStorage.setItem(OFFICERS_KEY, JSON.stringify(seed.officers));
  }
  channel.postMessage({ type: 'seeded' });
}
