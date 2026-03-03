type ApiStatus = "success" | "error";

export interface ApiResponse<T = unknown> {
  status: ApiStatus;
  message: string;
  payload: T | null;
}

export interface ApiCallOptions<Body = unknown> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Body;
  headers?: Record<string, string>;
}
