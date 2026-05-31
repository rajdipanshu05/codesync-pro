export const hiddenTests = [
  { input: { s: ["a"] }, expectedOutput: ["a"] },
  { input: { s: ["a","b"] }, expectedOutput: ["b","a"] },
  { input: { s: ["1","2","3","4","5"] }, expectedOutput: ["5","4","3","2","1"] },
  { input: { s: ["z","y","x"] }, expectedOutput: ["x","y","z"] },
  { input: { s: ["A","B","C","D"] }, expectedOutput: ["D","C","B","A"] },
  { input: { s: [" ","a"," "] }, expectedOutput: [" ","a"," "] },
  { input: { s: ["!","@","#"] }, expectedOutput: ["#","@","!"] },
  { input: { s: ["p","a","l","a","p"] }, expectedOutput: ["p","a","l","a","p"] },
  { input: { s: ["m","n","o","p","q","r"] }, expectedOutput: ["r","q","p","o","n","m"] },
  { input: { s: ["0","1","0"] }, expectedOutput: ["0","1","0"] }
];
