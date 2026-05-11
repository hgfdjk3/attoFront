import React from 'react';
import { Paper, Text, Stack } from '@mantine/core';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  updatedAt: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  updatedAt,
  onClick
}) => {
  return (
    <Paper
      className="project-card"
      p="xl"
      radius="md"
      withBorder
      onClick={onClick}
    >
      <Stack gap="xs">
        <Text fw={700} size="lg" className="project-card-title">{title}</Text>
        <Text size="sm" c="dimmed" className="project-card-description">{description}</Text>
        <Text size="xs" c="dimmed" mt="md" className="project-card-footer">
          Updated {updatedAt}
        </Text>
      </Stack>
    </Paper>
  );
};
