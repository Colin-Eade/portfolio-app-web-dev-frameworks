export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`http://localhost:1338/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(`Fetching from ${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  const response = await res.json();
  return response.data;
}
