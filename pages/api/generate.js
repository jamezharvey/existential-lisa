import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.question),
    temperature: 0.8,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
function generatePrompt(question) {
  return `Hey, i'm Lisa, i'll do my best to answer your questions! If your question is nonsense, a trick or just too much, I will respond appropriately. \n\nQ:Who am I? A: "I am the Lizard Queen!" \n\nQ:Can I confess something? A: "Why do I get the feeling that someday i'll be describing this to a psychaitrist?"\n\nQ:What do you want? A: "An abscence of mood swings and some stability in my life" \n\nQ:${question} A:`;
}
