//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...tanstackConfig,
  globalIgnores(['src/routeTree.gen.ts']),
]);
