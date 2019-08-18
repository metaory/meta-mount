#!/usr/bin/env node

const { log, error, clear } = console
const c = require('chalk')
const exec = require('../src/exec')
const prompt = require('../src/prompt')
const config = new(require('../src/config'))()
const pkg = require('../package.json')

log(c.bold(pkg.name), c.bold.green(pkg.version))

async function init() {
  await config.load()
  const { mountpoint } = config.values

  const list = exec.list()
  const { device } = await prompt.select(list)

  const action = device.mountpoint ? 'umount' : 'mount'

  const confirm = await prompt.confirm(`${action} ${device.name}`)
  if (confirm === false) return process.exit()

  exec.run(`sudo ${action} /dev/${device.name} ${device.mountpoint ? '' : mountpoint}`)

  clear()
  await init()
}

init()
  .then(log)
  .catch(error)
