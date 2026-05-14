import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow
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

const AutomationBoardInternal: React.FC<AutomationBoardProps> = ({
  initialNodes = [],
  initialEdges = [],
}) => {
  const [nodes, setNodes] = useState<AppNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const { fitView } = useReactFlow();
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Auto-center whenever the container size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      // Use requestAnimationFrame to ensure the resize has finished and ReactFlow has updated its internal dimensions
      window.requestAnimationFrame(() => {
        fitView({ duration: 0, padding: 0.2 });
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [fitView]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
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
    </div>
  );
};

export const AutomationBoard: React.FC<AutomationBoardProps> = (props) => (
  <ReactFlowProvider>
    <AutomationBoardInternal {...props} />
  </ReactFlowProvider>
);
