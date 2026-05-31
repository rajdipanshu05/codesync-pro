export const hiddenTests = [
  { input: { nums: [-1] }, expectedOutput: -1 },
  { input: { nums: [-2, -1] }, expectedOutput: -1 },
  { input: { nums: [1, 2, 3] }, expectedOutput: 6 },
  { input: { nums: [-1, 2, -1, 3, -2] }, expectedOutput: 4 },
  { input: { nums: [0, 0, 0] }, expectedOutput: 0 },
  { input: { nums: [100, -50, 100] }, expectedOutput: 150 },
  { input: { nums: [-5, 4, -2, 4, -1] }, expectedOutput: 6 },
  { input: { nums: [3, -1, 2, -1] }, expectedOutput: 4 },
  { input: { nums: [-10, -5, -1, -3] }, expectedOutput: -1 },
  { input: { nums: [1, -1, 1, -1, 1] }, expectedOutput: 1 }
];
