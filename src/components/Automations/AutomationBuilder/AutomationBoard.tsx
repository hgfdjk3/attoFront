import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AutomationNode } from './AutomationNode/AutomationNode';
import { AppNode } from './types';

const nodeTypes = {
  automation: AutomationNode,
};

export interface AutomationBoardProps {
  initialNodes?: AppNode[];
  initialEdges?: Edge[];
}

export const AutomationBoard: React.FC<AutomationBoardProps> = ({
  initialNodes = [],
  initialEdges = [],
}) => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<AppNode>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      nodesDraggable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background 
        variant={BackgroundVariant.Dots} 
        bgColor="light-dark(var(--mantine-color-body), var(--mantine-color-zinc-8))" 
        gap={16} 
        size={1} 
      />
    </ReactFlow>
  );
};
