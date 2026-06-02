// services/judge.service.js
import axios from "axios";
import { buildSourceCode, buildStdin } from "./wrapper.service.js";
import { getVisibleTests, getHiddenTests } from "./testcase.service.js";

const languageMap = {
  java: 62,
  cpp: 54,
  python: 71,
};

// ─── Judge0 call ─────────────────────────────────────────────────────────────

const executeCode = async ({ language, sourceCode, stdin = "" }) => {
  const response = await axios.post(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      language_id: languageMap[language],
      source_code: sourceCode,
      stdin,
    }
  );
  return response.data;
};

// ─── Output comparison ────────────────────────────────────────────────────────

const normalize = (raw = "") => raw.trim().replace(/\s+/g, " ");

const isCorrect = (actualRaw, expected, problemId) => {
  const actual = normalize(actualRaw);

  // Median — float comparison
  if (problemId === "median-of-two-sorted-arrays") {
    return Math.abs(parseFloat(actual) - expected) < 1e-4;
  }

  // two-sum — both orderings valid e.g. "0 1" or "1 0"
  if (problemId === "two-sum") {
    const exp = expected.join(" ");
    const rev = [...expected].reverse().join(" ");
    return actual === exp || actual === rev;
  }

  // Arrays (product-of-array, reverse-string) — space separated
  if (Array.isArray(expected)) {
    return actual === expected.join(" ");
  }

  // Booleans
  if (typeof expected === "boolean") {
    return actual === String(expected);
  }

  // Numbers / strings
  return actual === String(expected);
};

// ─── Core runner ──────────────────────────────────────────────────────────────

const runTests = async (problemId, language, userCode, tests) => {
  const results = await Promise.all(
    tests.map(async (test, index) => {
      let submission;
      try {
        const sourceCode = buildSourceCode(problemId, language, userCode);
        const stdin = buildStdin(problemId, test.input);
        submission = await executeCode({ language, sourceCode, stdin });
      } catch (err) {
        return {
          testCase: index + 1,
          status: "error",
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: null,
          error: err.message,
        };
      }

      const { stdout, stderr, compile_output, status } = submission;

      if (status?.id === 6) {
        return {
          testCase: index + 1,
          status: "compile_error",
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: null,
          error: compile_output?.trim() || "Compilation failed",
        };
      }

      if (status?.id === 5) {
        return {
          testCase: index + 1,
          status: "time_limit_exceeded",
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: null,
          error: "Time limit exceeded",
        };
      }

      if (stderr?.trim()) {
        return {
          testCase: index + 1,
          status: "runtime_error",
          passed: false,
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: null,
          error: stderr.trim(),
        };
      }

      const passed = isCorrect(stdout, test.expectedOutput, problemId);

      return {
        testCase: index + 1,
        status: passed ? "accepted" : "wrong_answer",
        passed,
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: normalize(stdout || ""),
      };
    })
  );

  const passedCount = results.filter((r) => r.passed).length;

  return {
    passedCount,
    totalCount: tests.length,
    summary: `${passedCount}/${tests.length}`,
    allPassed: passedCount === tests.length,
    results,
  };
};

// ─── Exports ──────────────────────────────────────────────────────────────────

// RUN — only visible test cases
export const runCode = async (problemId, language, userCode) => {
  const tests = await getVisibleTests(problemId);
  return runTests(problemId, language, userCode, tests);
};

// SUBMIT — all hidden test cases
export const submitCode = async (problemId, language, userCode) => {
  const tests = await getHiddenTests(problemId);
  return runTests(problemId, language, userCode, tests);
};