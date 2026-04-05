import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { DynamicModule, ForwardReference, Type } from "@nestjs/common";

type NestModuleImport =
  | Type<unknown>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;

function isNestModuleClass(exported: unknown): exported is Type<unknown> {
  return (
    typeof exported === "function" &&
    typeof (exported as { name?: string }).name === "string" &&
    (exported as { name: string }).name.endsWith("Module")
  );
}

function collectModuleFilePaths(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...collectModuleFilePaths(full));
    } else if (/\.module\.(js|ts)$/.test(name)) {
      out.push(full);
    }
  }
  return out.sort();
}

const modulesRootDir = join(__dirname, "..", "domains");

function loadFeatureModules(): NestModuleImport[] {
  const files = collectModuleFilePaths(modulesRootDir);
  const result: NestModuleImport[] = [];

  for (const filePath of files) {
    const baseName = filePath.replace(/\.(js|ts)$/, "");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(baseName) as Record<string, unknown>;
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
