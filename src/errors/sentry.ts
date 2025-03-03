export class SentryError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SentryError';
    Object.setPrototypeOf(this, SentryError.prototype);
  }
}

export class SentryAuthError extends SentryError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR');
    this.name = 'SentryAuthError';
  }
}

export class SentryNotFoundError extends SentryError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND');
    this.name = 'SentryNotFoundError';
  }
}

export class SentryValidationError extends SentryError {
  constructor(message: string = 'Invalid input') {
    super(message, 'VALIDATION_ERROR');
    this.name = 'SentryValidationError';
  }
} 