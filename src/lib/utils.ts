import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformInput(input) {
  // Initialize an empty array to hold the transformed objects
  const answers = [];

  // Iterate over each key-value pair in the input object
  for (const [key, value] of Object.entries(input)) {
      // Create a new object with the required format
      const transformedObject = {
          question_id: key,
          answer: value
      };

      // Add the transformed object to the answers array
      answers.push(transformedObject);
  }

  // Return the final array wrapped in an object with the "answers" key
  return { answers: answers };
}