export function getFormspreeEndpoint(value = '') {
  const endpoint = value.trim();
  return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint) ? endpoint : '';
}

export async function submitEnquiry(data, { endpoint, fetchImpl = fetch }) {
  const destination = getFormspreeEndpoint(endpoint);
  if (!destination) throw new Error('Email delivery is not available yet. Please try again later.');

  const response = await fetchImpl(destination, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: data,
    credentials: 'omit',
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || result.ok === false) {
    if (response.status === 429) throw new Error('Too many enquiries at the moment. Please wait a few minutes and try again.');
    const details = result?.errors?.map((error) => error.message).filter(Boolean).join(' ');
    throw new Error(details || 'We could not confirm your submission. Your details are still here; please try again later.');
  }
}
