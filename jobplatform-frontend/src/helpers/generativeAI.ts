// Importing the Google Generative AI SDK to interact with Gemini models
import { GoogleGenerativeAI } from '@google/generative-ai';

// Importing 'p-limit' to restrict the number of concurrent asynchronous calls
import pLimit from 'p-limit';

// Creating a concurrency limiter that allows only 3 async tasks to run at a time
const limit = pLimit(3);

// Accessing the Google Gemini API key from environment variables (Vite style)
const api = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

// Throwing an error if the API key is missing to prevent accidental misconfiguration
if (!api) {
  throw new Error('Missing GOOGLE_GEMINI_API_KEY in environment variables');
}

// Initializing the Generative AI client with the fetched API key
const genAI = new GoogleGenerativeAI(api);

// Exporting an asynchronous function that generates a professional email body based on a given subject
export const generateJobSuggestions = async (subject: string) => {
  // Using the limiter to ensure no more than 3 email generations happen at once
  return limit(async () => {
    try {
      // Creating a prompt to guide the AI in generating a relevant email body
      const prompt = `Here is the user profile of the user according to which we have to find the top 3 jobs that are best for the user it should consist match score "${subject}".`;

      // Getting a generative model instance (using the "gemini-2.0-flash" model for fast response)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // Sending the prompt to the model to generate content
      const result = await model.generateContent(prompt);

      // Extracting plain text from the generated response
      const generatedText = await result.response.text();

      // Returning the final generated email body text
      return generatedText;
    } catch (error) {
      // Logging and rethrowing any errors to be handled by the calling function
      console.error('Error generating body of email:', error);
      throw error;
    }
  });
};
