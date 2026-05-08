import React, { useState } from 'react';
import { Stack, Box, Text, Group, ThemeIcon } from '@mantine/core';
import { DragDropProvider, DragOverlay, useDroppable } from '@dnd-kit/react';
import { PointerSensor } from '@dnd-kit/dom';
import { Source, SourceGroup as SourceGroupType } from '../types';
import { SourceGroup } from '../SourceGroup/SourceGroup';
import { SourceCard } from '../SourceCard/SourceCard';

interface ProjectSourcesPreviewProps {
  initialGroups: SourceGroupType[];
  standaloneSources: Source[];
}

export const ProjectSourcesPreview: React.FC<ProjectSourcesPreviewProps> = ({
  initialGroups,
  standaloneSources
}) => {
  const [groups, setGroups] = useState<SourceGroupType[]>(initialGroups);
  const [sources, setSources] = useState<Source[]>(standaloneSources);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = [PointerSensor];

  const handleDragStart = (event: any) => {
    setActiveId(event.operation.source?.id || null);
  };

  const handleDragEnd = (event: any) => {
    const { source: active, target: over } = event.operation;
    setActiveId(null);

    if (event.canceled || !over) return;

    const sourceId = active.id;
    const targetId = over.id;

    // Check if we are dropping into a group
    const targetGroup = groups.find(g => g.id === targetId);

    if (targetGroup) {
      // Find where the source is currently
      const sourceInStandalone = sources.find(s => s.id === sourceId);
      const sourceInOtherGroup = groups.find(g => g.sources.some(s => s.id === sourceId));

      if (sourceInStandalone) {
        // Move from standalone to group
        setSources(sources.filter(s => s.id !== sourceId));
        setGroups(groups.map(g =>
          g.id === targetId ? { ...g, sources: [...g.sources, sourceInStandalone] } : g
        ));
      } else if (sourceInOtherGroup && sourceInOtherGroup.id !== targetId) {
        // Move from one group to another
        const movingSource = sourceInOtherGroup.sources.find(s => s.id === sourceId)!;
        setGroups(groups.map(g => {
          if (g.id === sourceInOtherGroup.id) {
            return { ...g, sources: g.sources.filter(s => s.id !== sourceId) };
          }
          if (g.id === targetId) {
            return { ...g, sources: [...g.sources, movingSource] };
          }
          return g;
        }));
      }
    } else if (targetId === 'create-group') {
      // Create a new group
      const sourceInStandalone = sources.find(s => s.id === sourceId);
      const sourceInOtherGroup = groups.find(g => g.sources.some(s => s.id === sourceId));
      const movingSource = sourceInStandalone || sourceInOtherGroup?.sources.find(s => s.id === sourceId);

      if (movingSource) {
        const newGroupId = `group-${Date.now()}`;
        const newGroup: SourceGroupType = {
          id: newGroupId,
          title: `New Group ${groups.length + 1}`,
          sources: [movingSource]
        };

        if (sourceInStandalone) {
          setSources(sources.filter(s => s.id !== sourceId));
        } else if (sourceInOtherGroup) {
          setGroups(groups.map(g =>
            g.id === sourceInOtherGroup.id ? { ...g, sources: g.sources.filter(s => s.id !== sourceId) } : g
          ));
        }
        setGroups(prev => [...prev, newGroup]);
      }
    } else if (targetId === 'preview-root' || targetId === 'standalone-sources') {
      // Move to standalone
      const sourceInGroup = groups.find(g => g.sources.some(s => s.id === sourceId));
      if (sourceInGroup) {
        const movingSource = sourceInGroup.sources.find(s => s.id === sourceId)!;
        setGroups(groups.map(g =>
          g.id === sourceInGroup.id ? { ...g, sources: g.sources.filter(s => s.id !== sourceId) } : g
        ));
        setSources(prev => [...prev, movingSource]);
      }
    }
  };

  const activeSource = activeId
    ? [...sources, ...groups.flatMap(g => g.sources)].find(s => s.id === activeId)
    : null;

  return (
    <DragDropProvider sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ProjectSourcesPreviewContent
        groups={groups}
        sources={sources}
        activeSource={activeSource || null}
      />
    </DragDropProvider>
  );
};

interface ProjectSourcesPreviewContentProps {
  groups: SourceGroupType[];
  sources: Source[];
  activeSource: Source | null;
}

const ProjectSourcesPreviewContent: React.FC<ProjectSourcesPreviewContentProps> = ({
  groups,
  sources,
  activeSource
}) => {
  const { ref: rootRef } = useDroppable({ id: 'preview-root' });
  const { ref: createGroupRef, isDropTarget: isOverCreate } = useDroppable({ id: 'create-group' });
  const { ref: standaloneRef, isDropTarget: isOverStandalone } = useDroppable({ id: 'standalone-sources' });

  return (
    <Box ref={rootRef} style={{ minHeight: '300px' }}>
      <Stack gap="xs">
        {/* Unified Stack for Groups and Standalone Sources */}
        <Box
          ref={standaloneRef}
          bg={isOverStandalone ? 'var(--mantine-color-zinc-9)' : 'transparent'}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            border: `1px solid ${isOverStandalone ? 'var(--mantine-color-zinc-7)' : 'transparent'}`,
            transition: 'all 0.2s ease'
          }}
        >
          <Stack gap="xs">
            {/* Groups */}
            {groups.map((group) => (
              <SourceGroup key={group.id} group={group} />
            ))}

            {/* Standalone Sources */}
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}

            {groups.length === 0 && sources.length === 0 && (
              <Box
                bg="var(--mantine-color-zinc-8)"
                style={{
                  borderRadius: 'var(--mantine-radius-md)',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed var(--mantine-color-zinc-7)'
                }}
              >
                <Text size="xs" c="dimmed">
                  No sources or groups yet
                </Text>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Create Group Zone */}
        <Box
          ref={createGroupRef}
          bg={isOverCreate ? 'var(--mantine-color-blue-0)' : 'transparent'}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px dashed ${isOverCreate ? 'var(--mantine-color-blue-5)' : 'var(--mantine-color-gray-3)'}`,
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <Group gap="xs">
            <ThemeIcon variant="light" color={isOverCreate ? 'blue' : 'gray'} size="sm">
              <Text size="xs" fw={700}>+</Text>
            </ThemeIcon>
            <Text size="xs" fw={500} c={isOverCreate ? 'blue' : 'dimmed'}>
              Drop here to create new group
            </Text>
          </Group>
        </Box>
      </Stack>


      <DragOverlay>
        {activeSource ? <SourceCard source={activeSource} isOverlay /> : null}
      </DragOverlay>
    </Box>
  );
};

