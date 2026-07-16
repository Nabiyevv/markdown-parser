export type TokenType =
  | 'HASH'
  | 'STAR'
  | 'UNDERSCORE'
  | 'BACKTICK'
  | 'TEXT'
  | 'NEWLINE'
  | 'EOF';

export const SYNTAX_TOKENS = {
  HASH: '#',
  STAR: '*',
  UNDERSCORE: '_',
  BACKTICK: '`',
  NEWLINE: '\n',
  EOF: '',
} as const;


export interface Token {
  type: TokenType;
  value: string;
}

export type ASTNode =
  | { type: 'Heading'; level: number; children: ASTNode[] }
  | { type: 'Paragraph'; children: ASTNode[] }
  | { type: 'Text'; value: string }
  | { type: 'Bold'; children: ASTNode[] }
  | { type: 'Italic'; children: ASTNode[] }
  | { type: 'CodeInline'; value: string }
  | { type: 'CodeBlock'; lang: string; value: string };