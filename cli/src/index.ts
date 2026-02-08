#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { initCommand } from './commands/init.js';
import { updateCommand } from './commands/update.js';
import { versionsCommand } from './commands/versions.js';

const program = new Command();

// Read version from package.json
const packagePath = join(dirname(dirname(__filename)), 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

program
  .name('nlm-cli')
  .description('CLI installer for NotebookLM Skills - transform files into learning materials')
  .version(packageJson.version);

program
  .command('init')
  .description('Install NotebookLM Skills to your AI assistant')
  .option('--ai <name>', 'Specify AI assistant: claude, cursor, windsurf, or continue')
  .action(initCommand);

program
  .command('update')
  .description('Update NotebookLM Skills to the latest version')
  .option('--ai <name>', 'Specify AI assistant: claude, cursor, windsurf, or continue')
  .action(updateCommand);

program
  .command('versions')
  .alias('version')
  .description('Show version information')
  .action(versionsCommand);

program.parse(process.argv);

// Show help if no command specified
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
