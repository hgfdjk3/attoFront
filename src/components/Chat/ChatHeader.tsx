import React from 'react';
import { ActionIcon, Anchor, Group, Title } from '@mantine/core';
import { IconArrowLeft, IconDotsVertical, IconStar } from '@tabler/icons-react';

interface ChatHeaderProps {
  title: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <Group justify="space-between" align="flex-start" mb="xl">
      <Group gap="xs" align="center">
        <ActionIcon variant="subtle" color="gray" size="sm">
          <IconArrowLeft size={16} />
        </ActionIcon>
        <Anchor size="sm" c="dimmed" href="#" underline="never">
          All projects
        </Anchor>
      </Group>

      <Group style={{ flex: 1 }} ml="xl">
         <Title order={2} fw={500}>{title}</Title>
      </Group>

      <Group gap="xs">
        <ActionIcon variant="subtle" color="gray">
          <IconDotsVertical size={20} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="gray">
          <IconStar size={20} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  );
};
