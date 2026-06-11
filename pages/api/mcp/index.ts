import type { NextApiRequest, NextApiResponse } from 'next';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { registerTools } from '@/lib/brain/mcp-server';

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  if (!process.env.MCP_SECRET_TOKEN || auth !== `Bearer ${process.env.MCP_SECRET_TOKEN}`) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  const server = new McpServer({ name: 'second-brain', version: '1.0.0' });
  registerTools(server);
  await server.connect(transport);

  res.on('close', () => {
    transport.close().catch(() => {});
  });

  await transport.handleRequest(req, res, req.body);
}
