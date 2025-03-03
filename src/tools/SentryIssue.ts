import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { SentryService } from "../services/sentry.js";
import { getSentryConfig } from "../config.js";
import { SentryError } from "../errors/sentry.js";

interface SentryToolInput {
  issue_id_or_url: string;
}

class GetSentryIssueTool extends MCPTool<SentryToolInput> {
  name = "get_sentry_issue";
  description = "Retrieve and analyze a Sentry issue by ID or URL";
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

  async execute(input: SentryToolInput) {
    try {
      console.log("Executing SentryIssue tool with input:", input);
      const issue = await this.sentryService.getIssue(input.issue_id_or_url);
      console.log("Sentry issue retrieved:", issue);
      return {
        type: "object",
        value: {
          issue_id: issue.issue_id,
          title: issue.title,
          status: issue.status,
          level: issue.level,
          filename: issue.filename,
          function: issue.function,
          type: issue.type,
          first_seen: issue.first_seen,
          last_seen: issue.last_seen,
          count: issue.count,
          stacktrace: issue.stacktrace,
        },
      };
    } catch (error) {
      if (error instanceof SentryError) {
        throw error;
      }
      throw new Error(`Failed to retrieve Sentry issue: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
} 

export default GetSentryIssueTool; 