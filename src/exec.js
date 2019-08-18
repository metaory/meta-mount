const { execSync, } = require('child_process')

module.exports = class {
  constructor() {}

  static run(cmd) {
    return execSync(cmd, { encoding: 'utf8', })
  }

  static list() {
    return JSON.parse(this.run('lsblk -J'))
      .blockdevices
      .reduce((acc, cur, i) => {
        if (i === 0) return acc
        acc.push(...cur.children
          .map(({ name, mountpoint }) => ({ name, mountpoint }))
        )
        return acc
      }, [])
  }
}
