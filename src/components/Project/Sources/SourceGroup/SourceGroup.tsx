import React, { useState } from 'react';
import { Box, Paper, Stack, Text, Group, ActionIcon, ThemeIcon } from '@mantine/core';
import { IconChevronDown, IconPdf, IconFileText, IconExternalLink } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDroppable } from '@dnd-kit/react';
import { SourceGroup as SourceGroupType, SourceType } from '../types';
import { SourceCard } from '../SourceCard/SourceCard';

interface SourceGroupProps {
  group: SourceGroupType;
}

const getIcon = (type: SourceType) => {
  switch (type) {
    case 'pdf': return <IconPdf size={14} />;
    case 'doc': return <IconFileText size={14} />;
    case 'link': return <IconExternalLink size={14} />;
    default: return <IconFileText size={14} />;
  }
};

export const SourceGroup: React.FC<SourceGroupProps> = ({ group }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { ref, isDropTarget: isOver } = useDroppable({
    id: group.id,
    data: group,
  });

  const summary = group.sources.reduce((acc, source) => {
    const key = `${source.type}-${source.color || 'gray'}`;
    if (!acc[key]) {
      acc[key] = { type: source.type, color: source.color || 'gray', count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { type: SourceType; color: string; count: number }>);

  const summaryItems = Object.values(summary);

  return (
    <Paper
      ref={ref}
      withBorder
      p="xs"
      radius="md"
      bg={"var(--mantine-color-zinc-8)"}
      style={{
        borderStyle: isOver ? 'solid' : 'dashed',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Group justify="space-between" align="flex-start" mb={isExpanded ? 'xs' : 0} wrap="nowrap">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" fw={600} truncate>
            {group.title}
          </Text>

          {isExpanded ? (
            group.description && (
              <Text size="xs" c="dimmed" truncate>
                {group.description}
              </Text>
            )
          ) : (
            <Group gap="xs" mt="4px" wrap="nowrap">
              {summaryItems.length > 0 ? (
                summaryItems.map((item, index) => (
                  <Group key={`${item.type}-${item.color}-${index}`} gap="4px" wrap="nowrap">
                    <ThemeIcon
                      variant="light"
                      color={item.color}
                      size="xs"
                      radius="xs"
                    >
                      {getIcon(item.type)}
                    </ThemeIcon>
                    <Text size="10px" c="dimmed" fw={600}>
                      {item.count}
                    </Text>
                  </Group>
                ))
              ) : (
                <Text size="10px" c="dimmed">Empty group</Text>
              )}
            </Group>
          )}
        </Box>


        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          <IconChevronDown size={14} />
        </ActionIcon>
      </Group>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Stack gap="5" >
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
          </motion.div>
        )}
      </AnimatePresence>
    </Paper>
  );
};



