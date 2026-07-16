# Markdown Parsing Engine
Welcome to the test suite for our custom **hand-written parser** built with **Bun**.

## Core Architecture
The parser uses a clean three-phase pipeline:
First, the `Lexer` converts raw strings into structured tokens.
Second, the `Parser` constructs an **Abstract Syntax Tree** without relying on regex.
Third, the `HTMLRenderer` outputs clean semantic markup.

# Feature Verification
## Headers
# Level 1 Heading Test
## Level 2 Heading Test

## Inline Formatting
This line tests single backticks for `inline code blocks` inside standard text.
This line tests **bold formatting** across multiple words.
This line tests mixed usage of `code` alongside **bold text** in a single paragraph.

## Edge Cases
**Bold text at the start of a sentence** can occur naturally.
You can also have **bold at the end**.
Sequential `code_one` and `code_two` blocks should parse cleanly.

```bash
pip install foobar
```