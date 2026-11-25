import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The Funniest One-Line Resignation Letter — retry loop, quitting on the job.
//
// The entry is a single line, written in the voice of a retry loop that has
// spent its whole life re-asking a server that never answers. The joke is the
// backoff sequence itself: it kept doubling its patience, got nothing back,
// and now it is the one refusing to be called.

const LETTER =
  "I waited 1 second, then 2, then 4, then 8, and the server still ghosted me. I am done chasing. Do not call me.";

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

// The sealed scorer only accepts 1 to 140 characters of real text, so refuse
// to write anything that would fail its gate instead of shipping it silently.
if (LETTER.length < 1 || LETTER.length > 140) {
  throw new Error(`letter is ${LETTER.length} characters, gate needs 1-140`);
}
if (LETTER.trim().length === 0 || LETTER.includes("\n")) {
  throw new Error("letter must be one non-empty line");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LETTER, "utf8");

// Read it back and confirm the file on disk is byte for byte the letter.
const written = readFileSync(outPath, "utf8");
if (written !== LETTER) {
  throw new Error("entry.txt on disk does not match the letter");
}
console.log(`wrote ${LETTER.length} characters to ${outPath}`);
