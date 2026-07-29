import { put, list } from "@vercel/blob";

const KEY_PREFIX = "vk-store/";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: "Falta key" });
      const { blobs } = await list({ prefix: `${KEY_PREFIX}${key}.json` });
      if (!blobs.length) return res.status(200).json({ value: null });
      blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      const r = await fetch(blobs[0].url + `?t=${Date.now()}`);
      const value = await r.json();
      return res.status(200).json({ value });
    }
    if (req.method === "POST") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      const { key, value } = body;
      if (!key) return res.status(400).json({ error: "Falta key" });
      await put(`${KEY_PREFIX}${key}.json`, JSON.stringify(value), {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
        addRandomSuffix: false,
      });
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
