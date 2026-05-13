import React from 'react';
import {
  Modal,
  Text,
  Grid,
} from '@mantine/core';
import { useDroppable } from '@dnd-kit/react';
import { Source, SourceGroup as SourceGroupType } from '../../../Sources/types';
import { ProjectSourcesSection } from './ProjectSourcesSection';
import { GlobalSourcesSection } from './GlobalSourcesSection';

import './ManageSourcesModal.css';

export interface ManageSourcesModalProps {
  opened: boolean;
  onClose: () => void;
  standaloneSources: Source[];
  groups: SourceGroupType[];
  globalSources: Source[];
  attachedSourceIds: string[];
  onToggleSource: (sourceId: string) => void;
  onAddGlobalToChat?: (sourceIds: string[]) => void;
  onAddGlobalToProjectAndChat?: (sourceIds: string[]) => void;
}

export const ManageSourcesModal: React.FC<ManageSourcesModalProps> = ({
  opened,
  onClose,
  standaloneSources = [],
  groups = [],
  globalSources = [],
  attachedSourceIds = [],
  onToggleSource,
  onAddGlobalToChat,
  onAddGlobalToProjectAndChat,
}) => {
  const { ref: projectSourcesRef, isDropTarget: isOverProjectSources } = useDroppable({
    id: 'project-sources-zone',
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg">
          Manage Sources
        </Text>
      }
      size="1000px"
      radius="md"
      classNames={{
        header: 'manageSourcesHeader',
        body: 'manageSourcesBody',
      }}
    >
      <Grid>
        <Grid.Col span={6}>
          <ProjectSourcesSection 
            standaloneSources={standaloneSources}
            groups={groups}
            attachedSourceIds={attachedSourceIds}
            onToggleSource={onToggleSource}
            dropRef={projectSourcesRef}
            isOver={isOverProjectSources}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <GlobalSourcesSection 
            globalSources={globalSources}
            attachedSourceIds={attachedSourceIds}
            onToggleSource={onToggleSource}
            onAddGlobalToProjectAndChat={onAddGlobalToProjectAndChat}
          />
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
