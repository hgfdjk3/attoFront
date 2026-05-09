import React from 'react';
import { Box } from '@mantine/core';
import { ChatHeader } from './ChatHeader';
import { PromptInput } from './PromptInput';
import { Source } from '../Project/Sources/types';

interface ChatViewProps {
  sources: Source[];
  attachedSourceIds: string[];
  onDetachSource: (sourceId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ sources, attachedSourceIds, onDetachSource }) => {
  return (
    <Box p="sm" pr="0" pt="0" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatHeader title="ty" />

      <Box style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <PromptInput
          initialValue=""
          onSubmit={() => {
            return;
          }}
          attachedSources={sources.filter((source) => attachedSourceIds.includes(source.id))}
          onDetachSource={onDetachSource}
          emptySourcesLabel="Project Sources"
        />
      </Box>
    </Box>
  );
};
