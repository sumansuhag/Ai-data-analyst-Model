/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import {GoogleGenAI} from '@google/genai';
import {getDataAnalystSystemPrompt} from '../constants';

if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable is not set.');
}

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export async function* streamAnalysis(
  task: string,
  csvData: string,
): AsyncGenerator<string, void, void> {
  const model = 'gemini-2.5-flash';
  const systemPrompt = getDataAnalystSystemPrompt();

  const prompt = `
    ${systemPrompt}

    **TASK:** ${task}

    **DATA (CSV format, first 4000 characters):**
    ---
    ${csvData.substring(0, 4000)}
    ---

    Now, generate the HTML report based on the task and data provided.
  `;

  try {
    const response = await ai.models.generateContentStream({
      model,
      contents: prompt,
    });

    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('Error streaming from Gemini:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    yield `<div class="card bg-red-100 text-red-700">
      <h2 class="text-2xl font-bold">API Error</h2>
      <p>${errorMessage}</p>
    </div>`;
  }
}
