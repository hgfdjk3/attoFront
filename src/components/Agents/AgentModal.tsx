import React from 'react';
import { Modal, Text, Group, Button, Badge, ThemeIcon, Stack, Box, Title, SimpleGrid, Divider } from '@mantine/core';
import { motion, AnimatePresence } from 'motion/react';
import { IconDatabase, IconTool } from '@tabler/icons-react';
import { AgentInfo } from '../../utils/agentUtils';
import './AgentModal.css';

interface AgentModalProps {
  agent: AgentInfo | null;
  status: 'enabled' | 'disabled';
  opened: boolean;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({
  agent,
  status,
  opened,
  onClose,
  onToggleStatus
}) => {
  if (!agent) return null;

  const isEnabled = status === 'enabled';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      size="md"
      centered
      radius="xl"
      padding={0}
      className="agent-modal"
    >
      <Box style={{ '--agent-modal-brand-color': agent.brandColor } as React.CSSProperties}>
        <Group justify='space-between' align='center' className="agent-modal-hero" gap="xl">
          <Stack gap={4} style={{ flex: 1 }}>
            <Title
              order={2}
              className="agent-modal-title"
              style={{ marginBottom: 0, textAlign: 'left' }}
            >
              {agent.name}
            </Title>
            <Group gap={6}>
              <Text size="xs" fw={700} c="zinc.5" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Verified
              </Text>
              <Divider orientation="vertical" h={10} color="zinc.7" />
              <Text size="xs" fw={600} c="zinc.4">
                by {agent.developer}
              </Text>
            </Group>
          </Stack>

          <div className="agent-modal-icon-wrapper">
            <motion.div
              className="agent-modal-icon-aura"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="agent-modal-icon-inner">
              {React.cloneElement(agent.icon as React.ReactElement<any>, { size: 32, stroke: 1.5 })}
            </div>
          </div>
        </Group>

        <Stack gap="xl" px="xl" py="xl">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Stack gap={8}>
              <Text fw={700} size="xs" c="zinc.5" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Description
              </Text>
              <Text size="sm" c="zinc.3" lh={1.6}>
                {agent.description}
              </Text>
            </Stack>
          </motion.div>

          <SimpleGrid cols={2} spacing="md">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="agent-modal-section"
            >
              <Group justify="space-between" mb="sm">
                <Group gap={8}>
                  <ThemeIcon size={20} radius="sm" variant="light" color="zinc.8">
                    <IconDatabase size={12} stroke={2} />
                  </ThemeIcon>
                  <Text fw={700} size="xs" c="zinc.5" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Sources
                  </Text>
                </Group>
                <Text fw={800} size="xs" c="zinc.4" bg="zinc.8" px={6} py={2} style={{ borderRadius: 4 }}>
                  {agent.sourcesAdded.length.toString().padStart(2, '0')}
                </Text>
              </Group>
              <Group gap={4}>
                {agent.sourcesAdded.map(source => (
                  <Badge key={source} variant="outline" color="zinc.8" radius="sm" size="xs" c="zinc.3" fw={500} style={{ borderStyle: 'dashed' }}>
                    {source}
                  </Badge>
                ))}
              </Group>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="agent-modal-section"
            >
              <Group justify="space-between" mb="sm">
                <Group gap={8}>
                  <ThemeIcon size={20} radius="sm" variant="light" color="zinc.8">
                    <IconTool size={12} stroke={2} />
                  </ThemeIcon>
                  <Text fw={700} size="xs" c="zinc.5" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tools
                  </Text>
                </Group>
                <Text fw={800} size="xs" c="zinc.4" bg="zinc.8" px={6} py={2} style={{ borderRadius: 4 }}>
                  {agent.toolsEnabled.length.toString().padStart(2, '0')}
                </Text>
              </Group>
              <Group gap={4}>
                {agent.toolsEnabled.map(tool => (
                  <Badge key={tool} variant="light" color="zinc.8" radius="sm" size="xs" c="zinc.4" fw={500}>
                    {tool}
                  </Badge>
                ))}
              </Group>
            </motion.div>
          </SimpleGrid>

          <Stack gap="sm" mt="sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                fullWidth
                variant={isEnabled ? "light" : "filled"}
                color={isEnabled ? "red.9" : "dark"}
                className="agent-modal-button"
                radius="md"
                size="md"
                style={!isEnabled ? {
                  background: `linear-gradient(135deg, ${agent.brandColor}, color-mix(in srgb, ${agent.brandColor}, black 30%))`,
                  border: 0,
                  height: 48
                } : { height: 48 }}
                onClick={() => {
                  onToggleStatus(agent.id);
                  onClose();
                }}
              >
                {isEnabled ? "Disable Connector" : "Enable Connector"}
              </Button>
            </motion.div>

            <Button variant="subtle" color="zinc.5" fullWidth size="xs" onClick={onClose} fw={500}>
              Dismiss
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

