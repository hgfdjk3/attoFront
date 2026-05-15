import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, Stack } from '@mantine/core';
import { AppEdge, AppNode } from '../types';
import { useReactFlow } from '@xyflow/react';
import { AutomationNodeHeader } from './AutomationNodeHeader';
import { AutomationNodeContent } from './AutomationNodeContent';
import { AutomationNodeRewrite } from './AutomationNodeRewrite';
import './AutomationNode.css';

export interface AutomationNodeProps extends NodeProps<AppNode> { }

export const AutomationNode: React.FC<AutomationNodeProps> = ({ data, isConnectable, id }) => {
  const { setNodes } = useReactFlow<AppNode, AppEdge>();
  const [prompt, setPrompt] = React.useState('');

  const setIsRewriting = (val: boolean) => {
    setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, isRewriting: val } } : n));
  };

  const isRewriting = data.isRewriting;

  const handleRewrite = () => {
    // In a real app, this would call an LLM API
    console.log(`Rewriting node ${data.title} with prompt: ${prompt}`);
    setIsRewriting(false);
    setPrompt('');
  };

  return (
    <Card p="md" className="automation-node-card">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="automation-handle" />

      <Stack gap="xs">
        <AutomationNodeHeader
          title={data.title}
          isRewriting={!!isRewriting}
          onToggleRewrite={() => setIsRewriting(!isRewriting)}
        />

        {!isRewriting ? (
          <AutomationNodeContent
            description={data.description}
            tools={data.tools}
          />
        ) : (
          <AutomationNodeRewrite
            prompt={prompt}
            onPromptChange={setPrompt}
            onRewrite={handleRewrite}
            onCancel={() => setIsRewriting(false)}
          />
        )}
      </Stack>

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="automation-handle" />
    </Card>
  );
};
