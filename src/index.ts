import { Lexer } from './lexer';
import { Parser } from './parser';
import { HTMLRenderer } from './renderer';
import path from 'path';

const inputPath = path.join(__dirname, './fixtures/sample.md');
const input = await Bun.file(inputPath).text();

const startTime = Date.now();

const lexer = new Lexer(input);
const tokens = lexer.tokenize();

const tokenOutputPath = path.join(__dirname, './out/tokens.json');
await Bun.write(tokenOutputPath, JSON.stringify(tokens, null, 2));

console.log(`--- TOKENS (${tokens.length}) ---`);

const parser = new Parser(tokens);
const ast = parser.parse();

// add AST logging
console.log(`--- AST (${ast.length}) ---`);
const astOutputPath = path.join(__dirname, './out/ast.json');
await Bun.write(astOutputPath, JSON.stringify(ast, null, 2));


const renderer = new HTMLRenderer();
const html = renderer.render(ast);


const outputPath = path.join(__dirname, './out/output.html');
await Bun.write(outputPath, html);

const endTime = Date.now();
console.log(`--- GENERATED HTML (${outputPath}) ---`);
console.log(`--- DURATION: ${endTime - startTime}ms ---`);