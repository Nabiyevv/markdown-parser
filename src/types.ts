export type TokenType =
  | 'HASH'
  | 'STAR'
  | 'UNDERSCORE'
  | 'BACKTICK'
  | 'TILDE'
  | 'MINUS'
  | 'BRACKET_OPEN'
  | 'BRACKET_CLOSE'
  | 'PAREN_OPEN'
  | 'PAREN_CLOSE'
  | 'TEXT'
  | 'NEWLINE'
  | 'EOF';

export const SYNTAX_TOKENS = {
  HASH: '#',
  STAR: '*',
  UNDERSCORE: '_',
  BACKTICK: '`',
  TILDE: '~',
  MINUS: '-',
  BRACKET_OPEN: '[',
  BRACKET_CLOSE: ']',
  PAREN_OPEN: '(',
  PAREN_CLOSE: ')',
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
  | { type: 'Divider' }
  | { type: 'Bold'; children: ASTNode[] }
  | { type: 'Strikethrough'; children: ASTNode[] }
  | { type: 'Italic'; children: ASTNode[] }
  | { type: 'Link'; children: ASTNode[]; href: string; title: string | undefined }
  | { type: 'CodeInline'; value: string }
  | { type: 'CodeBlock'; lang: string; value: string };