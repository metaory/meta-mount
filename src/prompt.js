const { prompt, BooleanPrompt, } = require('enquirer')

module.exports = class {
  constructor() {}

  static input(name, msg, initial = '') {
    const message = msg || `Enter ${name}`
    return prompt({
      type: 'input',
      name,
      message,
      initial,
    })
  }

  static select(list) {
    const choices = list
      .map(({ name, mountpoint, }) => `${name.padEnd(6)}:${mountpoint}`)
      // .sort()
    return prompt({
      type: 'autocomplete',
      name: 'device',
      message: 'Select device',
      limit: 10,
      suggest(input, choices) {
        return choices.filter(choice => choice.message.includes(input))
      },
      choices,
      result(value) {
        const values = value.split(':')
        const name = values[0].trim()
        const mountpoint = values[1] === 'null' ? false : values[1]
        return { name, mountpoint }
      },
    })
  }

  static confirm(message = 'Are you sure?', initial = true) {
    return new BooleanPrompt({
      name: 'confirm',
      message,
      initial,
    }).run()
  }
}
