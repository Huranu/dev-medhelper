"use client";
import React from "react";
import Input from "./components/input";
import Button from "./components/button";
import Image from "next/image";

const LabTestsScreening: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center mb-8">
        <Image src="/public/testResult.png" alt="Lab Icon" className="mx-auto mb-4" width={60} height={32}/>
        <h1 className="text-2xl font-semibold">Лабораторийн болон эрт илрүүлэх үзлэгийн шинжилгээнүүд</h1>
        <p className="text-gray-600">
          Шинжилгээнүүдийн үр дүнгээ харж, бодит зөвлөгөө аван,
          биомаркерийн динамикаа хянаарай
        </p>
      </div>

      <Input
        message={message}
        file={file}
        setMessage={setMessage}
        setFile={setFile}
      />
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