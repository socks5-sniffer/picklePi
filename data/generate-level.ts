import { GoogleGenAI, Type, Schema } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file (needs to be above GoogleGenAI init)
dotenv.config();

// Initialize Gemini Client
// It will now automatically pick up process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateNewLevel(topic: string, levelNumber: number) {
  console.log(`🧠 Prompting Gemini to generate Level ${levelNumber} on topic: "${topic}"...`);

  // Define the exact schema we want Gemini to return so it matches Project[] in curriculum.ts
  const pageSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: "e.g., p14-overview" },
      title: { type: Type.STRING },
      content: {
        type: Type.OBJECT,
        properties: {
          overview: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
              difficulty: { type: Type.INTEGER },
              estimatedTime: { type: Type.STRING }
            }
          },
          hardwareSetup: {
            type: Type.OBJECT,
            properties: {
              warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              explanation: { type: Type.STRING }
            }
          },
          code: { type: Type.STRING, description: "The full executable python script" },
          codeWalkthrough: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                section: { type: Type.STRING },
                explanation: { type: Type.STRING }
              }
            }
          },
          conceptDeepDive: {
            type: Type.OBJECT,
            properties: {
              hardware: { type: Type.STRING },
              software: { type: Type.STRING },
              connection: { type: Type.STRING }
            }
          },
          experimentMode: {
            type: Type.OBJECT,
            properties: {
              tweak: { type: Type.STRING },
              logic: { type: Type.STRING },
              creative: { type: Type.STRING }
            }
          },
          troubleshooting: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { issue: { type: Type.STRING }, solution: { type: Type.STRING } }
            }
          }
        }
      }
    }
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: `Generate a complete, 7-page educational curriculum level for a Raspberry Pi learning platform using Python and the gpiozero library. The topic is: ${topic}. The level number is ${levelNumber}. Ensure all code is secure and follows best practices. Make sure there are exactly 7 pages in the pages array corresponding to overview, hardware, code, walkthrough, deepdive, experiment, and troubleshooting.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          level: { type: Type.INTEGER },
          levelName: { type: Type.STRING },
          title: { type: Type.STRING },
          skillsLearned: { type: Type.ARRAY, items: { type: Type.STRING } },
          badgeEarned: { type: Type.STRING },
          content: {
            type: Type.OBJECT,
            properties: {
              overview: { /* Omitted for brevity, matches pageSchema overview */ type: Type.OBJECT },
              pages: { type: Type.ARRAY, items: pageSchema },
              // Top level structure padding
              hardwareSetup: { type: Type.OBJECT },
              code: { type: Type.STRING },
              codeWalkthrough: { type: Type.ARRAY, items: { type: Type.OBJECT } },
              conceptDeepDive: { type: Type.OBJECT },
              experimentMode: { type: Type.OBJECT },
              troubleshooting: { type: Type.ARRAY, items: { type: Type.OBJECT } }
            }
          }
        }
      }
    }
  });

  const outputFilename = path.join(__dirname, `src/data/generated-level-${levelNumber}.json`);
  fs.writeFileSync(outputFilename, response.text || "");
  console.log(`✅ Successfully generated level data and saved to ${outputFilename}!`);
}

// Example Usage: Run this script via `npx tsx scripts/generate-level.ts`
generateNewLevel("RFID Reader with SPI", 14).catch(console.error);
