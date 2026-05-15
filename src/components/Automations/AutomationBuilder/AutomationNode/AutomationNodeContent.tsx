import React from 'react';
import { Text, Group, Badge } from '@mantine/core';

interface AutomationNodeContentProps {
  description: string;
  tools?: string[];
}

export const AutomationNodeContent: React.FC<AutomationNodeContentProps> = ({
  description,
  tools,
}) => {
  return (
    <>
      <Text size="sm" lineClamp={2} className="automation-node-description">
        {description}
      </Text>

      {tools && tools.length > 0 && (
        <Group gap={6} mt={4}>
          {tools.map((tool, index) => (
            <Badge 
              key={index} 
              variant="dot" 
              size="xs" 
              color="blue"
              styles={{ label: { textTransform: 'none', fontWeight: 500 } }}
            >
              {tool}
            </Badge>
          ))}
        </Group>
      )}
    </>
  );
};
