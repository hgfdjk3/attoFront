import React from 'react';
import { ActionIcon, Badge, Box, Group, TextInput } from '@mantine/core';
import { IconPlus, IconMicrophone } from '@tabler/icons-react';

export const ChatInputArea: React.FC = () => {
  return (
    <Box maw={800} mx="auto" w="100%" mt="xl">
      <TextInput
        radius="xl"
        size="lg"
        placeholder="How can I help you today?"
        leftSection={
          <ActionIcon variant="subtle" color="gray" radius="xl" ml="xs">
            <IconPlus size={20} stroke={1.5} />
          </ActionIcon>
        }
        rightSectionWidth={140}
        rightSection={
          <Group gap="xs" justify="flex-end" mr="sm">
            <Badge variant="transparent" c="dimmed" size="sm" tt="none">
              Sonnet 4.6 ⌄
            </Badge>
            <ActionIcon variant="subtle" color="gray" radius="xl">
              <IconMicrophone size={20} stroke={1.5} />
            </ActionIcon>
          </Group>
        }
        styles={{
          input: {
            border: '1px solid var(--mantine-color-gray-3)',
            boxShadow: 'var(--mantine-shadow-xs)',
            paddingLeft: '50px'
          }
        }}
      />
    </Box>
  );
};
