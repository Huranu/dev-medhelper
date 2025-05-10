"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Button from "./components/button";
import Image from "next/image";
import { FileIcon } from "lucide-react";
import BloodWorkChart from "./components/chart";

const LabTestsScreening: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function sendImg(file: File) {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/lab_test", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("AI response:", result);
      setShowChart(true);
    } catch (err) {
      setError("Failed to analyze the image. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSend = () => {
    if (file) {
      sendImg(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreviewUrl(null);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <Image
          src="/testResult.png"
          alt="Lab Icon"
          className="mx-auto mb-4"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-semibold">
          Лабораторийн болон эрт илрүүлэх үзлэгийн шинжилгээнүүд
        </h1>
        <p className="text-gray-600">
          Шинжилгээнүүдийн үр дүнгээ харж, бодит зөвлөгөө аван, биомаркерийн
          динамикаа хянаарай
        </p>
      </div>
      <Input
        className="w-1/2 h-12 rounded-full px-4 py-2"
        id="lab-test"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {file && (
        <div className="flex flex-col items-center space-y-2 mt-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-20 object-cover rounded-md border"
            />
          ) : (
            <div className="flex items-center space-x-2 text-zinc-500">
              <FileIcon className="w-6 h-6" />
              <span>{file.name}</span>
            </div>
          )}
        </div>
      )}
      <Button
        variant="submit"
        className="mt-5 w-36"
        size="medium"
        disabled={!file || loading}
        handler={handleSend}
      >
        {loading ? "Processing..." : "Дараах"}
      </Button>
      {showChart && <BloodWorkChart />}
    </div>
  );
};

export default LabTestsScreening;