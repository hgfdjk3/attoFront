import React, { useState } from 'react';
import { ActionIcon, Box, Button, Group, Paper, Textarea, useMantineTheme, rem } from '@mantine/core';
import { useDroppable } from '@dnd-kit/react';
import { IconCornerDownLeft, IconEye, IconFileCode, IconPlus, IconX } from '@tabler/icons-react';
import { Source } from '../../Sources/types';
import { PromptInputSources } from './PromptInputSources';
import { PromptActions } from './PromptActions/PromptActions';

import './PromptInput.css';

export interface PromptMode {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface PromptInputProps {
  placeholder?: string;
  modes?: PromptMode[];
  onSubmit?: (value: string, modeId: string) => void;
  onValueChange?: (value: string) => void;
  onClose?: () => void;
  initialValue?: string;
  initialModeId?: string;
  submitColor?: string;
  attachedSources?: Source[];
  onAttachSource?: () => void;
  onManageAgents?: () => void;
  onDetachSource?: (sourceId: string) => void;
  emptySourcesLabel?: string;
}

const DEFAULT_MODES: PromptMode[] = [];

export const PromptInput: React.FC<PromptInputProps> = ({
  placeholder = 'What would you like to know?',
  modes = DEFAULT_MODES,
  onSubmit,
  onValueChange,
  onClose,
  initialValue = '',
  initialModeId,
  submitColor = 'blue',
  attachedSources = [],
  onAttachSource,
  onManageAgents,
  onDetachSource,
  emptySourcesLabel,
}) => {
  const [value, setValue] = useState(initialValue);
  const [activeModeId, setActiveModeId] = useState(initialModeId || modes[0]?.id || '');
  const theme = useMantineTheme();
  const { ref, isDropTarget } = useDroppable({ id: 'prompt-input-sources' });

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value, activeModeId);
      setValue('');
      onValueChange?.('');
    }
  };

  return (
    <Box maw={760} mx="auto" w="100%" px="md">
      <Paper
        ref={ref}
        withBorder
        radius="lg"
        className="promptInputRoot"
        style={{
          position: 'relative',
          border: `1px solid light-dark(${theme.colors.gray[2]}, ${theme.colors.dark[6]})`,
          borderRadius: theme.radius.lg,
          backgroundColor: `light-dark(${theme.white}, ${theme.colors.dark[8]})`,
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          className="promptInputOverlay"
          data-over={isDropTarget || undefined}
        />

        <Box p="sm" className="promptInputContent">
          <Textarea
            placeholder={placeholder}
            variant="unstyled"
            autosize
            minRows={1}
            maxRows={10}
            value={value}
            onChange={(event) => handleValueChange(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            styles={{
              input: {
                fontSize: rem(15),
                padding: 0,
                paddingRight: rem(12),
                lineHeight: 1.6,
                color: `light-dark(${theme.colors.gray[8]}, ${theme.colors.gray[2]})`,
              },
            }}
          />

          <Group justify="space-between" mt="md" align="center">
            <Group gap="3">
              <PromptActions 
                onAttachSource={onAttachSource} 
                onManageAgents={onManageAgents} 
              />

              <PromptInputSources
                attachedSources={attachedSources}
                onDetachSource={onDetachSource}
                emptySourcesLabel={emptySourcesLabel}
                isDropTarget={isDropTarget}
              />
              {modes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={activeModeId === mode.id ? 'light' : 'subtle'}
                  color={activeModeId === mode.id ? 'blue' : 'gray'}
                  size="xs"
                  leftSection={mode.icon}
                  radius="xl"
                  fw={500}
                  onClick={() => setActiveModeId(mode.id)}
                  styles={{
                    root: {
                      color: activeModeId === mode.id
                        ? theme.colors.blue[6]
                        : `light-dark(${theme.colors.gray[7]}, ${theme.colors.gray[4]})`,
                    },
                  }}
                >
                  {mode.label}
                </Button>
              ))}
            </Group>

            <Group gap="xs">
              {onClose && (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  radius="md"
                  onClick={onClose}
                  aria-label="Close prompt"
                >
                  <IconX size={18} stroke={1.5} />
                </ActionIcon>
              )}
              <ActionIcon
                variant="filled"
                color={submitColor}
                size="lg"
                radius="md"
                disabled={!value.trim()}
                onClick={handleSubmit}
                aria-label="Submit prompt"
              >
                <IconCornerDownLeft size={18} stroke={2} />
              </ActionIcon>
            </Group>
          </Group>

        </Box>
      </Paper>
    </Box>
  );
};
