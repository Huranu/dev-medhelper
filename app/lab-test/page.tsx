"use client";
import React from "react";
// import Input from "./components/input";
import { Input } from "@/components/ui/input"
import Button from "./components/button";
import Image from "next/image";
import { FileIcon } from "lucide-react";

const LabTestsScreening: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const handleSend = () => {
    if (message || file) {
      console.log("Message from child:", message);
      if (file) console.log("File from child:", file.name);

      setMessage("");
      setFile(null);
    } else {
      console.log("Please enter a message or attach a file.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <Image src="/testResult.png" alt="Lab Icon" className="mx-auto mb-4" width={200} height={200}/>
        <h1 className="text-2xl font-semibold">Лабораторийн болон эрт илрүүлэх үзлэгийн шинжилгээнүүд</h1>
        <p className="text-gray-600">
          Шинжилгээнүүдийн үр дүнгээ харж, бодит зөвлөгөө аван,
          биомаркерийн динамикаа хянаарай
        </p>
      </div>
      <Input
        className="w-1/2 h-12 rounded-full px-4 py-2"
        id="lab-test"
        type="file"
        onChange={handleFileChange}
      />

      {file && (
        <div className="flex flex-col items-center space-y-2">
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
        disabled={file || message ? false : true}
        handler={handleSend}
      >
        Дараах
      </Button>
    </div>
  );
};

export default LabTestsScreening;