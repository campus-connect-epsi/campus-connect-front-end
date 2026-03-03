import { apiCall } from './useApi';
import type { CampusEvent } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getEvents(): Promise<CampusEvent[]> {
  const res = await apiCall<CampusEvent[]>(`${base()}/campus-events`);
  return res.payload ?? [];
}

export async function getEvent(id: number): Promise<CampusEvent | null> {
  const all = await getEvents();
  return all.find((e) => e.id === id) ?? null;
}

export async function createEvent(data: Omit<CampusEvent, 'id'>): Promise<CampusEvent | null> {
  const res = await apiCall<CampusEvent, Omit<CampusEvent, 'id'>>(`${base()}/campus-events`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
