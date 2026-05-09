import React from 'react';
import { Box, Group } from '@mantine/core';
import { ChatView } from '../Chat/ChatView';
import { ProjectConfigPanel } from '../Layout/ProjectConfigPanel';

export const ProjectPanel: React.FC = () => {
  return (
    <Group h="100%" align="stretch" wrap="nowrap" gap="xs" p="0">
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatView />
      </Box>
      <Box w={{ base: '100%', md: 360, lg: 380 }} >
        <ProjectConfigPanel />
      </Box>
    </Group>
  );
};
