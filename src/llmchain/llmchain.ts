import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";
import { LLMChain } from "@langchain/classic/chains";

dotenv.config();

async function personalizedPitch(
  course: string,
  role: string,
  wordLimit: string,
) {
  const prompt = new PromptTemplate({
    inputVariables: ["course", "role", "wordLimit"],
    template:
      "Describe the importance of learning {course} for {role}. Limit the output to {wordLimit} words.",
  });

  const formattedPrompt = await prompt.format({
    course,
    role,
    wordLimit,
  });

  console.log("Formatted Prompt: ", formattedPrompt);

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
  });

  const outputParser = new StringOutputParser();

  const legacyLLM = new LLMChain({
    llm,
    prompt,
    outputParser,
  });

  const result = await legacyLLM.invoke({
    course,
    role,
    wordLimit,
  });

  console.log("Generated Output: ", result);
}

await personalizedPitch("generative AI", "javascript developers", "50");
