/**
 * Sends an image to the backend for classification via Claude Vision.
 * @param {string} base64  - Base64-encoded image data (no data URL prefix)
 * @param {string} mimeType - e.g. "image/jpeg"
 * @returns {Promise<Object>} Parsed classification result
 */
export async function classifyImage(base64, mimeType) {
  const response = await fetch('/api/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64, mimeType }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error || `Request failed: ${response.status}`)
  }

  return await response.json()
}
