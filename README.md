# Sentry MCP Server 🔍

A TypeScript implementation of a Sentry MCP (Modern Context Protocol) tool that allows AI agents to access and analyze Sentry error data. 🤖

## ✨ Features

- 🎯 Retrieve Sentry issues by ID or URL
- 📊 Extract and format issue metadata (title, status, level, etc.)
- 🔬 Detailed stacktrace analysis and formatting
- 🛠️ Support for both tool and prompt interfaces
- 🛡️ Comprehensive error handling and validation
- ⚙️ Environment-based configuration
- 🔄 SSE transport for real-time communication

## 📦 Installation

```bash
pnpm install
```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_API_BASE=https://sentry.io/api/0/  # Optional, defaults to this value
```

## 📚 Usage

### Starting the Server 🚀

```bash
pnpm start
```

The server will start on port 1337 by default with SSE transport.

### Using the Tool 🛠️

The server provides two interfaces:

1. Tool Interface: `get_sentry_issue`
   ```json
   {
     "issue_id_or_url": "12345"
   }
   ```

2. Prompt Interface: `sentry-issue`
   ```json
   {
     "issue_id_or_url": "https://sentry.io/organizations/your-org/issues/12345/"
   }
   ```

Both interfaces accept either a Sentry issue ID or a full Sentry issue URL.

### Response Format 📄

The tool returns structured data including:
- 🆔 Issue ID and title
- 📊 Status and level
- 📁 Filename and function where error occurred
- ❌ Error type
- ⏰ First and last seen timestamps
- 🔢 Event count
- 📋 Formatted stacktrace

## 💻 Development

### Building

```bash
pnpm run build
```

### Watching for Changes

```bash
pnpm run watch
```

## ⚠️ Error Handling

The server handles various error cases:
- 🔒 Authentication errors (401)
- 🔍 Not found errors (404)
- ✅ Invalid input validation
- 🔗 Malformed URLs or IDs
- 🌐 API connection issues
- ⚙️ Missing configuration errors

## 📦 Dependencies

- @modelcontextprotocol/sdk: ^0.6.1
- axios: ^1.8.1
- dotenv: ^16.4.7
- mcp-framework: ^0.1.25
- TypeScript: ^5.3.3

## 📝 Type Definitions

The server includes TypeScript definitions for:

- 📊 Sentry issue data
- 🔍 Event and stacktrace information
- ⚙️ Configuration options
- ❌ Error classes

## 🤝 Contributing

1. 🔀 Fork the repository
2. 🌿 Create your feature branch
3. 💾 Commit your changes
4. 🚀 Push to the branch
5. 📬 Create a new Pull Request
