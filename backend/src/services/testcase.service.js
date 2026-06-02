// services/testcase.service.js

export const getVisibleTests = async (problemId) => {
  const module = await import(`../testcases/${problemId}/visible.js`);
  return module.visibleTests;
};

export const getHiddenTests = async (problemId) => {
  const module = await import(`../testcases/${problemId}/hidden.js`);
  return module.hiddenTests;
};