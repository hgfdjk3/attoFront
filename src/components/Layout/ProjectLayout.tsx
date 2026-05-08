import React, { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Sidebar } from './Sidebar';

interface ProjectLayoutProps {
  children: ReactNode;
}

export const ProjectLayout: React.FC<ProjectLayoutProps> = ({ children }) => {
  return (
    <AppShell
      navbar={{ width: 260, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main h="100vh" style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
