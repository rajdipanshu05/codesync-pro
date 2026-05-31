export const hiddenTests = [
  { input: { x: 0 }, expectedOutput: true },
  { input: { x: 1 }, expectedOutput: true },
  { input: { x: 9 }, expectedOutput: true },
  { input: { x: 11 }, expectedOutput: true },
  { input: { x: 12 }, expectedOutput: false },
  { input: { x: 1221 }, expectedOutput: true },
  { input: { x: 12321 }, expectedOutput: true },
  { input: { x: 123 }, expectedOutput: false },
  { input: { x: -1 }, expectedOutput: false },
  { input: { x: 1000021 }, expectedOutput: false }
];
