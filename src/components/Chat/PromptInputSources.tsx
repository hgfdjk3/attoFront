import React from 'react';
import { ActionIcon, Box, Button, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Source } from '../Project/Sources/types';

export interface PromptInputSourcesProps {
  attachedSources: Source[];
  onDetachSource?: (sourceId: string) => void;
  emptySourcesLabel?: string;
  isDropTarget?: boolean;
}

export const PromptInputSources: React.FC<PromptInputSourcesProps> = ({
  attachedSources,
  onDetachSource,
  emptySourcesLabel,
  isDropTarget,
}) => {
  return (
    <Box className="promptInputSources" data-over={isDropTarget || undefined}>
      <Group gap="xs" wrap="wrap" align="center">
        {attachedSources.length > 0 ? (
          attachedSources.map((source) => (
            <Button
              key={source.id}
              size="xs"
              variant="light"
              color={source.color || 'gray'}
              radius="xl"
              rightSection={
                onDetachSource ? (
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="gray"
                    radius="xl"
                    onClick={() => onDetachSource(source.id)}
                    aria-label={`Remove ${source.title}`}
                  >
                    <IconX size={10} stroke={1.5} />
                  </ActionIcon>
                ) : undefined
              }
            >
              {source.title}
            </Button>
          ))
        ) : (
          <Button size="xs" variant="subtle" color="gray" radius="xl" disabled>
            {emptySourcesLabel}
          </Button>
        )}
      </Group>
    </Box>
  );
};
