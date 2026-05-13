import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, Text, Badge, Group, Stack, ThemeIcon, Menu, ActionIcon } from '@mantine/core';
import { IconTool, IconDotsVertical, IconEdit, IconCopy, IconTrash } from '@tabler/icons-react';
import { AppNode } from '../types';
import './AutomationNode.css';

export interface AutomationNodeProps extends NodeProps<AppNode> { }

export const AutomationNode: React.FC<AutomationNodeProps> = ({ data, isConnectable }) => {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder className="automation-node-card">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="automation-handle" />

      <Stack gap="xs">
        <Group justify="space-between" align="center" wrap="nowrap" gap="xs">
          <Text fw={600} size="md" style={{ flex: 1 }}>{data.title}</Text>
          <Menu shadow="md" width={160} position="bottom-start" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="sm" className="nodrag">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>
              <Menu.Item leftSection={<IconCopy size={14} />}>Duplicate</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </Group>
        <Text size="sm" c="dimmed" lineClamp={2}>{data.description}</Text>


        {data.tools && data.tools.length > 0 && (
          <Group gap="xs" mt="xs">
            {data.tools.map((tool, index) => (
              <Badge key={index} variant="light" size="sm" leftSection={<ThemeIcon size="xs" variant="transparent"><IconTool size={10} /></ThemeIcon>}>
                {tool}
              </Badge>
            ))}
          </Group>
        )}
      </Stack>

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="automation-handle" />
    </Card>
  );
};
