import { Result, Word } from "./types";

export const WORDS = [
  "apple",
  "hand",
  "eye",
  "fish",
  "car",
  "crown",
  "dog",
  "book",
  "bicycle",
  "airplane",
] as const;

export const getRandomWord = (results: Result[]) => {
  let word: Word;

  do word = WORDS[Math.floor(Math.random() * WORDS.length)];
  while (results.some(result => result.word === word));

  return word;
};
