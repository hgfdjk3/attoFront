import React from 'react';
import { Card, Group, Text, ThemeIcon, Box, UnstyledButton } from '@mantine/core';
import { IconPdf, IconFileText, IconExternalLink, IconGripVertical } from '@tabler/icons-react';
import { useDraggable } from '@dnd-kit/react';
import { Source, SourceType } from '../types';

interface SourceCardProps {
  source: Source;
  isOverlay?: boolean;
}

const getIcon = (type: SourceType) => {
  switch (type) {
    case 'pdf': return <IconPdf size={18} />;
    case 'doc': return <IconFileText size={18} />;
    case 'link': return <IconExternalLink size={18} />;
    default: return <IconFileText size={18} />;
  }
};

export const SourceCard: React.FC<SourceCardProps> = ({ source, isOverlay }) => {
  const { ref, handleRef, isDragging } = useDraggable({
    id: source.id,
    data: source,
    disabled: isOverlay,
  });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
    borderLeft: source.color ? `4px solid ${source.color}` : undefined,
    cursor: 'default',
  };

  return (
    <Card
      ref={ref}
      withBorder
      p="xs"
      radius="sm"
      style={style}
      shadow={isDragging ? 'md' : 'none'}
    >
      <Group wrap="nowrap" gap="xs">
        <Box ref={handleRef} style={{ cursor: 'grab' }}>
          <IconGripVertical size={16} color="var(--mantine-color-gray-5)" />
        </Box>

        <ThemeIcon variant="light" color={source.color || 'gray'} size="md">
          {getIcon(source.type)}
        </ThemeIcon>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text size="xs" fw={500} truncate>
            {source.title}
          </Text>
          <Text size="10px" c="dimmed" truncate>
            {source.description}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};
