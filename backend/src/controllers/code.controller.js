import axios from "axios";

export const runCode = async (req, res) => {

  try {

    const {
      language,
      source_code,
      stdin,
    } = req.body;

    const languageMap = {

      javascript: 63,
      python: 71,
      java: 62,
      cpp: 54,
    };

    const language_id =
      languageMap[language];
    

    const response =
      await axios.post(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",

        {
          language_id,

          source_code,

          stdin,
        }
      );

    return res
      .status(200)
      .json(response.data);

  } catch (error) {

    console.log(
      "RUN CODE ERROR:",
      error.message
    );

    return res
      .status(500)
      .json({
        message:
          "Code execution failed",
      });
  }
};