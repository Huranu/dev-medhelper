"use client";
import React, { useState, useEffect } from "react";
import BloodWorkChart from "../components/chart";

const Result: React.FC = () => {
  const [result, setResult] = useState<any>(null); 

  useEffect(() => {
    const storedResult = localStorage.getItem("labTestResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      localStorage.removeItem("labTestResult");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {result ? (
        <BloodWorkChart data={result.indicators} />
      ) : (
        <p>No results available. Please upload a lab test image.</p>
      )}
    </div>
  );
};

export default Result;