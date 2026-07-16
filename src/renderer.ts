import type { ASTNode } from './types';

export class HTMLRenderer {
  public render(nodes: ASTNode[]): string {
    return nodes.map((node) => this.renderNode(node)).join('\n');
  }

  private renderNode(node: ASTNode): string {
    switch (node.type) {
      case 'Heading':
        return `<h${node.level}>${this.render(node.children)}</h${node.level}>`;
      case 'Paragraph':
        return `<p>${this.render(node.children)}</p>`;
      case 'Bold':
        return `<strong>${this.render(node.children)}</strong>`;
      case 'CodeInline':
        return `<code>${node.value}</code>`;
      case 'CodeBlock':
        return `<pre><code lang="${node.lang}">${node.value}</code></pre>`;
      case 'Text':
        return node.value;
    }
  }
}