// The Painfully Honest Out-of-Office
// Entry: one brutally honest but still polite out-of-office auto-reply.
// Chosen line (112 chars, one sentence):
// "I am on leave and will not be checking this inbox, which is the most honest sentence I have written all year."
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I am on leave and will not be checking this inbox, which is the most honest sentence I have written all year.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read-back check: the file on disk must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
