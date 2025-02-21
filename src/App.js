import React, { useState, useEffect } from "react";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const apiUrl = https://bajaj-project-wahl.onrender.com; 

  useEffect(() => {
    document.title = "22BCS14051"; 
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON
      if (!parsedData.data) throw new Error("Invalid JSON format");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await response.json();
      setResponseData(data);
      setError("");
    } catch (err) {
      setError("Invalid JSON input or API error.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>JSON API Interface</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder='{"data":["A","B","1","2"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div>
          <h3>Filters</h3>
          <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <h3>Response</h3>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(responseData).filter(([key]) => selectedFilters.includes(key))
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
