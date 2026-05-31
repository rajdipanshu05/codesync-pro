export const hiddenTests = [
  { input: { heights: [1] }, expectedOutput: 1 },
  { input: { heights: [0] }, expectedOutput: 0 },
  { input: { heights: [5, 5, 5] }, expectedOutput: 15 },
  { input: { heights: [1, 2, 3, 4, 5] }, expectedOutput: 9 },
  { input: { heights: [5, 4, 3, 2, 1] }, expectedOutput: 9 },
  { input: { heights: [6, 2, 5, 4, 5, 1, 6] }, expectedOutput: 12 },
  { input: { heights: [2, 1, 2] }, expectedOutput: 3 },
  { input: { heights: [0, 9] }, expectedOutput: 9 },
  { input: { heights: [1, 1, 1, 1, 1, 1] }, expectedOutput: 6 },
  { input: { heights: [3, 6, 5, 7, 4, 8, 1, 0] }, expectedOutput: 20 }
];
