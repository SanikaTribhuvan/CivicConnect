/* src/services/api.ts */
// Simple mock API backed by localStorage with BroadcastChannel for live updates

import type { Ticket, Officer } from '../types';

const TICKETS_KEY = 'civic_tickets';
const OFFICERS_KEY = 'civic_officers';
const CHANNEL_NAME = 'civic_updates';

const channel = new BroadcastChannel(CHANNEL_NAME);

// Utility to load JSON from localStorage
function load<T>(key: string, defaultValue: T): T {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw) as T;
    } catch {
      console.warn(`Failed to parse ${key}, resetting.`);
    }
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}

// Initialise seed data if not present
function ensureSeedData() {
  load<Ticket[]>(TICKETS_KEY, []);
  load<Officer[]>(OFFICERS_KEY, []);
}

ensureSeedData();

// ---------- Ticket API ----------
export async function getTickets(): Promise<Ticket[]> {
  return load<Ticket[]>(TICKETS_KEY, []);
}

export async function getTicketById(id: string): Promise<Ticket | undefined> {
  const tickets = await getTickets();
  return tickets.find((t) => t.id === id);
}

export async function addTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ticket> {
  const tickets = await getTickets();
  const newTicket: Ticket = {
    ...ticket,
    id: `CC-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(5, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    priority: 0,
    duplicates: 0,
  };
  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  // Broadcast creation event
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
  return load<Officer[]>(OFFICERS_KEY, []);
}

export async function setOfficers(officers: Officer[]): Promise<void> {
  localStorage.setItem(OFFICERS_KEY, JSON.stringify(officers));
  channel.postMessage({ type: 'officers_updated', officers });
}

// ---------- Broadcast handling ----------
export function subscribeUpdates(callback: (msg: any) => void) {
  channel.addEventListener('message', (e) => callback(e.data));
  return () => channel.removeEventListener('message', callback as any);
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
