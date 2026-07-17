import type { ASTNode, Token } from "./types";

export class Parser {
  private tokens: Token[];
  private pos: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): ASTNode[] {
    const ast: ASTNode[] = [];

    while (!this.isAtEnd()) {
      if (this.match("NEWLINE")) continue;
      if (this.isCodeFence()) {
        ast.push(this.parseCodeBlock());
      } else if (this.peek().type === "HASH") {
        ast.push(this.parseHeading());
      } else {
        ast.push(this.parseParagraph());
      }
    }

    return ast;
  }

  private parseHeading(): ASTNode {
    let level = 0;
    while (this.match("HASH")) level++;

    const current = this.peek();
    if (current.type === "TEXT" && current.value.startsWith(" ")) {
      current.value = current.value.substring(1);
    }

    const children = this.parseInlineUntil(
      () => this.peek().type === "NEWLINE",
      () => {
        this.advance();
      },
    );
    return { type: "Heading", level, children };
  }

  private parseParagraph(): ASTNode {
    const children = this.parseInlineUntil(
      () => this.peek().type === "NEWLINE",
      () => {
        this.advance();
      },
    );
    return { type: "Paragraph", children };
  }

  private parseInlineUntil(
    stop: () => boolean,
    consumeStop: () => void,
  ): ASTNode[] {
    const nodes: ASTNode[] = [];

    while (!this.isAtEnd() && !stop()) {
      let boldRule =
        (this.peek().type === "STAR" && this.peekNext()?.type === "STAR") ||
        (this.peek().type === "UNDERSCORE" &&
          this.peekNext()?.type === "UNDERSCORE");

      let italicRule =
        (this.peek().type === "STAR" && this.peekNext()?.type !== "STAR") ||
        (this.peek().type === "UNDERSCORE" &&
          this.peekNext()?.type !== "UNDERSCORE");

      let strikethroughRule =
        (this.peek().type === "TILDE" && this.peekNext()?.type === "TILDE");

      if (boldRule) {
        nodes.push(this.parseBold());
      } else if (italicRule) {
        nodes.push(this.parseItalic());
      } else if (strikethroughRule) {
        nodes.push(this.parseStrikethrough());
      } else if (this.peek().type === "BACKTICK") {
        nodes.push(this.parseCodeInline());
      } else {
        const token = this.advance();
        if (token.value.length > 0) {
          nodes.push({ type: "Text", value: token.value });
        }
      }
    }

    if (!this.isAtEnd() && stop()) consumeStop();
    return nodes;
  }

  private parseBold(): ASTNode {
    const delimiter = this.peek().type;
    this.advance(); // consume opening delimiter
    this.advance();

    const children = this.parseInlineUntil(
      () =>
        this.peek().type === delimiter && this.peekNext()?.type === delimiter,
      () => {
        this.advance();
        this.advance();
      },
    );

    return { type: "Bold", children };
  }

  private parseStrikethrough(): ASTNode {
    const delimiter = this.peek().type;
    this.advance(); // consume opening delimiter
    this.advance();

    const children = this.parseInlineUntil(
      () =>
        this.peek().type === delimiter && this.peekNext()?.type === delimiter,
      () => {
        this.advance();
        this.advance();
      },
    );

    return { type: "Strikethrough", children };
  }

  private parseItalic(): ASTNode {
    const delimiter = this.peek().type;
    this.advance(); // consume opening delimiter

    const children = this.parseInlineUntil(
      () => this.peek().type === delimiter,
      () => {
        this.advance();
      },
    );

    return { type: "Italic", children };
  }

  private parseCodeInline(): ASTNode {
    this.advance(); // consume `
    let value = "";
    while (!this.isAtEnd() && this.peek().type !== "BACKTICK") {
      value += this.advance().value;
    }
    if (this.peek().type === "BACKTICK") this.advance();

    return { type: "CodeInline", value };
  }

  private parseCodeBlock(): ASTNode {
    this.advance(); // consume `
    this.advance(); // consume `
    this.advance(); // consume `

    let lang = "";
    while (!this.isAtEnd() && this.peek().type !== "NEWLINE") {
      lang += this.advance().value;
    }
    if (this.peek().type === "NEWLINE") this.advance();

    let value = "";
    while (!this.isAtEnd() && !this.isCodeFence()) {
      value += this.advance().value;
    }

    if (this.isCodeFence()) {
      this.advance(); // consume `
      this.advance(); // consume `
      this.advance(); // consume `
    }
    if (this.peek().type === "NEWLINE") this.advance();

    return {
      type: "CodeBlock",
      lang: lang.trim(),
      value: value.replace(/\n$/, ""),
    };
  }

  private isCodeFence(): boolean {
    return (
      this.peek().type === "BACKTICK" &&
      this.peekNext()?.type === "BACKTICK" &&
      this.peekNext(2)?.type === "BACKTICK"
    );
  }

  private peek(): Token {
    return this.tokens[this.pos]!;
  }

  private peekNext(offset = 1): Token | undefined {
    return this.tokens[this.pos + offset];
  }

  private advance(): Token {
    const current = this.tokens[this.pos]!;
    if (!this.isAtEnd()) this.pos++;
    return current;
  }

  private match(type: string): boolean {
    if (this.peek().type === type) {
      this.advance();
      return true;
    }
    return false;
  }

  private isAtEnd(): boolean {
    return this.peek().type === "EOF";
  }
}
