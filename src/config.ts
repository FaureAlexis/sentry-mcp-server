import dotenv from 'dotenv';
import { SentryConfig } from './types/sentry.js';
import { SentryValidationError } from './errors/sentry.js';

dotenv.config();

export const SENTRY_API_BASE = 'https://us.sentry.io/api/0/';
export const MISSING_AUTH_TOKEN_MESSAGE = 'Sentry authentication token is required';

export function getSentryConfig(): SentryConfig {
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  if (!authToken) {
    throw new SentryValidationError(MISSING_AUTH_TOKEN_MESSAGE);
  }

  return {
    authToken,
    apiBase: process.env.SENTRY_API_BASE || SENTRY_API_BASE,
  };
} 