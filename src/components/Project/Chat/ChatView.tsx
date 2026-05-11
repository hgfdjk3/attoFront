import React, { useState } from 'react';
import { ActionIcon, Box, Group, Stack, Text, Tooltip } from '@mantine/core';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectHeader } from '../ProjectHeader';
import { ProjectDashboard } from '../ProjectDashboard';
import { PromptInput } from './PromptInput';
import { Source } from '../Sources/types';
import { ChatItemData } from './ChatItem';
import { AutomationData } from '../../Automations/AutomationItem';
import { MarkdownResponse } from './MarkdownResponse';
import { useChatStream } from '../../../hooks/useChatStream';
import '../ProjectDashboard.css';

const MOCK_CHATS: ChatItemData[] = [
  { id: 'c1', title: 'Optimizing vector embeddings', preview: 'We discussed chunking strategies and how to improve retrieval accuracy with hybrid search...', timestamp: '2h ago', isSaved: true },
  { id: 'c2', title: 'API rate-limit architecture', preview: 'Designed a token-bucket approach with Redis for the ingestion pipeline...', timestamp: '5h ago', isSaved: false },
  { id: 'c3', title: 'Database schema migration', preview: 'Planned the migration from MongoDB to PostgreSQL with zero downtime...', timestamp: 'Yesterday', isSaved: true },
  { id: 'c4', title: 'React component refactor', preview: 'Broke down the monolithic dashboard into composable widgets...', timestamp: 'Yesterday', isSaved: false },
  { id: 'c5', title: 'CI/CD pipeline review', preview: 'Reviewed GitHub Actions workflows and added caching for faster builds...', timestamp: '2 days ago', isSaved: false },
];

const MOCK_AUTOMATIONS: AutomationData[] = [
  { id: 'a1', name: 'Daily status digest', description: 'Summarizes all project activity and sends a report to Slack', isScheduled: true, schedule: 'Every day 9:00 AM', isActive: true, lastRun: '2h ago' },
  { id: 'a2', name: 'PR review assistant', description: 'Automatically reviews new pull requests and leaves comments', isScheduled: false, isActive: true, lastRun: '30m ago' },
  { id: 'a3', name: 'Knowledge base sync', description: 'Syncs updated documents from Confluence into project sources', isScheduled: true, schedule: 'Every 6 hours', isActive: false, lastRun: '1 day ago' },
  { id: 'a4', name: 'Bug triage', description: 'Classifies and prioritizes incoming bug reports from Jira', isScheduled: false, isActive: true },
];

interface ChatViewProps {
  sources: Source[];
  attachedSourceIds: string[];
  onDetachSource: (sourceId: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ sources, attachedSourceIds, onDetachSource }) => {
  const [chats, setChats] = useState<ChatItemData[]>(MOCK_CHATS);
  const [automations, setAutomations] = useState<AutomationData[]>(MOCK_AUTOMATIONS);

  const { mutate, streamedContent, isPending, data } = useChatStream();

  const handleToggleSave = (id: string) => {
    setChats((current) =>
      current.map((chat) =>
        chat.id === id ? { ...chat, isSaved: !chat.isSaved } : chat
      )
    );
  };

  const handleToggleAutomationActive = (id: string) => {
    setAutomations((current) =>
      current.map((automation) =>
        automation.id === id ? { ...automation, isActive: !automation.isActive } : automation
      )
    );
  };

  const showMarkdownResponse = isPending || streamedContent || data;

  return (
    <Box p="sm" pr="0" pt="0" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
      <ProjectHeader title="Operation Grandma" />

      <Box className="chat-scroll-container" style={{ flex: 1, minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {showMarkdownResponse ? (
            <motion.div
              key="markdown-response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ height: '100%' }}
            >
              <MarkdownResponse content={streamedContent || data || ''} />
            </motion.div>
          ) : (
            <motion.div
              key="project-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ height: '100%' }}
            >
              <ProjectDashboard
                chats={chats}
                automations={automations}
                onToggleChatSave={handleToggleSave}
                onToggleAutomationActive={handleToggleAutomationActive}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Masking Gradient at the bottom */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          background: 'linear-gradient(to top, var(--mantine-color-body) 30%, transparent)',
          pointerEvents: 'none',
          zIndex: 90,
        }}
      />

      {/* Floating Input Island */}
      <Box
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 820,
          zIndex: 100,
          padding: '0 20px',
        }}
      >
        <PromptInput
          initialValue=""
          onSubmit={(value) => {
            mutate(value);
          }}
          attachedSources={sources.filter((source) => attachedSourceIds.includes(source.id))}
          onDetachSource={onDetachSource}
          emptySourcesLabel="Project Sources"
        />
      </Box>
    </Box>
  );
};
