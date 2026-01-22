export type AgentResult =
  | {
      intent: "chat";
      reply: string;
    }
  | {
      intent: "generate_document";
      file_type: "word" | "excel" | "ppt" | "pdf";
      document_title: string;
      markdown_content: string;
    };
