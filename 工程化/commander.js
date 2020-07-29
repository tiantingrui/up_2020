#!/usr/bin/env node

const program = require('commander')

const getHelp = () => {}

program
    .name('better-clone')
    .version('0.0.1')
    .option('-v, --verbose', 'verbosity that can be increased')

program
    .command('clone <source> [destination]')
    .option('-d --depths <level>', 'git clone depths')
    .description('clone a repository into a newly created directory')
    .action((source, destination, cmdObj) => {
        // ...
    })

program.parse(process.argv)
