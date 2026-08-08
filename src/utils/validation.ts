import { CliError } from './errors.js';
import { directoryExists, isDirectoryEmpty, pathExists } from './fs.js';

const PROJECT_NAME_PATTERN = /^[a-z0-9][a-z0-9-_]*$/;

export function validateProjectName(projectName: string): void {
  if (projectName.trim().length === 0) {
    throw new CliError('Project name cannot be empty.');
  }

  if (!PROJECT_NAME_PATTERN.test(projectName)) {
    throw new CliError(
      `Invalid project name "${projectName}". Use only lowercase letters, numbers, hyphens, and underscores, starting with a letter or number.`,
    );
  }
}

export async function validateTargetDirectory(path: string): Promise<void> {
  const exists = await pathExists(path);

  if (!exists) {
    return;
  }

  const isDirectory = await directoryExists(path);

  if (!isDirectory) {
    throw new CliError(`"${path}" already exists and is not a directory.`);
  }

  const empty = await isDirectoryEmpty(path);

  if (!empty) {
    throw new CliError(`Directory "${path}" already exists and is not empty.`);
  }
}
