"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createTravel } from "./travel.actions";
export const generativeIa = async (
    origin: string,
    destination: string,
    description?: string
) => {
    const apiKey = process.env.API_KEY!;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `que necesito para viajar de ${origin} a ${destination}, ${
        description ? description : ""
    }, porfavor me puedes responder en un formato json, en el json debe estar una lista de requisitos en  una propiedad de requisitos, cada item de la lista debe tener el campo tipo y descripcion, solo el json porfavor y trata de que la informacion sea lo mas actualizada posible.`;

    const result = await model.generateContent(prompt);
    const jsonResponse = result.response.text();
    const cleanedJsonResponse = jsonResponse.replace(/```json|```/g, "");
    const parsedJsonResponse = JSON.parse(cleanedJsonResponse);
    await createTravel(
        origin,
        destination,
        description || "",
        parsedJsonResponse
    );
};
