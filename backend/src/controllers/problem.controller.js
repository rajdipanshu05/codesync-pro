import { problems } from "../data/problems.js";

export const getAllProblems = (req, res) => {
  res.status(200).json(problems);
};

export const getProblemById = (req, res) => {
  const problem = problems.find((p) => p.id === req.params.id);

  if (!problem) {
    return res.status(404).json({
      message: "Problem not found",
    });
  }

  res.json(problem);
};
