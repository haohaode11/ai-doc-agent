import "dotenv/config";


import express from "express";
import chatRoute from "./routes/chat.route.js";
import chatStreamRoute from "./routes/chat.stream.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 普通接口
app.use("/api", chatRoute);

// ⭐⭐⭐ 流式接口（关键）
app.use("/api", chatStreamRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`doc-agent listening on http://localhost:${PORT}`);
});
