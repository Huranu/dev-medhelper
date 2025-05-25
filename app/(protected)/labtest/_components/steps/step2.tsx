"use client";
import { useState } from "react";
import Image from "next/image";

interface Types {
  en: string;
  mn: string;
}

const types: Types[] = [
  { en: "blood test", mn: "Цусны ерөнхий шинжилгээ" },
  { en: "urine test", mn: "Шээсний ерөнхий шинжилгээ" },
  { en: "other", mn: "Бусад" },
];

const Step2: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<Types[]>([{ en: "blood test", mn: "Цусны ерөнхий шинжилгээ" }]);

  const toggleType = (type: Types) => {
    setSelectedTypes((prev) =>
      prev.some((t) => t.en === type.en)
        ? prev.filter((t) => t.en !== type.en)
        : [...prev, type]
    );
  };

  return (
    <div className="h-full mx-auto space-y-6 mb-0 sm:mb-15 w-full sm:w-6/10">
      <div className="p-4">
        <Image
          src="/types.png"
          alt="Lab Icon"
          className="mx-auto mb-2"
          width={90}
          height={90}
        />
        <h1 className="text-2xl font-bold mb-6 text-center">Шинжилгээний төрлийг сонгоно уу.</h1>
        <div className="flex flex-col w-9/10 justify-center mx-auto gap-4 overflow-y-auto">
          {types.map((t) => (
            <div
              key={t.en}
              className={`p-3 text-lg border rounded-lg text-center cursor-pointer ${selectedTypes.some((e) => e.en === t.en)
                ? "border-green-600 bg-blue-100"
                : "border-purple-500"
                }`}
              onClick={() => toggleType(t)}
            >
              {t.mn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
