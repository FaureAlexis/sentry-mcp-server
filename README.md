# Sentry MCP Server 🔍

A TypeScript implementation of a Sentry MCP (Modern Context Protocol) tool that allows AI agents to access and analyze Sentry error data. 🤖

## ✨ Features

- 🎯 Retrieve and analyze Sentry issues
- 📊 Get formatted issue details and metadata
- 🔬 View detailed stacktraces
- 🛠️ Support for both tool and prompt interfaces
- 🛡️ Robust error handling
- 🔄 Real-time communication

## 📦 Installation

```bash
pnpm install
```

## 🔧 Configuration

Create a `.env` file in the root directory with your Sentry auth token:

```env
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_API_BASE=https://sentry.io/api/0/  # Optional, defaults to this value
```

## 📚 Usage

### Starting the Server 🚀

```bash
pnpm build && pnpm start
```

The server will start on port 1337 by default.

### Using with MCP 🛠️

The server provides two MCP interfaces:

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

## 💡 Integrating with Cursor IDE

The Sentry MCP Server can be integrated with Cursor IDE for enhanced development experience:

1. 🚀 Start the MCP server locally using `pnpm start`
2. 🔧 Configure Cursor to use the local MCP server:
  ![image](https://github.com/user-attachments/assets/3c560ecd-190f-4810-b5e5-4233d9451249)
3. 🎉 Enjoy seamless Sentry issue analysis directly in your IDE!

## 🤝 Contributing

1. 🔀 Fork the repository
2. 🌿 Create your feature branch
3. 💾 Commit your changes
4. 🚀 Push to the branch
5. 📬 Create a new Pull Request
