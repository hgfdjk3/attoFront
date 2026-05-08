import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { shadcnCssVariableResolver } from "./cssVariablesResolver";
import "./style.css";

export const App: React.FC = () => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={shadcnCssVariableResolver}>
      <Router />
    </MantineProvider>
  );
};
