import type { ASTNode } from './types';

export class HTMLRenderer {
  public render(nodes: ASTNode[]): string {
    return nodes.map((node) => this.renderNode(node)).join('\n');
  }

  private renderNode(node: ASTNode): string {
    switch (node.type) {
      case 'Heading':
        return `<h${node.level} style="margin: .67em 0;
          padding-bottom: .3em;
          border-bottom: 1px solid #d1d9e0b3;">${this.render(node.children)}</h${node.level}>`;
      case 'Paragraph':
        return `<p>${this.render(node.children)}</p>`;
      case 'Bold':
        return `<strong>${this.render(node.children)}</strong>`;
      case 'Strikethrough':
        return `<s>${this.render(node.children)}</s>`;
      case 'Italic':
        return `<em>${this.render(node.children)}</em>`;
      case 'Divider':
        return `<hr style="border: none;
          border-top: 2px solid #d1d9e0b3;" />`;
      case 'Link':
        return `<a href="${node.href}" ${node.title ? `title="${node.title}"` : ''}>${this.render(node.children)}</a>`;
      case 'Image':
        return `<img src="${node.src}" alt="${node.alt ?? ''}" ${node.title ? `title="${node.title}"` : ''} />`;
      case 'CodeInline':
        return `<code>${node.value}</code>`;
      case 'CodeBlock':
        return `<pre><code lang="${node.lang}">${node.value}</code></pre>`;
      case 'Text':
        return node.value;
    }
  }
}
