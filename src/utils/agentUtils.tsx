import React from 'react';
import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandSlack,
  IconBrandNotion,
  IconBrandGoogleDrive,
  IconBrandDiscord,
  IconBrandFigma,
  IconBrandTrello,
  IconBrandJira
} from '@tabler/icons-react';

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
  developer: string;
  category: string;
  brandColor: string;
  icon: React.ReactNode;
  sourcesAdded: string[];
  toolsEnabled: string[];
}

export const AGENTS_DIRECTORY: AgentInfo[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect your repositories to allow Atom to read your code, PRs, and issues.',
    developer: 'Atom Inc.',
    category: 'Development & Code',
    brandColor: '#fff',
    icon: <IconBrandGithub size={24} stroke={1.5} />,
    sourcesAdded: ['Repositories', 'Pull Requests', 'Issues'],
    toolsEnabled: ['Create Issue', 'Comment on PR', 'Trigger Workflow']
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Sync your GitLab projects, merge requests, and pipelines for AI context.',
    developer: 'Atom Inc.',
    category: 'Development & Code',
    brandColor: '#fc6d26',
    icon: <IconBrandGitlab size={24} stroke={1.5} />,
    sourcesAdded: ['Projects', 'Merge Requests', 'Pipelines'],
    toolsEnabled: ['Create Merge Request', 'Trigger Pipeline']
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Bring in your Jira boards and issues for comprehensive project tracking.',
    developer: 'Community',
    category: 'Development & Code',
    brandColor: '#0052CC',
    icon: <IconBrandJira size={24} stroke={1.5} />,
    sourcesAdded: ['Projects', 'Issues', 'Boards'],
    toolsEnabled: ['Create Issue', 'Transition Issue', 'Add Comment']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Access channels, messages, and threads directly from your workspace.',
    developer: 'Atom Inc.',
    category: 'Development & Code',
    brandColor: '#E01E5A',
    icon: <IconBrandSlack size={24} stroke={1.5} />,
    sourcesAdded: ['Channels', 'Direct Messages'],
    toolsEnabled: ['Send Message', 'Create Channel']
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Connect to your Discord servers to read channel history and manage roles.',
    developer: 'Community',
    category: '  Code',
    brandColor: '#5865F2',
    icon: <IconBrandDiscord size={24} stroke={1.5} />,
    sourcesAdded: ['Servers', 'Text Channels'],
    toolsEnabled: ['Send Message', 'Kick User']
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Sync your Notion workspaces and databases for AI retrieval.',
    developer: 'Atom Inc.',
    category: 'Database & Storage',
    brandColor: '#171717',
    icon: <IconBrandNotion size={24} stroke={1.5} />,
    sourcesAdded: ['Pages', 'Databases'],
    toolsEnabled: ['Create Page', 'Update Database']
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    description: 'Import documents, spreadsheets, and presentations from your Drive.',
    developer: 'Atom Inc.',
    category: 'Database & Storage',
    brandColor: '#1FA463',
    icon: <IconBrandGoogleDrive size={24} stroke={1.5} />,
    sourcesAdded: ['Docs', 'Sheets', 'Slides'],
    toolsEnabled: ['Create Doc', 'Read Sheet']
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Read cards, lists, and boards from Trello to organize your tasks.',
    developer: 'Community',
    category: 'Database & Storage',
    brandColor: '#0079BF',
    icon: <IconBrandTrello size={24} stroke={1.5} />,
    sourcesAdded: ['Boards', 'Lists', 'Cards'],
    toolsEnabled: ['Create Card', 'Move Card']
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Connect Figma to bring design files and components into your context.',
    developer: 'Atom Inc.',
    category: 'Design',
    brandColor: '#F24E1E',
    icon: <IconBrandFigma size={24} stroke={1.5} />,
    sourcesAdded: ['Design Files', 'Components'],
    toolsEnabled: ['Export Asset', 'Read Comments']
  }
];

export const getAgentInfo = (id: string): AgentInfo | undefined => {
  return AGENTS_DIRECTORY.find(agent => agent.id === id);
};

export const useAgentInfo = () => {
  return {
    agents: AGENTS_DIRECTORY,
    getAgent: getAgentInfo
  };
};
