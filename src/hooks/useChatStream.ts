import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const mockMarkdown = `
# Project Plan: Operation Grandma

Here is the plan for Operation Grandma:
1. **Gather Resources**: We need to acquire the necessary components.
2. **Assemble the Team**: Let's bring everyone together.
3. **Execution**: Start the process and monitor progress.

?IMPORTANT: Make sure the cookies are baked at exactly 350 degrees.?

<my-component>This is a test component that should be rendered with special styling.</my-component>


Here is a code snippet:
\`\`\`ts
function grandma() {
  console.log("Cookies are ready!");
}
\`\`\`

Let me know if you need any changes.
`;

export const useChatStream = () => {
  const [streamedContent, setStreamedContent] = useState('');

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      setStreamedContent('');
      const words = mockMarkdown.split(' ');
      let currentContent = '';

      for (let i = 0; i < words.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        currentContent += (i === 0 ? '' : ' ') + words[i];
        setStreamedContent(currentContent);
      }
      return currentContent;
    },
  });

  const clearStream = () => setStreamedContent('');

  return {
    ...mutation,
    streamedContent,
    clearStream,
  };
};
