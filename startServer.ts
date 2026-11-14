import { createServer, ViteDevServer } from 'vite';

let server: ViteDevServer;

export async function startViteServer() {
  server = await createServer();
  await server.listen();
  console.log(`Vite server is running at ${getServerUrl()}`);
}

export function getServerUrl() {
  const address = server?.httpServer?.address();
  if (address && typeof address === 'object') {
    return `http://localhost:${address.port}`;
  }
  return 'http://localhost:5173';
}

export async function stopViteServer() {
  if (server) {
    await server.close();
    console.log('Vite server is stopped');
  }
}
