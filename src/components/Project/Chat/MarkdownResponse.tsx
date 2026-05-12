import React from 'react';
import { Box } from '@mantine/core';
import { Streamdown } from 'streamdown';
import './MarkdownResponse.css';

export interface MarkdownResponseProps {
  content: string;
}

const components: any = {
  'my-component': ({ children }: { children?: React.ReactNode }) => (
    <div className="special-note">
      <span className="special-note-title">Special Note: </span>
      {children}
    </div>
  ),
};

export const MarkdownResponse: React.FC<MarkdownResponseProps> = ({ content }) => {
  // If the LLM sends <my-component>content</my-component>, this works natively.
  // If you MUST use ?content?, you can use a simple regex pre-processor:
  // const processedContent = content.replace(/\?([\s\S]+?)\?/g, '<my-component>$1</my-component>');

  return (
    <Box className="markdown-response-container" w={{ base: '100%', md: 800, lg: 1100 }}>
      <Streamdown
        components={components}
        allowedTags={{ 'my-component': [] }}
      // skipHtml={false}
      >
        {content}
      </Streamdown>
    </Box>
  );
};
