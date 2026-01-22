Doc Agent System

一个支持 自然对话 + 文档生成（Word / Excel / PDF） 的 AI Agent 系统，
可通过 API / SSE / 网页嵌入聊天窗口 等方式接入内部系统。
✨ 功能特性

🤖 自然语言对话

📄 智能文档生成

Word（.docx）

Excel（支持多 Sheet）

PDF（可扩展）

🌊 SSE 流式响应

实时反馈生成进度

更友好的用户体验

🧩 可嵌入网页的聊天窗口

右下角浮窗

类 ChatGPT / 客服体验

🔌 前后端解耦

Node.js 负责 Agent & 对话

Python 负责文档生成

🏗️ 项目结构
doc-agent-system/
├─ doc-agent/          # Node.js + TypeScript
│  ├─ src/
│  │  ├─ app.ts        # 应用入口
│  │  ├─ agent/        # Agent 核心逻辑
│  │  ├─ routes/       # API / SSE 路由
│  │  └─ llm/          # LLM 客户端
│  ├─ package.json
│  └─ .env.example
│
├─ doc-generator/      # Python + FastAPI
│  ├─ main.py          # 文档生成服务
│  ├─ requirements.txt
│  └─ README.md
│
├─ .gitignore
└─ README.md
