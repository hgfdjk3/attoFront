import React from 'react';
import { ActionIcon, Avatar, Box, Group, NavLink, Stack, Text } from '@mantine/core';
import {
  IconMessagePlus,
  IconFolders,
  IconGraph,
  IconLayoutSidebar,
  IconSettings,
  IconRobot,
  IconPlug,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'New Chat', icon: IconMessagePlus, link: '/' },
  { label: 'Projects', icon: IconFolders, link: '/projects' },
  { label: 'Knowledge Graph', icon: IconGraph, link: '/knowledge-graph' },
  { label: 'Automations', icon: IconRobot, link: '/automations' },
  { label: 'Connectors', icon: IconPlug, link: '/agents' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0' }}>
      {/* Sidebar Header */}
      <Group justify="space-between" mb="xl" mt="xs">
        <Text size="lg" fw={800} style={{ letterSpacing: '-0.5px' }}>
          Atom.
        </Text>
        <ActionIcon variant="subtle" color="gray" aria-label="Toggle Sidebar">
          <IconLayoutSidebar stroke={1.5} size={20} />
        </ActionIcon>
      </Group>

      {/* Main Navigation */}
      <Stack gap={4} flex={1}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            component={Link}
            to={item.link}
            label={<Text size="sm" fw={500}>{item.label}</Text>}
            leftSection={<item.icon size={18} stroke={1.5} />}
            active={location.pathname === item.link}
            variant="light"
            h={36}
            style={{
              borderRadius: 'var(--mantine-radius-md)',
            }}
          />
        ))}
      </Stack>

      {/* Footer Section */}
      <Stack gap="sm">
        <NavLink
          label={<Text size="sm" fw={500}>Settings</Text>}
          leftSection={<IconSettings size={18} stroke={1.5} />}
          variant="subtle"
          h={36}
          style={{ borderRadius: 'var(--mantine-radius-md)' }}
        />

        <Box
          p="xs"
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: 'var(--mantine-color-default-hover)',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          <Group wrap="nowrap" gap="sm">
            <Avatar color="dark" radius="md" size="sm">R</Avatar>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text size="sm" fw={600} truncate lh={1.2}>Ran</Text>
              <Text c="dimmed" size="xs" truncate lh={1.2}>Free plan</Text>
            </Box>
          </Group>
        </Box>
      </Stack>
    </Box>
  );
};
