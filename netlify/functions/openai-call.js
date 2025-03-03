const OpenAI = require("openai");
require("dotenv").config();

exports.handler = async (event, context) => {
  try {
    // Initialize OpenAI API client
    const openai = new OpenAI({
      apiKey: process.env.VUE_APP_OPENAI_KEY, // Securely access your API key from Netlify Environment Variables
    });

    // Parse the body to get input from the frontend
    const prompt = JSON.parse(event.body);

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use the correct model name
      messages: [
        {"role": "user",
        "content": prompt,
        }
      ],
      max_tokens: 150,
    });

    // Return the response to the client
    return {
      statusCode: 200,
      body: JSON.stringify({
        result: response.choices[0].message,
      }),
    };
  } catch (error) {
    console.error("Error calling OpenAI API:", error);

    // Return error response to the client
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to call OpenAI API",
        details: error.message,
      }),
    };
  }
};
