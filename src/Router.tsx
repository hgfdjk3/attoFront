import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { KnowledgeGraphPage } from './pages/KnowledgeGraph.page';
import { HomePage } from './pages/Home.page';
import { AutomationsPage } from './pages/Automations.page';

import { NewProjectPage } from './pages/NewProject.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/projects',
    element: <HomePage />,
  },
  {
    path: '/new_project',
    element: <NewProjectPage />,
  },
  {
    path: '/knowledge-graph',
    element: <KnowledgeGraphPage />,
  },
  {
    path: '/automations',
    element: <AutomationsPage />,
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
