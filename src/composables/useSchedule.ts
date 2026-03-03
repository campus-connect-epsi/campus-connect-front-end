import { apiCall } from './useApi';
import type { ScheduleEntry } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

// Tailwind color classes mapped by index – the API does not store presentation details.
const ENTRY_COLORS = [
  'bg-blue-100 border-blue-300 text-blue-800',
  'bg-green-100 border-green-300 text-green-800',
  'bg-purple-100 border-purple-300 text-purple-800',
  'bg-orange-100 border-orange-300 text-orange-800',
  'bg-red-100 border-red-300 text-red-800',
  'bg-yellow-100 border-yellow-300 text-yellow-800',
  'bg-indigo-100 border-indigo-300 text-indigo-800',
];

export type ScheduleEntryWithColor = ScheduleEntry & { color: string };

export async function getScheduleEntries(): Promise<ScheduleEntryWithColor[]> {
  const res = await apiCall<ScheduleEntry[]>(`${base()}/schedule-entries`);
  const entries = res.payload ?? [];
  return entries.map((entry, i) => ({
    ...entry,
    color: ENTRY_COLORS[i % ENTRY_COLORS.length],
  }));
}
