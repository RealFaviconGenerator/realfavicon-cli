#!/usr/bin/env node

const { Command } = require('commander');
const { CheckExamples } = require('./example');
const { check } = require('./check');

const program = new Command();

program
  .name('realfavicon')
  .description('Create and check favicon with RealFaviconGenerator')
  .version('0.0.1');

program.command('check')
  .description('Check a favicon')
  .argument('<URL or port>', 'the URL to check, or simply a port to target localhost')
  .addHelpText('after', CheckExamples)
  .action(async (urlOrPort: string) => {
    await check(urlOrPort);
  });

program.parse();
