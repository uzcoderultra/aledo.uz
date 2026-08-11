import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { processLeadSubmission } from "./src/lib/leadHandler.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoint for receiving and processing leads
app.post("/api/leads", async (req, res) => {
  try {
    const result = await processLeadSubmission(req.body);
    return res.status(result.status).json(result.json);
  } catch (error: any) {
    console.error("Lead handler fatal error:", error);
    return res.status(500).json({
      error: "Internal server error during lead submission",
      details: error.message
    });
  }
});

// Start Express server with Vite middleware support
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
