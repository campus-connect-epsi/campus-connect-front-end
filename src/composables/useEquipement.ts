import { apiCall } from "./useApi";

export async function fetchEquipement() {
  const base = import.meta.env.VITE_API_BASE ?? "";
  const url = `${base.replace(/\/$/, "")}/equipement.json`;
  const res = await apiCall(url);
  return res.payload;
}
