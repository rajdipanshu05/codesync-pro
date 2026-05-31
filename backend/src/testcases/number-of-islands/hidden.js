export const hiddenTests = [
  {
    input: { grid: [["1"]] },
    expectedOutput: 1
  },
  {
    input: { grid: [["0"]] },
    expectedOutput: 0
  },
  {
    input: { grid: [["1","0"],["0","1"]] },
    expectedOutput: 2
  },
  {
    input: { grid: [["1","1"],["1","1"]] },
    expectedOutput: 1
  },
  {
    input: { grid: [["0","0"],["0","0"]] },
    expectedOutput: 0
  },
  {
    input: {
      grid: [
        ["1","0","1"],
        ["0","0","0"],
        ["1","0","1"]
      ]
    },
    expectedOutput: 4
  },
  {
    input: {
      grid: [
        ["1","1","0"],
        ["0","1","0"],
        ["0","1","1"]
      ]
    },
    expectedOutput: 1
  },
  {
    input: {
      grid: [
        ["1","0","0"],
        ["0","1","0"],
        ["0","0","1"]
      ]
    },
    expectedOutput: 3
  },
  {
    input: {
      grid: [
        ["0","1","0"],
        ["1","0","1"],
        ["0","1","0"]
      ]
    },
    expectedOutput: 4
  },
  {
    input: {
      grid: [
        ["1","1","1"],
        ["0","0","0"],
        ["1","1","1"]
      ]
    },
    expectedOutput: 2
  }
];
