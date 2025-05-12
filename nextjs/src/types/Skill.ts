import { Entity } from './Entity';
import { Technology } from './Technology';

export interface Skill extends Entity {
  title: string;
  slug: string;
  summary: string;
  content: string;
  technologies: Technology[];
}
