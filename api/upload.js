import { put } from "@vercel/blob";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const filename = req.headers["x-filename"] || `upload-${Date.now()}`;
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const blob = await put(`vittoli/${Date.now()}-${filename}`, buffer, {
      access: "public",
      contentType: req.headers["content-type"] || "application/octet-stream",
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
