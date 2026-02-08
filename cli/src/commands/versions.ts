#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { Logger } from '../utils/logger.js';

export async function versionsCommand(): Promise<void> {
  try {
    // Get CLI version from package.json
    const packagePath = join(dirname(dirname(dirname(__filename))), 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    const cliVersion = packageJson.version;

    Logger.log('');
    Logger.log('NotebookLM Skills - Version Information');
    Logger.log('━'.repeat(50));
    Logger.log(`CLI Version:    ${cliVersion}`);
    Logger.log(`Package Name:   ${packageJson.name}`);
    Logger.log(`License:        ${packageJson.license}`);
    Logger.log(`Repository:     ${packageJson.repository?.url || 'N/A'}`);
    Logger.log('━'.repeat(50));
    Logger.log('');

    Logger.info('For updates, run: nlm-cli update');
    Logger.info('For issues: https://github.com/Dong237/notebooklm-skills/issues');
    Logger.log('');

  } catch (error) {
    Logger.error('Failed to read version information');
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    process.exit(1);
  }
}
