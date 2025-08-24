import { MultiServerMCPClient } from "@langchain/mcp-adapters";

// Create MCP client at module level so it can be shared
export const assistantMCPClient = new MultiServerMCPClient({
    // Global tool configuration options
    // Whether to throw on errors if a tool fails to load (optional, default: true)
    throwOnLoadError: true,
    // Whether to prefix tool names with the server name (optional, default: false)
    prefixToolNameWithServerName: false,
    // Optional additional prefix for tool names (optional, default: "")
    additionalToolNamePrefix: "",
  
    // Use standardized content block format in tool outputs
    useStandardContentBlocks: true,
  
    // Server configuration
    mcpServers: {
      // adds a STDIO connection to a server named "weather"
      "dnd-inventory-manager-mcp": {
        transport: "stdio",
        command: "node",
        args: ['/Users/michaelhofer/workspace/projects/inventory-manager/dnd_app_mcp/build/index.js'],
        // Restart configuration for stdio transport
        restart: {
          enabled: true,
          maxAttempts: 3,
          delayMs: 1000,
        },
      },
    }
  });
  