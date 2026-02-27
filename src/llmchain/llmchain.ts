import { PromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  inputVariables: ["course", "role", "wordLimit"],
  template:
    "Describe the importance of learning {course} for {role}. Limit the output to {wordLimit} words.",
});

const formattedPrompt = await prompt.format({
  course: "generative AI",
  role: "javascript developers",
  wordLimit: "50",
});

console.log("Formatted Prompt: ", formattedPrompt);
