export const hiddenTests = [
  { input: { nums1: [0, 0], nums2: [0, 0] }, expectedOutput: 0.0 },
  { input: { nums1: [], nums2: [1] }, expectedOutput: 1.0 },
  { input: { nums1: [2], nums2: [] }, expectedOutput: 2.0 },
  { input: { nums1: [1, 3], nums2: [2, 4] }, expectedOutput: 2.5 },
  { input: { nums1: [1, 2, 3], nums2: [4, 5, 6] }, expectedOutput: 3.5 },
  { input: { nums1: [1, 4], nums2: [2, 3] }, expectedOutput: 2.5 },
  { input: { nums1: [1], nums2: [2, 3, 4] }, expectedOutput: 2.5 },
  { input: { nums1: [5], nums2: [1, 2, 3, 4] }, expectedOutput: 3.0 },
  { input: { nums1: [1, 3, 5], nums2: [2, 4, 6] }, expectedOutput: 3.5 },
  { input: { nums1: [1, 2], nums2: [1, 2] }, expectedOutput: 1.5 }
];
