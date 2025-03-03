import { MCPServer } from "mcp-framework";

const transport = 'sse'

const server = new MCPServer({
  name: "sentry-mcp-server",
  version: "0.0.1",
  transport: {
    type: transport,
    options: {
      port: 1337,
    },
  },
});

server.start();