export const hiddenTests = [
  {
    input: { beginWord: "a", endWord: "c", wordList: ["a","b","c"] },
    expectedOutput: 2
  },
  {
    input: { beginWord: "hot", endWord: "dog", wordList: ["hot","dog"] },
    expectedOutput: 0
  },
  {
    input: { beginWord: "hot", endWord: "dot", wordList: ["hot","dot"] },
    expectedOutput: 2
  },
  {
    input: { beginWord: "cat", endWord: "dog", wordList: ["bat","bad","dad","dog"] },
    expectedOutput: 0
  },
  {
    input: { beginWord: "hit", endWord: "hit", wordList: ["hit"] },
    expectedOutput: 0
  },
  {
    input: {
      beginWord: "leet",
      endWord: "code",
      wordList: ["lest","leet","lose","code","lode","robe","lost"]
    },
    expectedOutput: 0
  },
  {
    input: {
      beginWord: "abc",
      endWord: "xyz",
      wordList: ["abc","xbc","xyc","xyz"]
    },
    expectedOutput: 4
  },
  {
    input: {
      beginWord: "hot",
      endWord: "lot",
      wordList: ["hot","dot","lot"]
    },
    expectedOutput: 3
  },
  {
    input: {
      beginWord: "red",
      endWord: "tax",
      wordList: ["ted","tex","red","tax","tad","den","rex","pee"]
    },
    expectedOutput: 4
  },
  {
    input: {
      beginWord: "qa",
      endWord: "sq",
      wordList: ["si","go","se","cm","so","ph","mt","db","mb","sb","kr","ln","tm","le","av","sm","ar","ci","ca","br","ti","ba","to","ra","fa","yo","ow","sn","ya","cr","po","fe","ho","ma","re","or","rn","au","ur","rh","sr","tc","lt","lo","as","fr","nb","yb","if","pb","ge","th","pm","rb","sh","co","ga","li","ha","hz","no","bi","di","hi","qa","pi","os","uh","wm","an","me","mo","na","la","st","er","sc","ne","mn","mi","am","ex","pt","io","be","fm","ta","tb","ni","mr","pa","he","lr","sq","ye"]
    },
    expectedOutput: 5
  }
];
