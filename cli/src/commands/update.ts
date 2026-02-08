#!/usr/bin/env node

import { existsSync, rmSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';
import { detectAIAssistant } from '../utils/detect.js';
import { Logger } from '../utils/logger.js';

export async function updateCommand(options: { ai?: string }): Promise<void> {
  try {
    // Detect AI assistant
    const assistant = detectAIAssistant(options.ai);
    const targetPath = join(assistant.skillsPath, 'notebooklm-skills');

    // Check if installed
    if (!existsSync(targetPath)) {
      Logger.error('NotebookLM Skills is not installed.');
      Logger.info('Run: nlm-cli init --ai <name>');
      process.exit(1);
    }

    Logger.info('Updating NotebookLM Skills...');

    // Get assets path
    const assetsPath = join(dirname(dirname(dirname(__filename))), 'assets');

    if (!existsSync(assetsPath)) {
      Logger.error(`Assets not found at ${assetsPath}`);
      process.exit(1);
    }

    // Backup state files if they exist in the target (though they shouldn't be there)
    const stateFiles = ['.notebook-decks-meta.json', 'tasks.md', 'generation-config.jsonl'];
    const backups: { [key: string]: string } = {};

    for (const file of stateFiles) {
      const filePath = join(targetPath, file);
      if (existsSync(filePath)) {
        Logger.warn(`Found state file in installation directory: ${file}`);
        // State files should not be in the skill directory
      }
    }

    // Remove old installation
    Logger.info('Removing old files...');
    rmSync(targetPath, { recursive: true, force: true });
    mkdirSync(targetPath, { recursive: true });

    // Copy new files
    Logger.info('Copying updated files...');
    cpSync(join(assetsPath, 'SKILL.md'), join(targetPath, 'SKILL.md'));
    cpSync(join(assetsPath, 'phases'), join(targetPath, 'phases'), { recursive: true });
    cpSync(join(assetsPath, 'scripts'), join(targetPath, 'scripts'), { recursive: true });

    Logger.success('Files updated');

    // Reinstall dependencies
    Logger.info('Reinstalling dependencies...');
    const scriptsPath = join(targetPath, 'scripts');

    try {
      execSync('npm install', {
        cwd: scriptsPath,
        stdio: 'pipe'
      });
      Logger.success('Dependencies reinstalled');
    } catch (error) {
      Logger.warn('Failed to reinstall dependencies automatically');
      Logger.info(`Run manually: cd ${scriptsPath} && npm install`);
    }

    Logger.log('');
    Logger.success('Update complete!');
    Logger.log('');

  } catch (error) {
    Logger.error('Update failed:');
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    process.exit(1);
  }
}
