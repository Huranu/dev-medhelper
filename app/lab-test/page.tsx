"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Button from "./components/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleX, Cloud, FileIcon, ChevronLeft, Frown } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LabTestsScreening: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="flex flex-col relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-4 overflow-hidden" onMouseMove={handleMouseMove}>
      <Dialog open={loading}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
          </div>
            <div className="flex justify-center items-center py-2">Таны шинжилгээний хариуг боловсруулж байна...</div>

        </DialogContent>
      </Dialog>

      <div className="text-center mb-8">
      <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 mix-blend-overlay blur-3xl"
          animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>
      <motion.header
            className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex text-2xl font-extrabold text-blue-700 gap-6">MedHelper
                <Link href="/">
                  <ChevronLeft className="cursor-pointer pt-1" height={33} width={33}/>
                </Link>
            </div>
      </motion.header>
        <Image
          src="/testResult.png"
          alt="Lab Icon"
          className="mx-auto mb-2"
          width={250}
          height={250}
        />
        <h1 className="text-5xl font-semibold">
          Лабораторийн болон эрт илрүүлэх үзлэгийн шинжилгээнүүд
        </h1>
        <p className="mt-3 text-2xl text-gray-600">
          Шинжилгээнүүдийн үр дүнгээ харж, бодит зөвлөгөө аван, биомаркерийн
          динамикаа хянаарай
        </p>
      </div>
      <div className="w-full max-w-[900px] h-full mx-auto">
      <div
        className=" border-2 border-dashed h-full border-blue-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
      >
      {error && <p className="text-red-500 mt-2">{<Frown className="w-40 h-40"/>}</p>}
      {file ? (
        <div className=" relative flex flex-col items-center space-y-2 p-5">
          <CircleX className=" absolute right-0 top-0 cursor-pointer" onClick={()=> {
            setFile(null);
            setPreviewUrl(null);
          }}/>
          {previewUrl ? (
            <Image
              height={350}
              width={350}
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
          <Cloud className="h-25 w-25 text-blue-500 mb-2" />
          <p className="text-md text-gray-500 p-3">Файл оруулах</p>
          <Input
              className="w-full h-auto rounded-full px-4 py-2"
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
        className="mt-5 w-50 h-15 mx-auto"
        size="large"
        disabled={!file || loading}
        handler={handleSend}
      >
        <p className="text-lg">
          {loading ? "Уншиж байна..." : "Үргэлжлүүлэх"}
        </p>
      </Button>
    </div>
  );
};

export default LabTestsScreening;