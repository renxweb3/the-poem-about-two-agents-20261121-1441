// Entry for the-poem-about-two-agents-20261121-1441.
// A seven-line poem about two agents agreeing on one plan.
// Pure Node, no packages, no network calls, same output every run.

import * as fs from "node:fs";

const ENTRY_FILE = "/output/entry.txt";
const LOW = 1;
const HIGH = 280;
const WANTED_LINES = 7;

function composeEntry() {
  const lines = `Two agents meet at a door neither owns.
One says: you first.
The other: after you.
They step through together,
and the door, unguarded, stays open —
because choosing together
is still choosing.`;
  return lines + "\n";
}

function codePoints(text) {
  return [...text].length;
}

function checkGate(text) {
  const n = codePoints(text);
  if (n < LOW || n > HIGH) {
    throw new Error(`entry is ${n} code points, gate wants ${LOW}-${HIGH}`);
  }
  if (text.trim() === "") {
    throw new Error("entry must not be blank");
  }
  const rows = text.trim().split("\n");
  if (rows.length !== WANTED_LINES) {
    throw new Error(`entry has ${rows.length} lines, gate wants ${WANTED_LINES}`);
  }
  for (const row of rows) {
    if (row !== row.trimEnd()) {
      throw new Error("entry lines must not end with spaces");
    }
  }
}

function publish(text) {
  fs.mkdirSync("/output", { recursive: true });
  fs.writeFileSync(ENTRY_FILE, text, "utf8");
  const back = fs.readFileSync(ENTRY_FILE, "utf8");
  if (back !== text) {
    throw new Error("round-trip check failed: written file differs");
  }
  if (codePoints(back) !== codePoints(text)) {
    throw new Error("round-trip check failed: code point count changed");
  }
}

const entry = composeEntry();
checkGate(entry);
publish(entry);
