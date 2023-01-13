const { Configuration, OpenAIApi } = require("openai");
const openai_api_key = process.env['OPENAI_API_KEY'];

const configuration = new Configuration({
  apiKey: openai_api_key,
});

const openai = new OpenAIApi(configuration);

async function fetch(comment) {
  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: comment,
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
}

module.exports = fetch;