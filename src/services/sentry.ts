import axios, { AxiosInstance } from 'axios';
import { SentryConfig, SentryIssue, SentryIssueData } from '../types/sentry.js';
import { SentryAuthError, SentryNotFoundError } from '../errors/sentry.js';
import { extractIssueId, createStacktrace, formatDateTime } from '../utils/sentry.js';

export class SentryService {
  private client: AxiosInstance;

  constructor(private config: SentryConfig) {
    this.client = axios.create({
      baseURL: config.apiBase,
      headers: {
        'Authorization': `Bearer ${config.authToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              throw new SentryAuthError();
            case 404:
              throw new SentryNotFoundError();
            default:
              throw new Error(`Sentry API error: ${error.response.data.detail || error.message}`);
          }
        }
        throw error;
      }
    );
  }

  async getIssue(issueIdOrUrl: string): Promise<SentryIssueData> {
    const issueId = extractIssueId(issueIdOrUrl);
    console.log("Extracted issue ID:", issueId);
    const response = await this.client.get<SentryIssue>(`/issues/${issueId}/`);
    const issue = response.data;
    console.log("Sentry issue retrieved:", JSON.stringify(issue, null, 2));

    const data: SentryIssueData = {
      title: issue.title,
      issue_id: issue.id,
      status: issue.status,
      level: issue.level,
      filename: issue.metadata.filename,
      function: issue.metadata.function,
      type: issue.metadata.type,
      first_seen: issue.firstSeen,
      last_seen: issue.lastSeen,
      count: parseInt(issue.count, 10),
      stacktrace: createStacktrace(issue.latestEvent),

      to_text(): string {
        return `Sentry Issue ${this.issue_id}
Title: ${this.title}
Status: ${this.status}
Level: ${this.level}
Filename: ${this.filename}
Function: ${this.function}
Type: ${this.type}
First seen: ${formatDateTime(this.first_seen)}
Last seen: ${formatDateTime(this.last_seen)}
Count: ${this.count}

Stacktrace:
${this.stacktrace}`;
      },

      to_prompt_result() {
        return {
          type: "text",
          text: this.to_text(),
        };
      },

      to_tool_result() {
        return {
          type: "object",
          value: {
            issue_id: this.issue_id,
            title: this.title,
            status: this.status,
            level: this.level,
            filename: this.filename,
            function: this.function,
            type: this.type,
            first_seen: this.first_seen,
            last_seen: this.last_seen,
            count: this.count,
            stacktrace: this.stacktrace,
          },
        };
      },
    };

    return data;
  }
} 