import React from 'react';
import { Group, Text, ThemeIcon, ActionIcon } from '@mantine/core';
import { IconTool, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export interface AutomationNodeToolsProps {
  tools: string[];
  expanded: boolean;
  onToggle: () => void;
}

export const AutomationNodeTools: React.FC<AutomationNodeToolsProps> = ({ 
  tools, 
  expanded, 
  onToggle 
}) => {
  if (!tools || tools.length === 0) return null;

  return (
    <Group justify="space-between" align="center" mt="xs">
      <Group gap={8}>
        <Text size="xs" c="dimmed">Tools:</Text>
        <Group gap="3px" wrap="nowrap">
          <Text size="xs" c="dimmed" fw={600}>
            {tools.length}
          </Text>
          <ThemeIcon
            variant="light"
            color="blue"
            size="xs"
            radius="xs"
          >
            <IconTool size={14} />
          </ThemeIcon>
        </Group>
      </Group>

      <ActionIcon
        variant="subtle"
        size="sm"
        className="nodrag"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        c="dimmed"
      >
        {expanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
      </ActionIcon>
    </Group>
  );
};

