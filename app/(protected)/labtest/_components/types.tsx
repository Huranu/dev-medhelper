"use client";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Types {
  en: string;
  mn: string;
}

// interface TypeSelectionProps {
//   onNext: () => void;
//   onBack: () => void;
// }

const types: Types[] = [
  { en: "blood test", mn: "Цусны ерөнхий шинжилгээ" },
  { en: "urine test", mn: "Шээсний ерөнхий шинжилгээ" },
  { en: "other", mn: "Бусад" },
];

const TypeSelection: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<Types[]>([]);

  const toggleType = (type: Types) => {
    setSelectedTypes((prev) =>
      prev.some((t) => t.en === type.en)
        ? prev.filter((t) => t.en !== type.en)
        : [...prev, type]
    );
  };

  return (
    <div className="h-full mx-auto space-y-6 sm:mb-0 mb-15 w-9/10">
      <div className="p-4">
        <Image
            src="/types.png"
            alt="Lab Icon"
            className="mx-auto mb-2"
            width={90}
            height={90}
                            />
              <h1 className="text-2xl font-bold mb-6 text-center">Шинжилгээний төрлийг сонгоно уу.</h1>
        <div className="flex flex-col w-6/10 justify-center mx-auto gap-4 overflow-y-auto">
          {types.map((t) => (
            <div
              key={t.en}
              className={`p-3 text-lg border rounded-lg text-center cursor-pointer ${
                selectedTypes.some((e) => e.en === t.en)
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

      {/* <div className="flex justify-between px-4">
        <Button className="cursor-pointer border-purple-700 bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent mt-5 w-50 h-15" variant="outline" onClick={onBack}>
  
  <p className="text-lg">Буцах</p>
</Button>
        <Button
            onClick={onNext}
            className="bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 cursor-pointer mt-5 w-50 h-15"
            >
            <p className="text-lg">Үргэлжлүүлэх</p>
            </Button>

      </div> */}
    </div>
  );
};

export default TypeSelection;
