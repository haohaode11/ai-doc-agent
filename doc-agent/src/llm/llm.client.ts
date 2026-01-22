import axios from "axios";

const LLM_API = process.env.LLM_API;
const LLM_API_KEY = process.env.LLM_API_KEY;

/**
 * ===== 参数校验 & 类型收窄 =====
 */
if (typeof LLM_API !== "string" || LLM_API.trim() === "") {
  throw new Error("❌ LLM_API 未设置，请检查 .env 或环境变量");
}

if (typeof LLM_API_KEY !== "string" || LLM_API_KEY.trim() === "") {
  throw new Error("❌ LLM_API_KEY 未设置，请检查 .env 或环境变量");
}

const LLM_API_URL: string = LLM_API;
const LLM_API_TOKEN: string = LLM_API_KEY;

/**
 * ===== 调用外部 LLM =====
 */
export async function callLLM(
  messages: { role: string; content: string }[]
): Promise<string> {
  const resp = await axios.post(
    LLM_API_URL,
    {
      model: "deepseek-chat",
      messages,
      temperature: 0.2
    },
    {
      headers: {
        Authorization: `Bearer ${LLM_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      timeout: 60_000
    }
  );

  return resp.data.choices[0].message.content as string;
}
