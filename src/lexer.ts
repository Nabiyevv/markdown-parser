import { SYNTAX_TOKENS, type Token } from "./types";

export class Lexer {
  private input: string;
  private pos: number = 0;

  constructor(input: string) {
    this.input = input;
  }

  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.pos < this.input.length) {
      const char = this.input[this.pos];

      if (char === SYNTAX_TOKENS.HASH) {
        tokens.push({ type: "HASH", value: SYNTAX_TOKENS.HASH });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.STAR) {
        tokens.push({ type: "STAR", value: SYNTAX_TOKENS.STAR });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.MINUS) {
        tokens.push({ type: "MINUS", value: SYNTAX_TOKENS.MINUS });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.UNDERSCORE) {
        tokens.push({ type: "UNDERSCORE", value: SYNTAX_TOKENS.UNDERSCORE });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.BACKTICK) {
        tokens.push({ type: "BACKTICK", value: SYNTAX_TOKENS.BACKTICK });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.TILDE) {
        tokens.push({ type: "TILDE", value: SYNTAX_TOKENS.TILDE });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.BRACKET_OPEN) {
        tokens.push({
          type: "BRACKET_OPEN",
          value: SYNTAX_TOKENS.BRACKET_OPEN,
        });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.BRACKET_CLOSE) {
        tokens.push({
          type: "BRACKET_CLOSE",
          value: SYNTAX_TOKENS.BRACKET_CLOSE,
        });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.PAREN_OPEN) {
        tokens.push({ type: "PAREN_OPEN", value: SYNTAX_TOKENS.PAREN_OPEN });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.PAREN_CLOSE) {
        tokens.push({ type: "PAREN_CLOSE", value: SYNTAX_TOKENS.PAREN_CLOSE });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.NEWLINE) {
        tokens.push({ type: "NEWLINE", value: SYNTAX_TOKENS.NEWLINE });
        this.pos++;
      } else {
        tokens.push(this.readText());
      }
    }

    tokens.push({ type: "EOF", value: SYNTAX_TOKENS.EOF });
    return tokens;
  }

  private readText(): Token {
    let text = "";
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (
        char === SYNTAX_TOKENS.HASH ||
        char === SYNTAX_TOKENS.STAR ||
        char === SYNTAX_TOKENS.UNDERSCORE ||
        char === SYNTAX_TOKENS.BACKTICK ||
        char === SYNTAX_TOKENS.TILDE ||
        char === SYNTAX_TOKENS.MINUS ||
        char === SYNTAX_TOKENS.BRACKET_OPEN ||
        char === SYNTAX_TOKENS.BRACKET_CLOSE ||
        char === SYNTAX_TOKENS.PAREN_OPEN ||
        char === SYNTAX_TOKENS.PAREN_CLOSE ||
        char === SYNTAX_TOKENS.NEWLINE
      ) {
        break;
      }
      text += char;
      this.pos++;
    }
    return { type: "TEXT", value: text };
  }
}
