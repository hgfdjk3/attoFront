import type { Node, Edge } from '@xyflow/react';

export interface AutomationNodeData extends Record<string, unknown> {
  title: string;
  description: string;
  tools: string[];
}

export type AppNode = Node<AutomationNodeData, 'automation'>;
