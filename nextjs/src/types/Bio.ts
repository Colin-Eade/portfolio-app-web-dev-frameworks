import { Entity } from './Entity';

interface TextNode {
  type: 'text';
  text: string;
}

interface ParagraphNode {
  type: 'paragraph';
  children: TextNode[];
}

export interface Bio extends Entity {
  paragraphs: ParagraphNode[];
}
