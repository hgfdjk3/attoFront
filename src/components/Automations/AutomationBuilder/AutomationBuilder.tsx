import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
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
import { Box, Paper } from '@mantine/core';
import { AutomationActionButton } from '../AutomationActionButton';

export interface AutomationBuilderProps {
  initialNodes?: AppNode[];
  initialEdges?: Edge[];
  height?: string | number;
}

const nodeTypes = {
  automation: AutomationNode,
};

const defaultNodes: AppNode[] = [
  {
    id: '1',
    type: 'automation',
    position: { x: 50, y: 150 },
    data: {
      title: 'Trigger Event',
      description: 'Triggered when a new user joins the workspace.',
      tools: ['WebHook Listener']
    },
  },
  {
    id: '2',
    type: 'automation',
    position: { x: 600, y: 150 },
    data: {
      title: 'Extract Profile Data',
      description: 'Uses LLM to extract key skills and interests from user profile.',
      tools: ['LLM', 'JSON Parser']
    },
  },
  {
    id: '3',
    type: 'automation',
    position: { x: 1150, y: 150 },
    data: {
      title: 'Assign to Team',
      description: 'Assigns the user to the appropriate team channel based on skills.',
      tools: ['Slack API', 'Database']
    },
  }
];

const defaultEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true }
];

export const AutomationBuilder: React.FC<AutomationBuilderProps> = ({
  initialNodes = defaultNodes,
  initialEdges = defaultEdges,
  height = '100%'
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
    <Paper
      w="100%"
      h={height}
      radius="0"
      shadow="0"
      style={{
        borderBottom: "1px solid var(--mantine-color-default-border)",
        borderTop: "1px solid var(--mantine-color-default-border)",
        overflow: 'hidden',
      }}
      pos={'relative'}
    >
      <Box
        style={{
          position: 'absolute',
          zIndex: 10,
          top: '10px',
          right: '10px',
        }}
      >
        <AutomationActionButton isActive label='Trigger' actionType='trigger' />
      </Box>
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
        <Background variant={BackgroundVariant.Dots} bgColor="light-dark(var(--mantine-color-body), var(--mantine-color-zinc-8))" gap={16} size={1} />
      </ReactFlow>
    </Paper>
  );
};
