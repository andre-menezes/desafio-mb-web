export async function useFetchApi(endpoint, data) {
  try {
    return await fetch(`http://localhost:3000${endpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  } catch (error) {
    throw new Error(error.message);
  }
}
