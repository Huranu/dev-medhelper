"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Button from "./components/button";
import Image from "next/image";
import { CircleX, Cloud, FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LabTestsScreening: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

      localStorage.setItem("labTestResult", JSON.stringify(result.result));

      router.push("lab-test/result");
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
      <div className="w-full max-w-md mx-auto">
      <div
        className="border-2 border-dashed border-blue-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
        // onClick={handleButtonClick}
      >
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {file ? (
        <div className=" relative flex flex-col items-center space-y-2 mt-4 p-5">
          <CircleX className=" absolute right-0 top-0 cursor-pointer" onClick={()=> {
            setFile(null);
            setPreviewUrl(null);
          }}/>
          {previewUrl ? (
            <Image
              height={300}
              width={300}
              src={previewUrl}
              alt="Preview"
              className="object-cover rounded-md border"
            />
          ) : (
            <div className="flex items-center space-x-2 text-zinc-500">
              <FileIcon className="w-6 h-6" />
              <span>{file.name}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Cloud className="h-12 w-12 text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Upload File</p>
          <Input
              className="w-full h-12 rounded-full px-4 py-2"
              id="lab-test"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
        </div>
      )}
      </div>
    </div>
      <Button
        variant="submit"
        className="mt-5 w-36"
        size="medium"
        disabled={!file || loading}
        handler={handleSend}
      >
        {loading ? "Processing..." : "Дараах"}
      </Button>
    </div>
  );
};

export default LabTestsScreening;