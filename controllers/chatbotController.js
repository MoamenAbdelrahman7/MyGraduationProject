const { GoogleGenerativeAI } = require("@google/generative-ai");
const catchAsync = require("../utils/catchAsync");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askGemini = catchAsync(async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });

    const text = result.response.text();
    console.log({text});
    
    res.status(200).json({
      status: "success",
      structuredResponse: text,
    });
  } catch (err) {
    console.error("Gemini error:", err);

    res.status(500).json({
      status: "error",
      message: err.message || "Something went wrong",
    });
  }
});
