#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create server instance
const server = new Server(
  {
    name: "physical-ai-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_textbook_content",
        description: "Retrieve content from Physical AI Textbook modules",
        inputSchema: {
          type: "object",
          properties: {
            module: { type: "string" },
            chapter: { type: "string" },
          },
          required: ["module"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_textbook_content") {
    const { module, chapter } = request.params.arguments as any;
    return {
      content: [
        {
          type: "text",
          text: `Mock content for Module: ${module}, Chapter: ${
            chapter || "All"
          }`,
        },
      ],
    };
  }
  throw new Error("Tool not found");
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Physical AI MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
