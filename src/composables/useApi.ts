import type { ApiResponse, ApiCallOptions } from "@/types";

export async function apiCall<TResponse = unknown, TBody = unknown>(
  url: string,
  options: ApiCallOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> {
  const { method = "GET", body, headers = {} } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": body ? "application/json" : undefined,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const res = await fetch(url, fetchOptions);

  let raw: { status: string; message: string; payload: TResponse } | null = null;
  try {
    raw = await res.json();
  } catch {
    throw new Error("Réponse serveur invalide : JSON non parsable");
  }

  if (!raw || typeof raw !== "object") {
    throw new Error("Réponse serveur invalide : structure incorrecte");
  }

  const { status, message, payload } = raw;

  if (typeof status !== "string") {
    throw new Error("Champ status invalide");
  }
  if (typeof message !== "string") {
    throw new Error("Champ message invalide");
  }

  if (!res.ok) {
    return {
      status: "error",
      message,
      payload: payload ?? null,
    };
  }

  return {
    status: "success",
    message,
    payload: payload ?? null,
  };
}
