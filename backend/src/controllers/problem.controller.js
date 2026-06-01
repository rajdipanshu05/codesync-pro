import { runCode, submitCode } from "../services/judge.service.js";
import { problems } from "../data/problems.js";
// import { runCode, submitCode } from "../../services/judge.service.js";

// ================= GET ALL PROBLEMS =================

export const getAllProblems = async (req, res) => {
  try {
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch problems",
    });
  }
};

// ================= GET SINGLE PROBLEM =================

export const getProblemById = async (req, res) => {
  try {
    const { problemId } = req.params;

    const problem = problems.find((p) => p.id === problemId);

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch problem",
    });
  }
};
// POST /api/code/run
export const run = async (req, res) => {
  const { problemId, language, code } = req.body;
 
  if (!problemId || !language || !code) {
    return res.status(400).json({ message: "problemId, language, and code are required" });
  }
 
  if (!["java", "cpp", "python"].includes(language)) {
    return res.status(400).json({ message: "language must be java, cpp, or python" });
  }
 
  try {
    const result = await runCode(problemId, language, code);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
 
// POST /api/code/submit
export const submit = async (req, res) => {
  const { problemId, language, code } = req.body;
 
  if (!problemId || !language || !code) {
    return res.status(400).json({ message: "problemId, language, and code are required" });
  }
 
  if (!["java", "cpp", "python"].includes(language)) {
    return res.status(400).json({ message: "language must be java, cpp, or python" });
  }
 
  try {
    const result = await submitCode(problemId, language, code);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
 