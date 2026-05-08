import React, { useState } from 'react';
import { Menu, ActionIcon, rem } from '@mantine/core';
import { IconDotsVertical, IconExternalLink, IconTrash, IconPencil } from '@tabler/icons-react';

interface SourceCardMenuProps {
  onGoToSource?: () => void;
  onRemove?: () => void;
  onRename?: () => void;
  visible?: boolean;
}

export const SourceCardMenu: React.FC<SourceCardMenuProps> = ({
  onGoToSource,
  onRemove,
  onRename,
  visible
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu 
      shadow="md" 
      width={160} 
      position="bottom-end" 
      withinPortal
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <ActionIcon 
          variant="subtle" 
          color="gray" 
          size="sm" 
          style={{ 
            opacity: visible || opened ? 1 : 0,
            transition: 'opacity 0.2s ease',
            pointerEvents: visible || opened ? 'auto' : 'none'
          }}
        >
          <IconDotsVertical style={{ width: rem(14), height: rem(14) }} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item 
          leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />} 
          onClick={(e) => { e.stopPropagation(); onGoToSource?.(); }}
        >
          Go to source
        </Menu.Item>
        <Menu.Item 
          leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />} 
          onClick={(e) => { e.stopPropagation(); onRename?.(); }}
        >
          Rename
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item 
          color="red" 
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} 
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
        >
          Remove
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
