// services/wrapper.service.js

// ─── Java Templates ──────────────────────────────────────────────────────────
// User sirf function deta hai (static hona zaroori nahi)
// Hum usse Solution class mein wrap karke Main se call karte hain

const javaWrappers = {
  "two-sum": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        Solution sol = new Solution();
        int[] res = sol.twoSum(nums, target);
        System.out.println(res[0] + " " + res[1]);
    }
}`,

  "reverse-string": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        char[] s = new char[n];
        for (int i = 0; i < n; i++) s[i] = sc.next().charAt(0);
        Solution sol = new Solution();
        sol.reverseString(s);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length; i++) sb.append(s[i]).append(i < s.length-1 ? " " : "");
        System.out.println(sb.toString());
    }
}`,

  "palindrome-number": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome(x));
    }
}`,

  "maximum-subarray": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.maxSubArray(nums));
    }
}`,

  "longest-substring-without-repeating": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        Solution sol = new Solution();
        System.out.println(sol.lengthOfLongestSubstring(s));
    }
}`,

  "container-with-most-water": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.maxArea(height));
    }
}`,

  "product-of-array-except-self": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        Solution sol = new Solution();
        int[] res = sol.productExceptSelf(nums);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.length; i++) {
            if (i > 0) sb.append(" ");
            sb.append(res[i]);
        }
        System.out.println(sb.toString());
    }
}`,

  "number-of-islands": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) grid[i][j] = sc.next().charAt(0);
        Solution sol = new Solution();
        System.out.println(sol.numIslands(grid));
    }
}`,

  "trapping-rain-water": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] height = new int[n];
        for (int i = 0; i < n; i++) height[i] = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.trap(height));
    }
}`,

  "median-of-two-sorted-arrays": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int[] nums1 = new int[m];
        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();
        int n = sc.nextInt();
        int[] nums2 = new int[n];
        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();
        Solution sol = new Solution();
        System.out.printf("%.5f%n", sol.findMedianSortedArrays(nums1, nums2));
    }
}`,

  "word-ladder": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String beginWord = sc.next();
        String endWord = sc.next();
        int n = sc.nextInt();
        List<String> wordList = new ArrayList<>();
        for (int i = 0; i < n; i++) wordList.add(sc.next());
        Solution sol = new Solution();
        System.out.println(sol.ladderLength(beginWord, endWord, wordList));
    }
}`,

  "largest-rectangle-in-histogram": (userCode) => `
import java.util.*;
public class Main {
    static class Solution {
        ${userCode}
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] heights = new int[n];
        for (int i = 0; i < n; i++) heights[i] = sc.nextInt();
        Solution sol = new Solution();
        System.out.println(sol.largestRectangleArea(heights));
    }
}`,
};

// ─── C++ Templates ────────────────────────────────────────────────────────────

const cppWrappers = {
  "two-sum": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target; cin >> target;
    vector<int> res = twoSum(nums, target);
    cout << res[0] << " " << res[1] << endl;
}`,

  "reverse-string": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<char> s(n);
    for (int i = 0; i < n; i++) cin >> s[i];
    reverseString(s);
    for (int i = 0; i < n; i++) cout << s[i] << (i < n-1 ? " " : "\n");
}`,

  "palindrome-number": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int x; cin >> x;
    cout << (isPalindrome(x) ? "true" : "false") << endl;
}`,

  "maximum-subarray": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
}`,

  "longest-substring-without-repeating": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    string s; cin >> s;
    cout << lengthOfLongestSubstring(s) << endl;
}`,

  "container-with-most-water": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << maxArea(height) << endl;
}`,

  "product-of-array-except-self": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    vector<int> res = productExceptSelf(nums);
    for (int i = 0; i < (int)res.size(); i++) cout << res[i] << (i < (int)res.size()-1 ? " " : "\n");
}`,

  "number-of-islands": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int m, n; cin >> m >> n;
    vector<vector<char>> grid(m, vector<char>(n));
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) cin >> grid[i][j];
    cout << numIslands(grid) << endl;
}`,

  "trapping-rain-water": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << trap(height) << endl;
}`,

  "median-of-two-sorted-arrays": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int m; cin >> m;
    vector<int> nums1(m);
    for (int i = 0; i < m; i++) cin >> nums1[i];
    int n; cin >> n;
    vector<int> nums2(n);
    for (int i = 0; i < n; i++) cin >> nums2[i];
    cout << fixed << setprecision(5) << findMedianSortedArrays(nums1, nums2) << endl;
}`,

  "word-ladder": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    string beginWord, endWord; cin >> beginWord >> endWord;
    int n; cin >> n;
    vector<string> wordList(n);
    for (int i = 0; i < n; i++) cin >> wordList[i];
    cout << ladderLength(beginWord, endWord, wordList) << endl;
}`,

  "largest-rectangle-in-histogram": (userCode) => `
#include <bits/stdc++.h>
using namespace std;
${userCode}
int main() {
    int n; cin >> n;
    vector<int> heights(n);
    for (int i = 0; i < n; i++) cin >> heights[i];
    cout << largestRectangleArea(heights) << endl;
}`,
};

// ─── Python Templates ─────────────────────────────────────────────────────────

const pythonWrappers = {
  "two-sum": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
nums = list(map(int, data[1:n+1]))
target = int(data[n+1])
res = twoSum(nums, target)
print(res[0], res[1])`,

  "reverse-string": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
s = list(data[1:n+1])
reverseString(s)
print(*s)`,

  "palindrome-number": (userCode) => `
${userCode}
import sys
x = int(sys.stdin.read().strip())
print(str(isPalindrome(x)).lower())`,

  "maximum-subarray": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
nums = list(map(int, data[1:n+1]))
print(maxSubArray(nums))`,

  "longest-substring-without-repeating": (userCode) => `
${userCode}
import sys
s = sys.stdin.read().strip()
print(lengthOfLongestSubstring(s))`,

  "container-with-most-water": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
height = list(map(int, data[1:n+1]))
print(maxArea(height))`,

  "product-of-array-except-self": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
nums = list(map(int, data[1:n+1]))
print(*productExceptSelf(nums))`,

  "number-of-islands": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
m, n = int(data[0]), int(data[1])
idx = 2
grid = []
for i in range(m):
    row = list(data[idx:idx+n])
    grid.append(row)
    idx += n
print(numIslands(grid))`,

  "trapping-rain-water": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
height = list(map(int, data[1:n+1]))
print(trap(height))`,

  "median-of-two-sorted-arrays": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
m = int(data[0])
nums1 = list(map(int, data[1:m+1]))
n = int(data[m+1])
nums2 = list(map(int, data[m+2:m+2+n]))
print(f"{findMedianSortedArrays(nums1, nums2):.5f}")`,

  "word-ladder": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
beginWord = data[0]
endWord = data[1]
n = int(data[2])
wordList = data[3:3+n]
print(ladderLength(beginWord, endWord, wordList))`,

  "largest-rectangle-in-histogram": (userCode) => `
${userCode}
import sys
data = sys.stdin.read().split()
n = int(data[0])
heights = list(map(int, data[1:n+1]))
print(largestRectangleArea(heights))`,
};

// ─── Stdin Builders ───────────────────────────────────────────────────────────

const stdinBuilders = {
  "two-sum": (input) =>
    `${input.nums.length}\n${input.nums.join(" ")}\n${input.target}`,

  "reverse-string": (input) => `${input.s.length}\n${input.s.join(" ")}`,

  "palindrome-number": (input) => `${input.x}`,

  "maximum-subarray": (input) =>
    `${input.nums.length}\n${input.nums.join(" ")}`,

  "longest-substring-without-repeating": (input) => `${input.s}`,

  "container-with-most-water": (input) =>
    `${input.height.length}\n${input.height.join(" ")}`,

  "product-of-array-except-self": (input) =>
    `${input.nums.length}\n${input.nums.join(" ")}`,

  "number-of-islands": (input) => {
    const m = input.grid.length;
    const n = input.grid[0].length;
    const rows = input.grid.map((row) => row.join(" ")).join("\n");
    return `${m} ${n}\n${rows}`;
  },

  "trapping-rain-water": (input) =>
    `${input.height.length}\n${input.height.join(" ")}`,

  "median-of-two-sorted-arrays": (input) => {
    const a = input.nums1.length
      ? `${input.nums1.length}\n${input.nums1.join(" ")}`
      : `0`;
    const b = input.nums2.length
      ? `${input.nums2.length}\n${input.nums2.join(" ")}`
      : `0`;
    return `${a}\n${b}`;
  },

  "word-ladder": (input) =>
    `${input.beginWord}\n${input.endWord}\n${input.wordList.length}\n${input.wordList.join(" ")}`,

  "largest-rectangle-in-histogram": (input) =>
    `${input.heights.length}\n${input.heights.join(" ")}`,
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const buildSourceCode = (problemId, language, userCode) => {
  const map = { java: javaWrappers, cpp: cppWrappers, python: pythonWrappers };
  const wrapper = map[language]?.[problemId];
  if (!wrapper) throw new Error(`No wrapper for ${language}/${problemId}`);
  return wrapper(userCode);
};

export const buildStdin = (problemId, input) => {
  const builder = stdinBuilders[problemId];
  if (!builder) throw new Error(`No stdin builder for: ${problemId}`);
  return builder(input);
};
