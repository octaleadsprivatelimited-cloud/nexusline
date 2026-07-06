// Resize + compress an image file to a data URL suitable for Firestore
// (Firestore doc limit is 1 MB — keep under ~700 KB per image).
export async function fileToCompressedDataUrl(
  file: File,
  maxDim = 1400,
  quality = 0.82,
): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  return dataUrlToCompressedDataUrl(dataUrl, maxDim, quality);
}

/** Fetch a URL (same-origin bundled asset) and produce a compressed JPEG data URL. */
export async function urlToCompressedDataUrl(
  url: string,
  maxDim = 1400,
  quality = 0.82,
): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const blob = await res.blob();
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
  return dataUrlToCompressedDataUrl(dataUrl, maxDim, quality);
}

async function dataUrlToCompressedDataUrl(
  dataUrl: string,
  maxDim: number,
  quality: number,
): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Invalid image"));
    el.src = dataUrl;
  });

  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unsupported");
  ctx.drawImage(img, 0, 0, w, h);

  let out = canvas.toDataURL("image/jpeg", quality);
  // If still too large, step quality down.
  let q = quality;
  while (out.length > 900_000 && q > 0.4) {
    q -= 0.1;
    out = canvas.toDataURL("image/jpeg", q);
  }
  if (out.length > 950_000) {
    throw new Error("Image too large — try a smaller file");
  }
  return out;
}