import type { Stats } from 'node:fs';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

async function statOrNull(path: string): Promise<Stats | null> {
  try {
    return await stat(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

export async function pathExists(path: string): Promise<boolean> {
  return (await statOrNull(path)) !== null;
}

export async function directoryExists(path: string): Promise<boolean> {
  const stats = await statOrNull(path);
  return stats !== null && stats.isDirectory();
}

export async function isDirectoryEmpty(path: string): Promise<boolean> {
  const entries = await readdir(path);
  return entries.length === 0;
}

export async function createDirectory(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function writeTextFile(path: string, content: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf-8');
}