import axios from "axios";

const DOC_SERVICE_URL = "http://127.0.0.1:5001/generate";

export async function generateWord(params: {
  title: string;
  content: string;
  file_type?: "word" | "excel" | "ppt" | "pdf";
}) {
  const resp = await axios.post(DOC_SERVICE_URL, params);
  return resp.data.file_url as string;
}
