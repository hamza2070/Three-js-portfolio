async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

// Cache for decrypted files
const decryptCache = new Map<string, ArrayBuffer>();

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  // Check cache first
  const cacheKey = `${url}_${password}`;
  if (decryptCache.has(cacheKey)) {
    return decryptCache.get(cacheKey)!;
  }

  const response = await fetch(url, {
    cache: 'force-cache', // Use browser cache
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  
  const encryptedData = await response.arrayBuffer();
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
  
  // Cache the result
  decryptCache.set(cacheKey, decrypted);
  
  return decrypted;
};
