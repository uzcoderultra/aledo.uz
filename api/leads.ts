import { processLeadSubmission } from "../src/lib/leadHandler.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const result = await processLeadSubmission(body);
    return res.status(result.status).json(result.json);
  } catch (error: any) {
    console.error("Vercel API error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
