import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { DynamicModule, ForwardReference, Type } from '@nestjs/common';

type NestModuleImport =
  | Type<unknown>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;

function isNestModuleClass(exported: unknown): exported is Type<unknown> {
  return (
    typeof exported === 'function' &&
    typeof (exported as { name?: string }).name === 'string' &&
    (exported as { name: string }).name.endsWith('Module')
  );
}

const modulesRootDir = join(__dirname, '..', 'modules');

/**
 * Tự động gom mọi class `*Module` trong file `*.module.ts` / `*.module.js` ở thư mục `src/modules`.
 * Thêm module mới: tạo `src/modules/ten.module.ts` + `export * from './ten.module'` trong `index.ts`.
 */
function loadFeatureModules(): NestModuleImport[] {
  const files = readdirSync(modulesRootDir)
    .filter((f) => /^[^/\\]+\.module\.(js|ts)$/.test(f))
    .sort();

  const result: NestModuleImport[] = [];

  for (const file of files) {
    const baseName = file.replace(/\.(js|ts)$/, '');
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- quét file theo tên lúc chạy
    const mod = require(join(modulesRootDir, baseName)) as Record<string, unknown>;
    for (const exported of Object.values(mod)) {
      if (isNestModuleClass(exported)) {
        result.push(exported);
        break;
      }
    }
  }

  return result;
}

export const appFeatureModules = loadFeatureModules();
