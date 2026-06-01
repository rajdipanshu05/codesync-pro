export const hiddenTests = [
  { input: { nums: [3, 3], target: 6 }, expectedOutput: [0, 1] },
  { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expectedOutput: [3, 4] },
  { input: { nums: [-1, -2, -3, -4], target: -6 }, expectedOutput: [1, 3] },
  { input: { nums: [0, 4, 3, 0], target: 0 }, expectedOutput: [0, 3] },
  { input: { nums: [100, 200, 300, 400], target: 700 }, expectedOutput: [2, 3] },
  { input: { nums: [-3, 4, 3, 90], target: 0 }, expectedOutput: [0, 2] },
  { input: { nums: [1, 5, 3, 7, 9], target: 12 }, expectedOutput: [1, 3] },
  { input: { nums: [2, 5, 5, 11], target: 10 }, expectedOutput: [1, 2] },
  { input: { nums: [10, 20, 30, 40, 50], target: 30 }, expectedOutput: [0, 1] },
  { input: { nums: [-10, 10, 0, 5], target: 0 }, expectedOutput: [0, 1] }
];
