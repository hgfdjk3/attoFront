import React from 'react';
import { Box } from '@mantine/core';
import { ChatHeader } from './ChatHeader';
import { ChatInputArea } from './ChatInputArea';

export const ChatView: React.FC = () => {
  return (
    <Box p="sm" pr="0" pt="0" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatHeader title="ty" />

      <Box style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <ChatInputArea />
      </Box>
    </Box>
  );
};
