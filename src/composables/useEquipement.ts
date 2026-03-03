import { apiCall } from './useApi';
import type { Equipment } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getEquipments(): Promise<Equipment[]> {
  const res = await apiCall<Equipment[]>(`${base()}/equipments`);
  return res.payload ?? [];
}

export async function getEquipment(id: number): Promise<Equipment | null> {
  const all = await getEquipments();
  return all.find((e) => e.id === id) ?? null;
}
