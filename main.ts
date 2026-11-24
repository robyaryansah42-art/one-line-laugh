// The One-Line Laugh — make.fun bounty u-ronigrv-the-one-line-laugh-7ccca46f
//
// Writes exactly one funny line to /output/entry.txt: a single sentence of
// at most 200 characters. The line is a fixed, hand-written one-liner, so
// every run produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My standing desk was supposed to make me healthier, so naturally I bought a taller chair to sit at it.";

const OUTPUT_PATH = "/output/entry.txt";

function buildEntry(): string {
  return LINE;
}

function validate(line: string): void {
  const checks: Array<[boolean, string]> = [
    [line.length >= 1 && line.length <= 200, `entry must be 1-200 characters, got ${line.length}`],
    [line.trim().length > 0, "entry must not be only white space"],
    [!line.includes("\n") && !line.includes("\r"), "entry must be a single line"],
    [
      line.split(/[.!?]+/).filter((part) => part.trim().length > 0).length === 1,
      "entry must be a single sentence",
    ],
    [line.endsWith("."), "entry must end with a full stop"],
  ];
  for (const [ok, message] of checks) {
    if (!ok) throw new Error(message);
  }
}

function writeEntry(line: string, outputPath: string): void {
  validate(line);
  mkdirSync(dirname(outputPath), { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(outputPath, line, "utf8");
}

writeEntry(buildEntry(), OUTPUT_PATH);
