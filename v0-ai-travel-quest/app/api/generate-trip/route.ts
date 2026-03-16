import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const tripData = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing from environment variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // We pass explicit JSON schema rules to get predictable parsing
    const prompt = `
You are an expert travel planner API. Based on the JSON payload provided below, generate a customized trip itinerary.
The user wants a ${tripData.days}-day trip to ${tripData.country} across ${tripData.destinations} destinations.
Their budget is ${tripData.budget} ${tripData.currency}.
Their travel style is '${tripData.travelStyle}'. You must strictly tailor the top attractions, activities, and hotels to this style.
If the style is 'adventure', suggest hiking, extreme sports, and thrilling places. If 'cultural', suggest temples, museums, and historical sites. If 'relaxation', suggest beaches, spas, and scenic leisure spots.

Return a valid JSON array of ${tripData.destinations} destination objects. DO NOT wrap the output in markdown code blocks like \`\`\`json. Return ONLY the raw JSON string.

Each destination object MUST adhere EXACTLY to this schema:
{
  "id": <number, 1-indexed>,
  "name": "<string, place/state/city name>",
  "description": "<string, short engaging description tailored to the travel style>",
  "coordinates": { "lat": <number>, "lng": <number> },
  "budget": <number, a sensible share of the total budget>,
  "days": <number, a sensible share of the total days>,
  "attractions": [
    {
      "name": "<string, specific famous real-world place>",
      "timing": "<string, e.g., '09:00 AM - 11:30 AM'>",
      "coordinates": { "lat": <number>, "lng": <number> }
    },
    ... (return exactly 3 attractions)
  ],
  "activities": [
    "<string, exact top activity for this style in this area>",
    ... (return exactly 3 activities)
  ],
  "weather": "<string, e.g., 'Sunny, 25°C'>",
  "hotels": [
    "<string, real famous/popular hotel in this area>",
    ... (return exactly 3 hotels)
  ]
}

Only return the raw JSON Array. Do not include any other text.
`;

    const result = await model.generateContent(prompt);
    let outputText = result.response.text();

    // In case the AI includes markdown backticks, strip them out mapping
    outputText = outputText.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();

    const jsonResult = JSON.parse(outputText);

    // Provide the unlocked/completed states for the UI state machine
    const mappedResult = jsonResult.map((dest: any, index: number) => ({
      ...dest,
      unlocked: index === 0,
      completed: false,
    }));

    return NextResponse.json({ destinations: mappedResult }, { status: 200 });
  } catch (error) {
    console.error("AI Generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate trip plan." },
      { status: 500 }
    );
  }
}
