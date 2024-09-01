const { Configuration, OpenAIApi } = require("openai");

// Retrieve the OpenAI API key from environment variables.
const openai_api_key = process.env['OPENAI_API_KEY'];

// Create a configuration object using the API key.
const configuration = new Configuration({
  apiKey: openai_api_key,
});

// Initialize the OpenAIApi client with the provided configuration.
const openai = new OpenAIApi(configuration);

// Asynchronous function to generate an image based on a text prompt.
async function image(text) {
  const response = await openai.createImage({
    prompt: text,
    n: 1,                   // Number of images to generate.
    size: "1024x1024",      // Size of the generated image.
  });
  return response;          // Return the API response.
}

module.exports = image;
