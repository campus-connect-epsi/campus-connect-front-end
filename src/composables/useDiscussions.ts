import { apiCall } from './useApi';
import type { Discussion } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getDiscussions(): Promise<Discussion[]> {
  const res = await apiCall<Discussion[]>(`${base()}/discussions`);
  return res.payload ?? [];
}

export async function getDiscussion(id: number): Promise<Discussion | null> {
  const all = await getDiscussions();
  return all.find((d) => d.id === id) ?? null;
}

export async function createDiscussion(data: Omit<Discussion, 'id' | 'lastMessage' | 'lastMessageTime' | 'unread'>): Promise<Discussion | null> {
  const res = await apiCall<Discussion>(`${base()}/discussions`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
