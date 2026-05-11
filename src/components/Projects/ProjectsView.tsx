import React, { useState } from 'react';
import { Container, SimpleGrid, Stack } from '@mantine/core';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ProjectsHeader } from './ProjectsHeader/ProjectsHeader';
import { ProjectCard } from './ProjectCard/ProjectCard';

const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'test',
    description: 'asdfasdf',
    updatedAt: '2 days ago',
  },
  {
    id: '2',
    title: 'ty',
    description: '',
    updatedAt: 'last week',
  },
];

export const ProjectsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredProjects = MOCK_PROJECTS.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'var(--mantine-color-body)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container size="xl" py="xl" style={{ flex: 1, width: '100%' }}>
        <Stack gap="xl">
          <ProjectsHeader
            onSearchChange={setSearchQuery}
            onSortChange={(val) => console.log('Sort changed:', val)}
            onNewProject={() => console.log('New project clicked')}
          />

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="lg"
            verticalSpacing="lg"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  updatedAt={project.updatedAt}
                  onClick={() => navigate('/')}
                />
              </motion.div>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </motion.div>
  );
};
