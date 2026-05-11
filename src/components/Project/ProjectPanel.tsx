import React from 'react';
import { Box, Group } from '@mantine/core';
import { DragDropProvider } from '@dnd-kit/react';
import { PointerSensor } from '@dnd-kit/dom';
import { ChatView } from './Chat/ChatView';
import { ProjectConfigPanel } from '../Layout/ProjectConfigPanel';
import { Source, SourceGroup } from './Sources/types';

const MOCK_GROUPS: SourceGroup[] = [
  {
    id: 'group-1',
    title: 'Research Papers',
    description: 'A collection of PDFs about LLMs',
    sources: [
      { id: 's1', title: 'Attention is All You Need.pdf', description: 'Transformer architecture paper', type: 'pdf', color: 'red' },
    ]
  }
];

const MOCK_STANDALONE: Source[] = [
  { id: 's2', title: 'Project Specs.txt', description: 'Requirements document', type: 'txt', color: 'blue' },
  { id: 's3', title: 'Design Assets', description: 'Link to Figma', type: 'link', color: 'orange' },
  { id: 's4', title: 'Design Assets', description: 'Link to Figma', type: 'link', color: 'green' },
];

export const ProjectPanel: React.FC = () => {
  const [groups, setGroups] = React.useState<SourceGroup[]>(MOCK_GROUPS);
  const [sources, setSources] = React.useState<Source[]>(MOCK_STANDALONE);
  const [attachedSourceIds, setAttachedSourceIds] = React.useState<string[]>([]);
  const [activeSourceId, setActiveSourceId] = React.useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveSourceId(String(event.operation.source?.id ?? ''));
  };

  const handleDragEnd = (event: any) => {
    const { source: active, target: over } = event.operation;
    setActiveSourceId(null);
    if (event.canceled) return;

    const sourceId = String(active?.id ?? '');
    const targetId = over?.id ? String(over.id) : null;

    if (!sourceId) {
      return;
    }

    if (targetId === 'prompt-input-sources') {
      setAttachedSourceIds((current) => (current.includes(sourceId) ? current : [...current, sourceId]));
      return;
    }

    if (!targetId || targetId === 'standalone-zone') {
      const sourceInGroup = groups.find((group) => group.sources.some((source) => source.id === sourceId));
      if (!sourceInGroup) return;

      const movingSource = sourceInGroup.sources.find((source) => source.id === sourceId);
      if (!movingSource) return;

      setGroups((currentGroups) =>
        currentGroups.map((group) =>
          group.id === sourceInGroup.id
            ? { ...group, sources: group.sources.filter((source) => source.id !== sourceId) }
            : group
        )
      );
      setSources((currentSources) => [...currentSources, movingSource]);
      return;
    }

    const targetGroup = groups.find((group) => String(group.id) === targetId);
    if (targetGroup) {
      const sourceInStandalone = sources.find((source) => source.id === sourceId);
      const sourceInOtherGroup = groups.find((group) => group.sources.some((source) => source.id === sourceId));
      const movingSource = sourceInStandalone || sourceInOtherGroup?.sources.find((source) => source.id === sourceId);

      if (!movingSource) return;

      if (sourceInStandalone) {
        setSources((currentSources) => currentSources.filter((source) => source.id !== sourceId));
        setGroups((currentGroups) =>
          currentGroups.map((group) =>
            group.id === targetGroup.id
              ? { ...group, sources: [...group.sources, movingSource] }
              : group
          )
        );
        return;
      }

      if (sourceInOtherGroup && sourceInOtherGroup.id !== targetGroup.id) {
        setGroups((currentGroups) =>
          currentGroups.map((group) => {
            if (group.id === sourceInOtherGroup.id) {
              return { ...group, sources: group.sources.filter((source) => source.id !== sourceId) };
            }
            if (group.id === targetGroup.id) {
              return { ...group, sources: [...group.sources, movingSource] };
            }
            return group;
          })
        );
      }
    } else if (targetId === 'create-group') {
      const sourceInStandalone = sources.find((source) => source.id === sourceId);
      const sourceInOtherGroup = groups.find((group) => group.sources.some((source) => source.id === sourceId));
      const movingSource = sourceInStandalone || sourceInOtherGroup?.sources.find((source) => source.id === sourceId);

      if (!movingSource) return;

      const newGroup: SourceGroup = {
        id: `group-${Date.now()}`,
        title: `New Group ${groups.length + 1}`,
        sources: [movingSource],
      };

      if (sourceInStandalone) {
        setSources((currentSources) => currentSources.filter((source) => source.id !== sourceId));
      } else if (sourceInOtherGroup) {
        setGroups((currentGroups) =>
          currentGroups.map((group) =>
            group.id === sourceInOtherGroup.id
              ? { ...group, sources: group.sources.filter((source) => source.id !== sourceId) }
              : group
          )
        );
      }

      setGroups((currentGroups) => [...currentGroups, newGroup]);
    }
  };

  const allSources = [...sources, ...groups.flatMap((group) => group.sources)];

  return (
    <DragDropProvider sensors={[PointerSensor]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Group h="100%" align="stretch" wrap="nowrap" gap="xs" p="0">
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ChatView
            sources={allSources}
            attachedSourceIds={attachedSourceIds}
            onDetachSource={(sourceId) => setAttachedSourceIds((current) => current.filter((id) => id !== sourceId))}
          />
        </Box>
        <Box w={{ base: '100%', md: 360, lg: 380 }} >
          <ProjectConfigPanel
            groups={groups}
            standaloneSources={sources}
            activeSourceId={activeSourceId}
          />
        </Box>
      </Group>
    </DragDropProvider>
  );
};
