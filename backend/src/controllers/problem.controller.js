import { problems } from "../data/problems.js";

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

    const problem = problems.find(
      (p) => p.id === problemId
    );

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