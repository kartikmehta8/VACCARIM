const { Configuration, OpenAIApi } = require("openai");
const openai_api_key = process.env['OPENAI_API_KEY'];

const configuration = new Configuration({
  apiKey: openai_api_key,
});

const openai = new OpenAIApi(configuration);

async function image(text) {
  const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: "1024x1024",
  });
  return response;
}

module.exports = image;