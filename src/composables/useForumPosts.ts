import { apiCall } from './useApi';
import type { ForumPost } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getForumPosts(): Promise<ForumPost[]> {
  const res = await apiCall<ForumPost[]>(`${base()}/forum-posts`);
  return res.payload ?? [];
}

export async function getForumPost(id: number): Promise<ForumPost | null> {
  const all = await getForumPosts();
  return all.find((p) => p.id === id) ?? null;
}

export async function createForumPost(data: Omit<ForumPost, 'id' | 'likes' | 'replies' | 'createdAt' | 'isResolved'>): Promise<ForumPost | null> {
  const res = await apiCall<ForumPost>(`${base()}/forum-posts`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
