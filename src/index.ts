#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { CLI_DESCRIPTION, CLI_NAME } from './constants/index.js';
import { CliError } from './utils/errors.js';

interface PackageJson {
  version: string;
}

const currentDir = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(currentDir, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson;

const program = new Command();

program
  .name(CLI_NAME)
  .description(CLI_DESCRIPTION)
  .version(packageJson.version, '-v, --version', 'display the current version');

program
  .command('init <project-name>')
  .description('Create a new open.mp project')
  .addHelpText(
    'after',
    '\nProject name rules:\n  Use lowercase letters, numbers, hyphens, and underscores only.\n  Must start with a letter or number.\n',
  )
  .action(async (projectName: string) => {
    try {
      await runInit(projectName);
    } catch (error) {
      if (error instanceof CliError) {
        console.error(chalk.red(`Error: ${error.message}`));
      } else {
        console.error(chalk.red('An unexpected error occurred.'));
        console.error(error);
      }

      process.exitCode = 1;
    }
  });

program.parse();
