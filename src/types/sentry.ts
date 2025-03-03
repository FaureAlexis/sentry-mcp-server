import { MCPPrompt, MCPTool } from 'mcp-framework';

type MCPPromptResult = {
  type: string;
  text: string;
}

type MCPToolResult = {
  type: string;
  value: Record<string, unknown>;
}

export interface SentryIssueData {
  title: string;
  issue_id: string;
  status: string;
  level: string;
  filename: string;
  function: string;
  type: string;
  first_seen: string;
  last_seen: string;
  count: number;
  stacktrace: string;

  to_text(): string;
  to_prompt_result(): MCPPromptResult;
  to_tool_result(): MCPToolResult;
}

export interface SentryEvent {
  id: string;
  entries: Array<{
    type: string;
    data: {
      values: Array<{
        type: string;
        value: string;
        stacktrace?: {
          frames: Array<{
            filename: string;
            function: string;
            lineno: number;
            colno?: number;
          }>;
        };
      }>;
    };
  }>;
}

export interface SentryIssue {
  id: string;
  title: string;
  status: string;
  level: string;
  firstSeen: string;
  lastSeen: string;
  metadata: {
    filename: string;
    function: string;
    type: string;
  };
  count: string;
  latestEvent: SentryEvent;
}

export interface SentryConfig {
  authToken: string;
  apiBase: string;
} 

export interface SentryIssueData {
  title: string;
  issue_id: string;
  status: string;
  level: string;
  first_seen: string;
  last_seen: string;
  count: number;
  stacktrace: string;

  to_text(): string;
  to_prompt_result(): { type: string; text: string };
  to_tool_result(): { type: string; value: Record<string, unknown> };
}

export interface SentryEvent {
  id: string;
  entries: Array<{
    type: string;
    data: {
      values: Array<{
        type: string;
        value: string;
        stacktrace?: {
          frames: Array<{
            filename: string;
            function: string;
            lineno: number;
            colno?: number;
          }>;
        };
      }>;
    };
  }>;
}

export interface SentryIssue {
  id: string;
  title: string;
  status: string;
  level: string;
  firstSeen: string;
  lastSeen: string;
  count: string;
  latestEvent: SentryEvent;
}

export interface SentryConfig {
  authToken: string;
  apiBase: string;
} 