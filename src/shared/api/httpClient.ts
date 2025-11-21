export interface HttpClientOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

const buildUrl = (input: string, params?: HttpClientOptions["params"]) => {
  if (!params) return input;
  const url = new URL(input, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

export const httpClient = async <TResponse>(
  url: string,
  options: HttpClientOptions = {}
): Promise<TResponse> => {
  const { params, headers, ...rest } = options;
  const response = await fetch(buildUrl(url, params), {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorText || response.statusText}`
    );
  }

  return (response.status === 204 ? null : response.json()) as Promise<TResponse>;
};
