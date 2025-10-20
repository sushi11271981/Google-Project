
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export async function generatePhysicsSimCode(): Promise<string> {
  const prompt = `
Create a complete, single-file Python script for a 'falling sand' particle physics simulation using the \`pygame\` library.

The script must be runnable on macOS and should not have dependencies other than pygame.

The simulation must include the following particle types with distinct colors and behaviors:
1.  **SAND (Yellow):** Falls straight down. If blocked, attempts to fall down-left or down-right.
2.  **WATER (Blue):** Falls straight down. If blocked or has water below, spreads horizontally to the left or right.
3.  **STONE (Gray):** Immovable. Acts as a static obstacle.
4.  **WOOD (Brown):** Floats on water. If submerged, it will try to move upwards. Otherwise, it is static.

The application window should be 800x600 pixels, with a simulation grid resolution of 100x75 (8x8 pixel particles).

User interaction requirements:
- The user can select a particle type (SAND, WATER, STONE, WOOD) using number keys (1, 2, 3, 4).
- The user can "paint" the selected particle onto the simulation grid by clicking and dragging the mouse. The brush size should be adjustable with the mouse wheel.
- The user can clear the entire screen by pressing the 'c' key.
- Display the currently selected particle type, brush size, and FPS on the screen.

The code should be well-structured and include comments explaining the main parts of the simulation loop, particle physics, and user input handling.
Ensure the main game loop is correctly implemented with event handling for quitting the application and a fixed update rate for the simulation logic.
The update logic should iterate through the grid pixels in a way that correctly handles particle movement, for example, by iterating bottom-up and alternating horizontal scan direction each frame to prevent bias.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate code from Gemini API.");
  }
}
