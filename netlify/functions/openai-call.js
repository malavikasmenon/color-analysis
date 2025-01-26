const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

exports.handler = async (event, context) => {
  try {
    // Initialize OpenAI API client
    const configuration = new Configuration({
      apiKey: process.env.VUE_APP_OPENAI_KEY, // Securely access your API key from Netlify Environment Variables
    });
    const openai = new OpenAIApi(configuration);

    // Parse the body to get input from the frontend
    const { prompt } = JSON.parse(event.body);

    // Call OpenAI API
    const response = await openai.createCompletion({
        model: "gpt-4o-mini", // You can change this to the model you want to use
        prompt: prompt,
        max_tokens: 100,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: response.data.choices[0].text }),
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
