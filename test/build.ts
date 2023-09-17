await Bun.build({
    entrypoints: ['./index.tsx'],
    outdir: './out',
  })
  console.log(process.cwd())
  const input = Bun.file("./src/index.html");
  const output = Bun.file("./out/index.html");
  await Bun.write(output, input);
