import React from 'react';
import { ActionIcon, Avatar, Badge, Box, Divider, Group, NavLink, ScrollArea, Stack, Text } from '@mantine/core';
import {
  IconMessagePlus,
  IconSearch,
  IconMessages,
  IconFolders,
  IconCode,
  IconSettings,
  IconLayoutSidebar,
  IconStarFilled,
  IconDotsVertical,
  IconDownload,
  IconLayoutDashboard,
  IconGraph
} from '@tabler/icons-react';

import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sidebar Header */}
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={700}>
          Atom
        </Text>
        <ActionIcon variant="subtle" color="gray" aria-label="Toggle Sidebar">
          <IconLayoutSidebar stroke={1.5} size={20} />
        </ActionIcon>
      </Group>

      <ScrollArea flex={1} type="hover" offsetScrollbars>
        <Stack gap="xs">
          {/* Main Links */}
          <NavLink
            label="New chat"
            leftSection={<IconMessagePlus size={18} stroke={1.5} />}
            variant="light"
          />
          <NavLink
            label="Search"
            leftSection={<IconSearch size={18} stroke={1.5} />}
            variant="light"
          />
          <NavLink
            label="Chats"
            leftSection={<IconMessages size={18} stroke={1.5} />}
            variant="light"
          />
          <NavLink
            label="Projects"
            leftSection={<IconFolders size={18} stroke={1.5} />}
            variant="light"
            component={Link}
            to="/projects"
          />
          <NavLink
            label="Knowledge Graph"
            leftSection={<IconGraph size={18} stroke={1.5} />}
            variant="light"
            component={Link}
            to="/knowledge-graph"
          />
          <NavLink
            label="Artifacts"
            leftSection={<IconLayoutDashboard size={18} stroke={1.5} />}
            variant="light"
          />
          <NavLink
            label="Code"
            leftSection={<IconCode size={18} stroke={1.5} />}
            rightSection={
              <Badge size="xs" variant="light" color="blue">
                Upgrade
              </Badge>
            }
            variant="light"
          />

          <Divider my="sm" />

          {/* Customize Link */}
          <NavLink
            label="Customize"
            leftSection={<IconSettings size={18} stroke={1.5} />}
            variant="light"
          />

          <Divider my="sm" />

          {/* Starred Section */}
          <Text size="xs" c="dimmed" fw={500} mb="xs" mt="md">
            Starred
          </Text>
          <NavLink
            label="ty"
            leftSection={<Box w={18} />}
            rightSection={
              <Group gap="xs">
                <ActionIcon size="sm" variant="subtle" color="gray">
                  <IconDotsVertical size={14} />
                </ActionIcon>
              </Group>
            }
            variant="light"
            active
          />

          <Divider my="sm" />

          {/* Recents Section */}
          <Text size="xs" c="dimmed" fw={500} mb="xs" mt="md">
            Recents
          </Text>
          <NavLink label="Untitled" variant="light" leftSection={<Box w={18} />} />
          <NavLink label="Claude app UI design with dark ..." variant="light" leftSection={<Box w={18} />} />
          <NavLink label="Claude app UI design with dark t..." variant="light" leftSection={<Box w={18} />} />
          <NavLink label="Adding more array elements" variant="light" leftSection={<Box w={18} />} />
          <NavLink label="Nebula graph with vector datab..." variant="light" leftSection={<Box w={18} />} />
          <NavLink label="Convert TypeScript array to JSON" variant="light" leftSection={<Box w={18} />} />
        </Stack>
      </ScrollArea>

      {/* User Profile Footer */}
      <Box pt="md" mt="auto">
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Avatar color="dark" radius="xl">R</Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text size="sm" fw={500} truncate>
                Ran
              </Text>
              <Text c="dimmed" size="xs" truncate>
                Free plan
              </Text>
            </div>
          </Group>
          <ActionIcon variant="subtle" color="gray">
            <IconDownload size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Box>
    </Box>
  );
};
