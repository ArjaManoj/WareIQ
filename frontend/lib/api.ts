const getApiBaseUrl = (): string => {
  // If running on client side (browser), use relative '/api' on same domain or NEXT_PUBLIC_API_URL
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || '/api';
  }
  // If running in server-side functions with Vercel Service binding
  if (process.env.BACKEND_SERVICE_URL) {
    const base = process.env.BACKEND_SERVICE_URL.replace(/\/+$/, '');
    return `${base}/api`;
  }
  // Local fallback
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    [key: string]: any;
  };
  errors?: any[];
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('wareiq_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      const errorMsg = json.message || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return json as ApiResponse<T>;
  } catch (error: any) {
    console.error(`[API Client Error] ${endpoint}:`, error.message);
    throw error;
  }
}
