export async function apiClient(url, options = {}) {
  const { body, headers, ...rest } = options;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...rest,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.error || data?.message || "Request failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
