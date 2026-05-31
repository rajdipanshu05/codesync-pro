export const hiddenTests = [
  { input: { height: [1] }, expectedOutput: 0 },
  { input: { height: [1, 0, 1] }, expectedOutput: 1 },
  { input: { height: [3, 0, 2, 0, 4] }, expectedOutput: 7 },
  { input: { height: [1, 0, 0, 0, 1] }, expectedOutput: 3 },
  { input: { height: [0, 0, 0] }, expectedOutput: 0 },
  { input: { height: [5, 4, 3, 2, 1] }, expectedOutput: 0 },
  { input: { height: [1, 2, 3, 4, 5] }, expectedOutput: 0 },
  { input: { height: [2, 0, 2] }, expectedOutput: 2 },
  { input: { height: [4, 0, 0, 0, 4] }, expectedOutput: 12 },
  { input: { height: [3, 1, 2, 4, 0, 1, 3, 2] }, expectedOutput: 8 }
];
