import React from 'react';
import { Stack } from '@mantine/core';
import { ProjectConfigSection } from '../Project/ProjectConfigSection';
import { ProjectMembersPreview } from '../Project/ProjectMembersPreview';
import { ProjectOverview } from '../Project/ProjectOverview';
import { ProjectSourcesPreview } from '../Project/Sources/ProjectSourcesPreview/ProjectSourcesPreview';
import { Source, SourceGroup } from '../Project/Sources/types';

const MOCK_MEMBERS = [
  { id: '1', name: 'Ran', initials: 'R' },
  { id: '2', name: 'Alice', initials: 'A' },
  { id: '3', name: 'Bob', initials: 'B' },
  { id: '4', name: 'Charlie', initials: 'C' },
  { id: '5', name: 'David', initials: 'D' },
];

const MOCK_GROUPS: SourceGroup[] = [
  {
    id: 'group-1',
    title: 'Research Papers',
    description: 'A collection of PDFs about LLMs',
    sources: [
      { id: 's1', title: 'Attention is All You Need.pdf', description: 'Transformer architecture paper', type: 'pdf', color: 'red' },
    ]
  }
];

const MOCK_STANDALONE: Source[] = [
  { id: 's2', title: 'Project Specs.txt', description: 'Requirements document', type: 'txt', color: 'blue' },
  { id: 's3', title: 'Design Assets', description: 'Link to Figma', type: 'link', color: 'orange' },
];

const MOCK_OVERVIEW = "This project focuses on creating a high-fidelity UI clone of the Claude AI web interface using Mantine and React. It includes a multi-panel layout with a responsive sidebar, a central chat area, and a context-aware configuration panel for project management and settings.";

export const ProjectConfigPanel: React.FC = () => {
  return (
    <Stack gap="sm" h="100%">
      <ProjectConfigSection title="Members">
        <ProjectMembersPreview members={MOCK_MEMBERS} />
      </ProjectConfigSection>

      <ProjectConfigSection title="Overview">
        <ProjectOverview content={MOCK_OVERVIEW} />
      </ProjectConfigSection>

      <ProjectConfigSection title="Sources" flex={1}>
        <ProjectSourcesPreview initialGroups={MOCK_GROUPS} standaloneSources={MOCK_STANDALONE} />
      </ProjectConfigSection>
    </Stack>
  );
};
