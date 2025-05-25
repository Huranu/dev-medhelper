"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../_components/input";
import Button from "../_components/button";
import Image from "next/image";
import { CircleX, Cloud, FileIcon, Frown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface LabTestUploadProps {
  onBack: () => void;
  // selected: string | null
}

const LabTestUpload: React.FC<LabTestUploadProps> = ({ onBack }) => {
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
    // console.log("selected passed in upload: ",selected);
    // if (selected) {
    //   formData.append("selected", selected);  
      
    // }

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
      router.push("labtest/result");

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
    <div className="flex flex-col relative bg-none w-full">
      <Dialog open={loading}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
          </div>
          <div className="flex justify-center items-center py-2">Таны шинжилгээний хариуг боловсруулж байна...</div>

        </DialogContent>
      </Dialog>

      {/* <Image
        src="/testResult.png"
        alt="Lab Icon"
        className="mx-auto mb-2"
        width={250}
        height={250}
      /> */}
      <h1 className="text-2xl font-bold mb-6 text-center">Шинжилгээний хариугаа оруулна уу.</h1>

      <div className="w-5/10 h-full mx-auto">
        <div
          className=" border-2 border-dashed h-full border-green-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
        >
          {error && <p className="text-red-500 mt-2">{<Frown className="w-40 h-40" />}</p>}
          {file ? (
            <div className=" relative flex flex-col items-center space-y-2 p-5">
              <CircleX className=" absolute right-0 top-0 cursor-pointer" onClick={() => {
                setFile(null);
                setPreviewUrl(null);
              }} />
              {previewUrl ? (
                <Image
                  height={100}
                  width={100}
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
              <Cloud className="h-25 w-25 text-green-800 mb-2" />
              <p className="text-xl text-gray-500 p-3">Файл оруулах</p>
              <Input
                className="h-auto border-none shadow-none"
                id="lab-test"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className="sm:mt-5 mt-30 flex justify-center items-center sm:gap-20 gap-10 mx-auto">
        <Button
          handler={onBack}
          className="cursor-pointer border-purple-700 bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent w-35 h-15"
          size="large"
        >
          <p className="text-lg">Буцах</p>

        </Button>

        <Button
          variant="submit"
          className="h-15"
          size="large"
          disabled={!file || loading}
          handler={handleSend}
        >
          <p className="text-lg">
            {loading ? "Уншиж байна..." : "Шинжилгээ илгээх"}
          </p>
        </Button>
      </div>

    </div>
  );
};

export default LabTestUpload;