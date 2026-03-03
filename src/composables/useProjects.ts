import { apiCall } from './useApi';
import type { Project } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getProjects(): Promise<Project[]> {
  const res = await apiCall<Project[]>(`${base()}/projects`);
  return res.payload ?? [];
}

export async function getProject(id: number): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.id === id) ?? null;
}

export async function createProject(data: Omit<Project, 'id' | 'likes' | 'views' | 'date'>): Promise<Project | null> {
  const res = await apiCall<Project>(`${base()}/projects`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
