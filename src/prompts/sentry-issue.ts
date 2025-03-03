import { MCPPrompt } from "mcp-framework";
import { z } from "zod";
import { SentryService } from "../services/sentry.js";
import { getSentryConfig } from "../config.js";
import { SentryError } from "../errors/sentry.js";

interface SentryPromptInput {
  issue_id_or_url: string;
}

export default class SentryIssuePrompt extends MCPPrompt<SentryPromptInput> {
  name = "sentry-issue";
  description = "Get details about a Sentry issue";
  private sentryService: SentryService;

  constructor() {
    super();
    this.sentryService = new SentryService(getSentryConfig());
  }

  schema = {
    issue_id_or_url: {
      type: z.string(),
      description: "Sentry issue ID or URL to analyze",
    },
  };

  async generateMessages(input: SentryPromptInput) {
    try {
      const issue = await this.sentryService.getIssue(input.issue_id_or_url);
      return [
        {
          role: "assistant",
          content: {
            type: "text",
            text: issue.to_text(),
          },
        },
      ];
    } catch (error) {
      if (error instanceof SentryError) {
        throw error;
      }
      throw new Error(`Failed to retrieve Sentry issue: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 