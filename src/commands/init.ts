import { join, resolve } from 'node:path';
import chalk from 'chalk';
import ora, { type Ora } from 'ora';
import {
  CONFIG_JSON_FILE,
  GAMEMODES_DIR,
  GITIGNORE_FILE,
  LICENSE_FILE,
  MAIN_PWN_FILE,
  PROJECT_DIRECTORIES,
  README_FILE,
} from '../constants/index.js';
import { getConfigJsonTemplate } from '../templates/configJson.js';
import { getGitignoreTemplate } from '../templates/gitignore.js';
import { getLicenseTemplate } from '../templates/license.js';
import { getMainPwnTemplate } from '../templates/mainPwn.js';
import { getReadmeTemplate } from '../templates/readme.js';
import type { ProjectContext } from '../types/index.js';
import { createDirectory, writeTextFile } from '../utils/fs.js';
import { validateProjectName, validateTargetDirectory } from '../utils/validation.js';

async function runStep(spinner: Ora, text: string, action: () => Promise<void>): Promise<void> {
  spinner.start(text);

  try {
    await action();
  } catch (error) {
    spinner.fail(text);
    throw error;
  }

  spinner.succeed(text);
}

export async function runInit(projectName: string): Promise<void> {
  validateProjectName(projectName);

  const targetDir = resolve(process.cwd(), projectName);
  await validateTargetDirectory(targetDir);

  const context: ProjectContext = { projectName };
  const spinner = ora();

  await runStep(spinner, 'Creating project...', async () => {});

  await runStep(spinner, 'Generating folders...', async () => {
    for (const dir of PROJECT_DIRECTORIES) {
      await createDirectory(join(targetDir, dir));
    }
  });

  await runStep(spinner, `Creating ${CONFIG_JSON_FILE}...`, () =>
    writeTextFile(join(targetDir, CONFIG_JSON_FILE), getConfigJsonTemplate(context)),
  );

  await runStep(spinner, `Creating ${MAIN_PWN_FILE}...`, () =>
    writeTextFile(join(targetDir, GAMEMODES_DIR, MAIN_PWN_FILE), getMainPwnTemplate(context)),
  );

  await runStep(spinner, `Creating ${README_FILE}...`, () =>
    writeTextFile(join(targetDir, README_FILE), getReadmeTemplate(context)),
  );

  await runStep(spinner, `Creating ${GITIGNORE_FILE} and ${LICENSE_FILE}...`, async () => {
    await writeTextFile(join(targetDir, GITIGNORE_FILE), getGitignoreTemplate());
    await writeTextFile(join(targetDir, LICENSE_FILE), getLicenseTemplate());
  });

  console.log(chalk.green('✔'), 'Done!');
  console.log();
  console.log('Next steps:');
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log('  Download the open.mp server: https://github.com/openmultiplayer/open.mp/releases');
  console.log(`  Compile ${GAMEMODES_DIR}/${MAIN_PWN_FILE} with a PAWN compiler (qawno or pawncc)`);
  console.log('  Run omp-server (Linux) or omp-server.exe (Windows)');
}
