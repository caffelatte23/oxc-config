import { defineConfig as defineLintConfig, type OxlintConfig } from "oxlint";

export const defineConfig = (config: OxlintConfig = {}): OxlintConfig =>
  defineLintConfig({
    plugins: ["eslint", "import", "typescript"],
    extends: [config],
  });
