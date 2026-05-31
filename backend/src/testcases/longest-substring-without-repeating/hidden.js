export const hiddenTests = [
  { input: { s: "" }, expectedOutput: 0 },
  { input: { s: " " }, expectedOutput: 1 },
  { input: { s: "au" }, expectedOutput: 2 },
  { input: { s: "dvdf" }, expectedOutput: 3 },
  { input: { s: "abcdef" }, expectedOutput: 6 },
  { input: { s: "aab" }, expectedOutput: 2 },
  { input: { s: "tmmzuxt" }, expectedOutput: 5 },
  { input: { s: "anviaj" }, expectedOutput: 5 },
  { input: { s: "ohvhjdml" }, expectedOutput: 6 },
  { input: { s: "abba" }, expectedOutput: 2 }
];
