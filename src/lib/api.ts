export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1]

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(url, { ...options, headers })
  const json = await res.json()
  if (!json.success) throw new Error(json.error || "Request failed")
  return json.data as T
}

export function apiUrl(path: string) {
  return `/api${path}`
}
