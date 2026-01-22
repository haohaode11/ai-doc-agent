import express from "express";
import chatRoute from "./routes/chat.route.js";

const app = express();

/* ===== 中间件 ===== */
app.use(express.json());

/* ===== 健康检查 ===== */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "doc-agent running" });
});

/* ===== Agent API ===== */
app.use("/api", chatRoute);

/* ===== 启动服务 ===== */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Agent listening on http://localhost:${PORT}`);
});
