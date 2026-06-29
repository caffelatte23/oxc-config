import { expect, test } from "vitest";
import { defineLintConfig, defineFmtConfig } from "../src/index.ts";
import { defineConfig as defineLint } from "../src/lint.ts";
import { defineConfig as defineFmt } from "../src/fmt.ts";

// lint

test("lint: default plugins are set", () => {
  const config = defineLint();
  expect(config.plugins).toEqual(["eslint", "import", "typescript"]);
});

test("lint: user config is passed via extends", () => {
  const config = defineLint({ rules: { eqeqeq: "warn" } });
  expect(config.extends).toEqual([{ rules: { eqeqeq: "warn" } }]);
});

test("lint: empty config produces extends with empty object", () => {
  const config = defineLint();
  expect(config.extends).toEqual([{}]);
});

test("lint: re-exported as defineLintConfig from index", () => {
  expect(defineLintConfig).toBe(defineLint);
});

// fmt

test("fmt: default options are set", () => {
  const config = defineFmt();
  expect(config.printWidth).toBe(80);
  expect(config.tabWidth).toBe(2);
  expect(config.semi).toBe(true);
  expect(config.singleQuote).toBe(true);
  expect(config.arrowParens).toBe("always");
  expect(config.jsxSingleQuote).toBe(true);
  expect(config.endOfLine).toBe("lf");
});

test("fmt: override replaces defaults", () => {
  const config = defineFmt({ singleQuote: false, printWidth: 120 });
  expect(config.singleQuote).toBe(false);
  expect(config.printWidth).toBe(120);
  expect(config.semi).toBe(true);
});

test("fmt: sortImports groups are set by default", () => {
  const config = defineFmt();
  expect(config.sortImports).toBeDefined();
  expect((config.sortImports as { newlinesBetween: boolean }).newlinesBetween).toBe(true);
});

test("fmt: override can disable sortImports", () => {
  const config = defineFmt({ sortImports: false });
  expect(config.sortImports).toBe(false);
});

test("fmt: re-exported as defineFmtConfig from index", () => {
  expect(defineFmtConfig).toBe(defineFmt);
});
