import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Box,
  Stack,
  Text,
  TextInput,
  ActionIcon,
  Group,
  UnstyledButton,
  ScrollArea,
  Button,
  useMantineTheme
} from '@mantine/core';
import {
  IconSearch,
  IconX,
  IconPdf,
  IconFileText,
  IconExternalLink,
  IconPlus,
  IconMessages
} from '@tabler/icons-react';
import { Source, SourceType } from '../../../Sources/types';
import { SourceCard } from '../../../Sources/SourceCard/SourceCard';

export interface GlobalSourcesSectionProps {
  globalSources: Source[];
  attachedSourceIds: string[];
  onToggleSource: (sourceId: string) => void;
  onAddGlobalToProjectAndChat?: (sourceIds: string[]) => void;
}

const TYPE_ICONS: Record<SourceType, React.ReactNode> = {
  pdf: <IconPdf size={16} />,
  txt: <IconFileText size={16} />,
  link: <IconExternalLink size={16} />,
  doc: <IconFileText size={16} />,
};

export const GlobalSourcesSection: React.FC<GlobalSourcesSectionProps> = ({
  globalSources = [],
  attachedSourceIds = [],
  onToggleSource,
  onAddGlobalToProjectAndChat,
}) => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<SourceType | 'all'>('all');

  const attachedGlobalSourceIds = useMemo(() => {
    const globalIds = globalSources.map(s => s.id);
    return attachedSourceIds.filter(id => globalIds.includes(id));
  }, [globalSources, attachedSourceIds]);

  const filteredGlobalSources = useMemo(() => {
    return globalSources.filter((source) => {
      const matchesSearch =
        source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeType === 'all' || source.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [globalSources, searchQuery, activeType]);

  const types: (SourceType | 'all')[] = ['all', 'pdf', 'txt', 'link', 'doc'];

  return (
    <motion.div
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Stack gap="sm" h="100%" style={{ borderLeft: `1px solid light-dark(${theme.colors.gray[2]}, ${theme.colors.dark[6]})`, paddingLeft: 'var(--mantine-spacing-xl)' }}>
        <Box mb="xs">
          <Text fw={600} size="md">Global Sources</Text>
          <Text size="sm" c="dimmed">Drag items to project sources</Text>
        </Box>

        <TextInput
          placeholder="Search global sources..."
          leftSection={<IconSearch size={16} stroke={1.5} />}
          rightSection={
            searchQuery && (
              <ActionIcon variant="subtle" color="gray" onClick={() => setSearchQuery('')}>
                <IconX size={14} />
              </ActionIcon>
            )
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          radius="md"
          size="sm"
          classNames={{ input: 'searchInput' }}
        />

        <Group gap="xs" style={{ overflowX: 'auto', flexWrap: 'nowrap' }}>
          {types.map((type) => (
            <UnstyledButton
              key={type}
              className={`typeFilterButton ${activeType === type ? 'active' : ''}`}
              onClick={() => setActiveType(type)}
            >
              <Group gap={6} wrap="nowrap">
                {type !== 'all' && TYPE_ICONS[type as SourceType]}
                <Text size="sm" fw={500} tt="capitalize">
                  {type}
                </Text>
              </Group>
            </UnstyledButton>
          ))}
        </Group>

        <ScrollArea h={320} offsetScrollbars scrollbars="y" mt="xs">
          <Stack gap="xs" pr="sm">
            <AnimatePresence mode="popLayout">
              {filteredGlobalSources.length > 0 ? (
                filteredGlobalSources.map((source) => (
                  <motion.div
                    key={source.id}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SourceCard
                      source={source}
                      selected={attachedSourceIds.includes(source.id)}
                      onClick={() => onToggleSource(source.id)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Box py="xl" ta="center">
                    <Text c="dimmed" size="sm">
                      No global sources found.
                    </Text>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Stack>
        </ScrollArea>

        <Box mt="auto" pt="md">
          <Text size="sm" mb="xs" c="dimmed">
            {attachedGlobalSourceIds.length > 0
              ? `Add ${attachedGlobalSourceIds.length} attached sources to:`
              : 'Select global sources to attach to chat'}
          </Text>
          <Button
            fullWidth
            variant="filled"
            size="sm"
            disabled={attachedGlobalSourceIds.length === 0}
            onClick={() => {
              onAddGlobalToProjectAndChat?.(attachedGlobalSourceIds);
            }}
          >
            Add to Project
          </Button>
        </Box>
      </Stack>
    </motion.div>
  );
};
