export const onPreBuild = async function ({
  inputs,
  netlifyConfig,
  utils: {
    build,
    status,
    run,
  },
}) {
  const cdBaseDir = `cd ${inputs.basedir}`
  try {
    await run('sh', ['-c', `echo "Using bun $(bun --version)"`])
  } catch (error) {
    build.failBuild('Bun', { error })
  }
  try {
    await utils.cache.restore(`${inputs.basedir}/node_modules`)
    await run('sh', ['-c' , `${cdBaseDir} && bun install`])
    await utils.cache.save(`${inputs.basedir}/node_modules`)
    console.log('Bun dependencies installed')
  } catch (error) {
    build.failBuild('Bun install error', { error })
  }

  netlifyConfig.build.command = `${cdBaseDir} && ${netlifyConfig.build.command}`
  status.show({ summary: 'Success!' })
}