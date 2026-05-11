import React from 'react';
import { ActionIcon, Badge, Box, Group, Switch, Text, Tooltip } from '@mantine/core';
import { IconClock, IconPlayerPlay, IconDotsVertical, IconBolt } from '@tabler/icons-react';

export interface AutomationData {
  id: string;
  name: string;
  description: string;
  isScheduled: boolean;
  schedule?: string;
  isActive: boolean;
  lastRun?: string;
}

interface AutomationItemProps {
  automation: AutomationData;
  onToggleActive?: (id: string) => void;
  onRun?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const AutomationItem: React.FC<AutomationItemProps> = ({ automation, onToggleActive, onRun, onClick }) => {
  return (
    <Box
      className="automation-item"
      onClick={() => onClick?.(automation.id)}
      style={{ cursor: 'pointer' }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap" gap="sm">
        <Group gap="sm" align="flex-start" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
          <Box
            className={`automation-icon-wrapper ${automation.isActive ? 'automation-icon-active' : ''}`}
          >
            <IconBolt size={16} stroke={1.5} />
          </Box>

          <Box style={{ flex: 1, minWidth: 0 }}>
            <Group gap="xs" align="center" mb="2">
              <Text size="sm" fw={500} truncate>
                {automation.name}
              </Text>
              {automation.isScheduled ? (
                <Badge
                  size="xs"
                  variant="light"
                  color="violet"
                  leftSection={<IconClock size={10} />}
                >
                  {automation.schedule || 'Scheduled'}
                </Badge>
              ) : (
                <Badge size="xs" variant="light" color="gray">
                  Manual
                </Badge>
              )}
            </Group>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {automation.description}
            </Text>
            {automation.lastRun && (
              <Text size="xs" c="dimmed" mt="4" style={{ opacity: 0.7 }}>
                Last run: {automation.lastRun}
              </Text>
            )}
          </Box>
        </Group>

        <Group gap="6" align="center" wrap="nowrap" className="automation-item-actions">
          <Tooltip label="Run now" withArrow>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRun?.(automation.id);
              }}
            >
              <IconPlayerPlay size={14} />
            </ActionIcon>
          </Tooltip>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={(e) => e.stopPropagation()}
          >
            <IconDotsVertical size={14} />
          </ActionIcon>
          <Switch
            size="xs"
            checked={automation.isActive}
            onChange={(e) => {
              e.stopPropagation();
              onToggleActive?.(automation.id);
            }}
            color="green"
          />
        </Group>
      </Group>
    </Box>
  );
};
