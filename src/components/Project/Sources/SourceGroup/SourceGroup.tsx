import React from 'react';
import { Box, Paper, Stack, Text, Group } from '@mantine/core';
import { useDroppable } from '@dnd-kit/react';
import { SourceGroup as SourceGroupType } from '../types';
import { SourceCard } from '../SourceCard/SourceCard';

interface SourceGroupProps {
  group: SourceGroupType;
}

export const SourceGroup: React.FC<SourceGroupProps> = ({ group }) => {
  const { ref, isDropTarget: isOver } = useDroppable({
    id: group.id,
    data: group,
  });

  return (
    <Paper
      ref={ref}
      withBorder
      p="sm"
      radius="md"
      bg={"var(--mantine-color-zinc-8)"}
      style={{
        borderStyle: isOver ? 'solid' : 'dashed',
        transition: 'background-color 0.2s ease',
        minHeight: '100px'
      }}
    >
      <Box mb="xs">
        <Text size="sm" fw={600}>
          {group.title}
        </Text>
        {group.description && (
          <Text size="xs" c="dimmed">
            {group.description}
          </Text>
        )}
      </Box>

      <Stack gap="xs">
        {group.sources.length > 0 ? (
          group.sources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))
        ) : (
          <Text size="xs" c="dimmed" ta="center" py="md">
            Drop sources here
          </Text>
        )}
      </Stack>
    </Paper>
  );
};
