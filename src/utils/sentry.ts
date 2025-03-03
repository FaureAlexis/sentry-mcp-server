import { SentryValidationError } from '../errors/sentry.js';
import { SentryEvent } from '../types/sentry.js';

export function extractIssueId(issueIdOrUrl: string): string {
  // Handle direct numeric IDs
  if (/^\d+$/.test(issueIdOrUrl)) {
    return issueIdOrUrl;
  }

  try {
    const url = new URL(issueIdOrUrl);
    // Extract ID from Sentry URL patterns
    const matches = url.pathname.match(/issues?\/(\d+)/i);
    if (matches && matches[1]) {
      return matches[1];
    }
  } catch (error) {
    // URL parsing failed
  }

  throw new SentryValidationError(`Invalid Sentry issue ID or URL: ${issueIdOrUrl}`);
}

export function createStacktrace(event: SentryEvent): string {
  if (!event?.entries?.length) {
    return 'No stacktrace available';
  }

  const exceptionEntry = event.entries.find(entry => entry.type === 'exception');
  if (!exceptionEntry?.data?.values?.length) {
    return 'No exception data available';
  }

  return exceptionEntry.data.values
    .map(value => {
      const frames = value.stacktrace?.frames || [];
      const stackLines = frames
        .reverse()
        .map(frame => {
          const location = `${frame.filename}:${frame.lineno}${frame.colno ? `:${frame.colno}` : ''}`;
          return `    at ${frame.function} (${location})`;
        })
        .join('\n');

      return `${value.type}: ${value.value}\n${stackLines}`;
    })
    .join('\n\nCaused by: ');
}

export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString();
} 