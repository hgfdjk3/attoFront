import React, { useState } from 'react';
import { Stack, Box, Text, Group, ThemeIcon } from '@mantine/core';
import { DragDropProvider, DragOverlay, useDroppable } from '@dnd-kit/react';
import { PointerSensor } from '@dnd-kit/dom';
import { Source, SourceGroup as SourceGroupType } from '../types';
import { SourceGroup } from '../SourceGroup/SourceGroup';
import { SourceCard } from '../SourceCard/SourceCard';

import './ProjectSourcesPreview.css';

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

    if (event.canceled) return;

    const sourceId = active.id;

    // If dropped on nothing or on the standalone zone, move to standalone
    if (!over || over.id === 'standalone-zone') {
      const sourceInGroup = groups.find(g => g.sources.some(s => s.id === sourceId));
      if (sourceInGroup) {
        const movingSource = sourceInGroup.sources.find(s => s.id === sourceId)!;
        setGroups(groups.map(g =>
          g.id === sourceInGroup.id ? { ...g, sources: g.sources.filter(s => s.id !== sourceId) } : g
        ));
        setSources(prev => [...prev, movingSource]);
      }
      return;
    }

    const targetId = over.id;

    // Check if we are dropping into a group
    const targetGroup = groups.find(g => String(g.id) === String(targetId));

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
    }
  };

  const activeSource = activeId
    ? [...sources, ...groups.flatMap(g => g.sources)].find(s => s.id === activeId)
    : null;

  return (
    <DragDropProvider 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <ProjectSourcesPreviewContent
        groups={groups}
        sources={sources}
        activeSource={activeSource || null}
        isDraggingAny={!!activeId}
      />
    </DragDropProvider>
  );
};

interface ProjectSourcesPreviewContentProps {
  groups: SourceGroupType[];
  sources: Source[];
  activeSource: Source | null;
  isDraggingAny: boolean;
}

const ProjectSourcesPreviewContent: React.FC<ProjectSourcesPreviewContentProps> = ({
  groups,
  sources,
  activeSource,
  isDraggingAny
}) => {
  const { ref: createGroupRef, isDropTarget: isOverCreate } = useDroppable({ id: 'create-group' });
  const { ref: standaloneRef, isDropTarget: isOverStandalone } = useDroppable({ id: 'standalone-zone' });

  return (
    <Box className="previewRoot">
      <Stack gap="xs">
        {/* Groups */}
        {groups.map((group) => (
          <SourceGroup key={group.id} group={group} isDraggingAny={isDraggingAny} />
        ))}

        {/* Standalone Sources */}
        {sources.length > 0 && (
          <Box
            ref={standaloneRef}
            className="standaloneSourcesContainer"
            data-over={isOverStandalone || undefined}
          >
            <Stack gap="xs">
              {sources.map((source) => (
                <SourceCard key={source.id} source={source} isDraggingAny={isDraggingAny} />
              ))}
            </Stack>
          </Box>
        )}

        {groups.length === 0 && sources.length === 0 && (
          <Box className="emptyPreviewState">
            <Text size="xs" c="dimmed">
              No sources or groups yet
            </Text>
          </Box>
        )}

        {/* Create Group Zone */}
        <Box
          ref={createGroupRef}
          className="createGroupZone"
          data-over={isOverCreate || undefined}
        >
          <Group gap="xs">
            <ThemeIcon variant="light" color={isOverCreate ? 'blue' : 'gray'} size="sm">
              <Text className="createGroupIconText">+</Text>
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
