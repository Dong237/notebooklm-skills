#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { detectAIAssistant } from '../utils/detect.js';
import { Logger } from '../utils/logger.js';

export async function initCommand(options: { ai?: string }): Promise<void> {
  try {
    // ES module equivalents of __filename and __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Detect AI assistant
    const assistant = detectAIAssistant(options.ai);

    if (!assistant.detected && !options.ai) {
      Logger.warn(`No AI assistant detected. Defaulting to ${assistant.name}.`);
      Logger.info(`Use --ai <name> to specify: claude, cursor, windsurf, or continue`);
    } else {
      Logger.success(`Detected ${assistant.name.charAt(0).toUpperCase() + assistant.name.slice(1)}`);
    }

    // Create skills directory if it doesn't exist
    if (!existsSync(assistant.skillsPath)) {
      Logger.info(`Creating skills directory: ${assistant.skillsPath}`);
      mkdirSync(assistant.skillsPath, { recursive: true });
    }

    // Get assets path (relative to this script's compiled location)
    const assetsPath = join(dirname(dirname(__dirname)), 'assets');

    if (!existsSync(assetsPath)) {
      Logger.error(`Assets not found at ${assetsPath}`);
      Logger.error('This might be a development build. Make sure to run from published package.');
      process.exit(1);
    }

    // Target installation path
    const targetPath = join(assistant.skillsPath, 'learning-with-decks-skill');

    // Check if already installed
    if (existsSync(targetPath)) {
      Logger.warn('Learning with Decks is already installed at:');
      Logger.log(`  ${targetPath}`);
      Logger.info('To update, run: lwd-cli update');
      return;
    }

    // Copy skill files
    Logger.info('Copying skill files...');
    cpSync(join(assetsPath, 'SKILL.md'), join(targetPath, 'SKILL.md'));
    cpSync(join(assetsPath, 'phases'), join(targetPath, 'phases'), { recursive: true });
    cpSync(join(assetsPath, 'scripts'), join(targetPath, 'scripts'), { recursive: true });

    Logger.success(`Skill files copied to ${targetPath}`);

    // Install Node.js dependencies for watermark removal
    Logger.info('Installing Node.js dependencies for watermark removal...');
    const scriptsPath = join(targetPath, 'scripts');

    try {
      execSync('npm install', {
        cwd: scriptsPath,
        stdio: 'pipe'
      });
      Logger.success('Dependencies installed');
    } catch (error) {
      Logger.warn('Failed to install dependencies automatically');
      Logger.info(`Run manually: cd ${scriptsPath} && npm install`);
    }

    // Success message
    Logger.log('');
    Logger.success('Installation complete!');
    Logger.log('');
    Logger.info('Try it out:');
    Logger.log(`  "Transform my files into a podcast"`);
    Logger.log(`  "Convert my PDFs into slide decks"`);
    Logger.log('');

  } catch (error) {
    Logger.error('Installation failed:');
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    process.exit(1);
  }
}
