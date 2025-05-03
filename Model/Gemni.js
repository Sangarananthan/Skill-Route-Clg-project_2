import { GoogleGenerativeAI } from "@google/generative-ai";
const Gemni = async (prompt) => {
  const apiKey = "AIzaSyAH3uz96jE0ARXt9ak3FtxNUqzCK7i8W80";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
  }
};
export default Gemni;
