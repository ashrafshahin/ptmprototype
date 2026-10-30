import { spawn } from 'node:child_process';

// Next.js dev server wrapper
// AI Studio runs `npm run dev --port 3000 --host 0.0.0.0`
// Next.js dev CLI expects `-p <port> -H <hostname>` or `--port <port> --hostname <hostname>`
const args = process.argv.slice(2);
const nextArgs = ['dev'];

let port = '3000';
let hostname = '0.0.0.0';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--port' || arg === '-p') {
    port = args[i + 1] || port;
    i++;
  } else if (arg.startsWith('--port=')) {
    port = arg.split('=')[1] || port;
  } else if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    hostname = args[i + 1] || hostname;
    i++;
  } else if (arg.startsWith('--host=')) {
    hostname = arg.split('=')[1] || hostname;
  } else if (arg.startsWith('--hostname=')) {
    hostname = arg.split('=')[1] || hostname;
  }
}

nextArgs.push('-p', port, '-H', hostname);

const child = spawn('npx', ['next', ...nextArgs], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: hostname,
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
