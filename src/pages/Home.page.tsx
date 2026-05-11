import React from 'react';
import { Box } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectLayout } from '../components/Layout/ProjectLayout';
import { ProjectPanel } from '../components/Project/ProjectPanel';
import { ProjectsView } from '../components/Projects/ProjectsView';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const isProjectsRoute = location.pathname === '/projects';

  return (
    <ProjectLayout>
      <Box style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {isProjectsRoute ? (
            <ProjectsView key="projects-view" />
          ) : (
            <motion.div
              key="project-panel"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <ProjectPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ProjectLayout>
  );
};
