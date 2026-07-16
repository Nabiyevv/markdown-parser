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
        tokens.push({ type: 'HASH', value: SYNTAX_TOKENS.HASH });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.STAR) {
        tokens.push({ type: 'STAR', value: SYNTAX_TOKENS.STAR });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.BACKTICK) {
        tokens.push({ type: 'BACKTICK', value: SYNTAX_TOKENS.BACKTICK });
        this.pos++;
      } else if (char === SYNTAX_TOKENS.NEWLINE) {
        tokens.push({ type: 'NEWLINE', value: SYNTAX_TOKENS.NEWLINE });
        this.pos++;
      } else {
        tokens.push(this.readText());
      }
    }

    tokens.push({ type: 'EOF', value: SYNTAX_TOKENS.EOF });
    return tokens;
  }

  private readText(): Token {
    let text = '';
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (char === SYNTAX_TOKENS.HASH || char === SYNTAX_TOKENS.STAR || char === SYNTAX_TOKENS.BACKTICK || char === SYNTAX_TOKENS.NEWLINE) {
        break;
      }
      text += char;
      this.pos++;
    }
    return { type: 'TEXT', value: text };
  }
}