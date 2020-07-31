const chalk = require('chalk')
const log = console.log

log(chalk.blue('\nhello') + ' World' + chalk.red('!\n'))

log(chalk.blue.bgRed.bold('Hello World!\n'))