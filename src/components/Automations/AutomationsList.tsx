import { Box, Stack, Text } from '@mantine/core';
import { AutomationItem, AutomationData } from './AutomationItem';

interface AutomationsListProps {
  automations: AutomationData[];
  onToggleActive?: (id: string) => void;
  onRun?: (id: string) => void;
  onAutomationClick?: (id: string) => void;
  onAdd?: () => void;
}

export const AutomationsList: React.FC<AutomationsListProps> = ({
  automations,
  onToggleActive,
  onRun,
  onAutomationClick,
  onAdd,
}) => {
  return (
    <Box className="automations-section">
      <Stack gap="2">
        {automations.length > 0 ? (
          automations.map((automation) => (
            <AutomationItem
              key={automation.id}
              automation={automation}
              onToggleActive={onToggleActive}
              onRun={onRun}
              onClick={onAutomationClick}
            />
          ))
        ) : (
          <Box py="xl" ta="center">
            <Text size="sm" c="dimmed">
              No automations yet
            </Text>
            <Text size="xs" c="dimmed" mt="xs">
              Create one to automate repetitive tasks
            </Text>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
