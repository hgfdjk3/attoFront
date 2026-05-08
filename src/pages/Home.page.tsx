import React from 'react';
import { ProjectLayout } from '../components/Layout/ProjectLayout';
import { ProjectPanel } from '../components/Project/ProjectPanel';

export const HomePage: React.FC = () => {
  return (
    <ProjectLayout>
      <ProjectPanel />
    </ProjectLayout>
  );
};
