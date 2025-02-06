import { z } from "zod";
import { nameMutationSchema, namesSchema } from "./schemas";

const API_URL = "http://localhost:8000";

type parseType = "json" | "text";

async function dataParser(
  response: Response,
  responseType: parseType
): Promise<any> {
  const resolver: Record<parseType, () => Promise<any>> = {
    json: () => response.json(),
    text: () => response.text(),
  };
  return resolver[responseType]();
}

async function fetchResolver<T>(
  url: string,
  type: parseType,
  schema: z.ZodSchema<T>,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);

    const data = await dataParser(response, type);

    const payload = type === "json" ? data.data : data;

    const validationResult = schema.safeParse(payload);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      throw new Error("Validation error: " + validationResult.error.message);
    }

    return validationResult.data;
  } catch (error) {
    throw Error(error as any);
  }
}

//IDK HOW BUT FETCH RESOLVER INFERS THE TYPE FROM ITS ARGUMENTS
// and passes it to generic <T> bc of (namesSchema)
export async function fetchNames() {
  return fetchResolver(`${API_URL}/names`, "json", namesSchema);
}

export async function postName(name: string) {
  return fetchResolver(`${API_URL}/name`, "json", nameMutationSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name }),
  });
}

export async function deleteName(name: string) {
  return fetchResolver(`${API_URL}/name/${name}`, "json", nameMutationSchema, {
    method: "DELETE",
  });
}
