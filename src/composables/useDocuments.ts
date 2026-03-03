import { apiCall } from './useApi';
import type { CampusDocument } from '@/types';

const base = () => (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

export async function getDocuments(): Promise<CampusDocument[]> {
  const res = await apiCall<CampusDocument[]>(`${base()}/campus-documents`);
  return res.payload ?? [];
}

export async function deleteDocument(id: number): Promise<void> {
  await apiCall(`${base()}/campus-documents/${id}`, { method: 'DELETE' });
}

export async function uploadDocument(data: Omit<CampusDocument, 'id' | 'uploadDate'>): Promise<CampusDocument | null> {
  const res = await apiCall<CampusDocument>(`${base()}/campus-documents`, {
    method: 'POST',
    body: data,
  });
  return res.payload;
}
