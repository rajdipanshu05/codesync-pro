export const hiddenTests = [
  { input: { nums: [1, 1] }, expectedOutput: [1, 1] },
  { input: { nums: [2, 3] }, expectedOutput: [3, 2] },
  { input: { nums: [1, 2, 3] }, expectedOutput: [6, 3, 2] },
  { input: { nums: [0, 0] }, expectedOutput: [0, 0] },
  { input: { nums: [1, 0, 3, 4] }, expectedOutput: [0, 12, 0, 0] },
  { input: { nums: [-1, -1, -1, -1] }, expectedOutput: [-1, -1, -1, -1] },
  { input: { nums: [5, 2, 3, 1] }, expectedOutput: [6, 15, 10, 30] },
  { input: { nums: [2, 2, 2, 2] }, expectedOutput: [8, 8, 8, 8] },
  { input: { nums: [1, 1, 1, 1] }, expectedOutput: [1, 1, 1, 1] },
  { input: { nums: [3, -2, 4, -1] }, expectedOutput: [8, -12, 6, -24] }
];
