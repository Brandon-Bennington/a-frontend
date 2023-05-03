import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";

function App() {
  const [language, setLanguage] = useState("pt");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              language={language}
              handleLanguageChange={handleLanguageChange}
            />
          }
        />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/*import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage"; // Import HomePage
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";

function App() {
  const [language, setLanguage] = useState("pt");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              language={language}
              handleLanguageChange={handleLanguageChange}
            />
          }
        />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/