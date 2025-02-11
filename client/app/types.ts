import { WORDS } from "./words";

export type Word = (typeof WORDS)[number];

export type Result = {
  word: Word;
  guess: Word;
};

export type Params = {
  code: string;
};

type GuessResponse = {
  guess: Word;
};

type MatchResponse =
  | {
      type: "stroke";
      stroke: Stroke;
    }
  | {
      type: "clear";
    }
  | {
      type: "ready";
    }
  | {
      type: "start";
      word: Word;
    }
  | {
      type: "win";
    }
  | {
      type: "create";
      code: string;
    }
  | {
      type: "join";
      username: string;
    }
  | {
      type: "error";
      message: string;
    };

export type Stroke = {
  x: number;
  y: number;
  color: string | CanvasGradient | CanvasPattern;
  isNew: boolean;
};

const isWord = (word: unknown): word is Word =>
  typeof word === "string" && WORDS.includes(word as Word);

const isStroke = (stroke: unknown): stroke is Stroke =>
  typeof stroke === "object" &&
  stroke !== null &&
  "x" in stroke &&
  "y" in stroke &&
  "color" in stroke &&
  typeof stroke.x === "number" &&
  typeof stroke.y === "number" &&
  typeof stroke.color === "string";

export const isGuessResponse = (response: unknown): response is GuessResponse =>
  typeof response === "object" &&
  response !== null &&
  "guess" in response &&
  isWord(response.guess);

export const isMatchResponse = (
  response: unknown
): response is MatchResponse => {
  if (
    !(
      typeof response === "object" &&
      response !== null &&
      "type" in response &&
      (response.type === "stroke" ||
        response.type === "clear" ||
        response.type === "ready" ||
        response.type === "start" ||
        response.type === "win" ||
        response.type === "create" ||
        response.type === "join" ||
        response.type === "error")
    )
  )
    return false;

  if (response.type === "stroke")
    return "stroke" in response && isStroke(response.stroke);

  if (response.type === "start")
    return "word" in response && isWord(response.word);

  if (response.type === "create")
    return "code" in response && typeof response.code === "string";

  if (response.type === "join")
    return "username" in response && typeof response.username === "string";

  if (response.type === "error")
    return "message" in response && typeof response.message === "string";

  return true;
};
