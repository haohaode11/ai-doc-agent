import { Router, Request, Response } from "express";
import { runAgent } from "../agent/agent.service.js";

const router = Router();

router.post("/chat/stream", async (req: Request, res: Response) => {
  const { message } = req.body as { message: string };

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const send = (text: string) => {
    res.write(`data: ${text}\n\n`);
  };

  try {
    send("正在理解你的需求…");
    await new Promise(r => setTimeout(r, 300));

    send("正在生成文档内容…");

    const result = await runAgent(message, (stage: string) => {
      send(stage);
    });

    if (result.file_url) {
      send("正在生成文件…");
      await new Promise(r => setTimeout(r, 300));
      send(`生成完成 ✅\n下载地址：${result.file_url}`);
    } else {
      send(result.reply);
    }

    send("[DONE]");
    res.end();
  } catch (err: any) {
    send("生成失败 ❌");
    send(err?.message || "未知错误");
    res.end();
  }
});

export default router;
