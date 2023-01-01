type options = {
  body?: object,
  headers?: HeadersInit,
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT',
}

const api = async (url: string, options: options) => {
  const { body, headers, ...opts } = options;
  const requestBody = JSON.stringify(body);
  const response = await fetch(url, {
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...opts,
  });
  const result = await response.json();
  return { status: response.status, ...result, url };
};

export default api;
