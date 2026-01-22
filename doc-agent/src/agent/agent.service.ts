import { AGENT_PROMPT } from "./agent.prompt.js";
import { AgentResult } from "./agent.types.js";
import { callLLM } from "../llm/llm.client.js";
import { generateWord } from "../tools/document.tool.js";

/**
 * 核心 Agent 入口
 */
export async function runAgent(
  userMessage: string,
  onStage?: (text: string) => void
) {
  onStage?.("正在分析用户意图…");

  // ===== 调用 LLM =====
  const llmContent = await callLLM([
    { role: "system", content: AGENT_PROMPT },
    { role: "user", content: userMessage }
  ]);

  let result: AgentResult;
  try {
    result = JSON.parse(llmContent);
  } catch {
    throw new Error("LLM 返回内容不是合法 JSON");
  }

  // ===== 普通对话 =====
  if (result.intent === "chat") {
    return {
      reply: result.reply
    };
  }

  // ===== 文档生成 =====
  if (result.intent === "generate_document") {
    onStage?.("正在生成文档文件…");

    /**
     * 注意：
     * generateWord 工具现在明确支持 file_type
     */
    const fileUrl = await generateWord({
      title: result.document_title,
      content: result.markdown_content,
      file_type: result.file_type // ✅ TS 合法
    });

    return {
      reply: `文档《${result.document_title}》已生成`,
      file_url: fileUrl
    };
  }

  // ===== 兜底 =====
  throw new Error("未知的 Agent intent");
}
