const { Configuration, OpenAIApi } = require("openai");

// Fetch the OpenAI API key from environment variables.
const openai_api_key = process.env['OPENAI_API_KEY'];

// Set up the configuration with the API key.
const configuration = new Configuration({
  apiKey: openai_api_key,
});

// Initialize the OpenAIApi client with the configuration.
const openai = new OpenAIApi(configuration);

// Function to fetch a completion from the OpenAI API based on the given comment.
async function fetch(comment) {
  const response = await openai.createCompletion({
    model: "code-davinci-002",  // Change model accordingly.
    prompt: comment,            // The input prompt for the completion.
    temperature: 0,             // Deterministic output with no randomness.
    max_tokens: 256,            // Limit the response length to 256 tokens.
    top_p: 1,                   // Use all tokens for sampling.
    frequency_penalty: 0,       // No penalty for frequent tokens.
    presence_penalty: 0,        // No penalty for token presence.
  });
  return response;
}

module.exports = fetch;
