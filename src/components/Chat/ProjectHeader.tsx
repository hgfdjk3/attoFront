import React from 'react';
import { ActionIcon, Anchor, Group, Title } from '@mantine/core';
import { IconArrowLeft, IconDotsVertical, IconStar } from '@tabler/icons-react';

interface ProjectHeaderProps {
  title: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title }) => {
  return (
    <Group justify="space-between" align="center" mb="xl">
      <Group gap="5" align="center">
        <ActionIcon variant="subtle" color="gray" >
          <IconArrowLeft size={20} />
        </ActionIcon>
        <Anchor size="md" c="dimmed" href="#" underline="never">
          All projects
        </Anchor>
        <Group style={{ flex: 1 }} ml="5" align='stretch' >
          <Title order={4} fw={500}>{title}</Title>
        </Group>
      </Group>


      <Group gap="5">
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
