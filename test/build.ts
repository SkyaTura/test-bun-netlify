import { mkdir } from 'node:fs/promises'

await mkdir('./out', { recursive: true })

await Bun.build({
    entrypoints: ['./index.tsx'],
    outdir: './out',
  })

const input = Bun.file("./src/index.html");
const output = Bun.file("./out/index.html");
await Bun.write(output, input);
