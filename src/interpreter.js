import React, { useState } from "react";
import './index.css';

const DreamInterpreter = ({loading, setLoading}) => {
  const [dream, setDream] = useState("");
  const [interpretation, setInterpretation] = useState("");

  const handleSubmit = async () => {
    const prompt = `this was my dream: ${dream}, can u interpret it and tell me what it means?`;

    setLoading(true);
    if (false) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
      return;
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          process.env.REACT_APP_NOT_SECRET_CODE_PART1 +
          process.env.REACT_APP_NOT_SECRET_CODE_PART2
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a dream interpreter that helps people make sense of their dreams. Do not exceed 3-4 sentences in your response.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
      }),
    });

    const data = await response.json();

    console.log(data);
    if (data.choices && data.choices.length > 0) {
      const responseData = data.choices[0].message.content.trim();
      const interpretationResponse = responseData.split("\n").pop();
      setInterpretation(interpretationResponse);
    } else {
      console.error("No interpretation received from the API.");
      setInterpretation("Unable to interpret the dream.");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <div className="inputbox">
      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="Describe your dream..."
        nameClass="textbox"
        rows={10}
        cols={70}
        />
</div>
      <div ><button className="interpret-btn" onClick={handleSubmit} disabled={loading}>Interpret</button></div>
      {interpretation && (
        <div className="response">
          <div className="interpret-title"><strong>Interpretation:</strong></div>
          <div>{interpretation}</div>
        </div>
      )}
    </div>
  );
};

export default DreamInterpreter;
