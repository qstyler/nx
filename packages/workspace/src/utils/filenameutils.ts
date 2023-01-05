import { parse } from 'path';

export function removeFilenameExtension(outputFileName) {
  const { dir, name } = parse(outputFileName);

  return dir + name;
}
