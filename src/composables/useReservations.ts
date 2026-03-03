import { apiCall } from './useApi';
import type { Reservation } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getReservations(): Promise<Reservation[]> {
  const res = await apiCall<Reservation[]>(`${base()}/reservations`);
  return res.payload ?? [];
}

export async function getReservation(id: number): Promise<Reservation | null> {
  const all = await getReservations();
  return all.find((r) => r.id === id) ?? null;
}

export async function createReservation(data: Omit<Reservation, 'id' | 'status'>): Promise<Reservation | null> {
  const res = await apiCall<Reservation>(`${base()}/reservations`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}

export async function cancelReservation(id: number): Promise<Reservation | null> {
  const res = await apiCall<Reservation>(`${base()}/reservations/${id}`, {
    method: 'PATCH',
    body: { status: 'annulée' },
  });
  return res.payload;
}
