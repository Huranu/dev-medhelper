"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  { en: "microbiology", mn: "Микробиологи" },
  { en: "biochemistry", mn: "Биохими" },
  { en: "hematology", mn: "Хематологи" },
  { en: "molecule biology", mn: "Молекул биологи" },
  { en: "tumor marker", mn: "Хавдрын маркер" },
  { en: "immunology", mn: "Иммунологи" },
  { en: "cytology", mn: "Цитологи" },
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
    <div className="h-full max-w-2xl mx-auto space-y-6">
      <div className="p-4">
        <Image
            src="/types.png"
            alt="Lab Icon"
            className="mx-auto mb-2"
            width={90}
            height={90}
                            />
              <h1 className="text-2xl font-bold mb-6 text-center">Шинжилгээний төрлийг сонгоно уу.</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
          {types.map((t) => (
            <div
              key={t.en}
              className={`p-3 text-lg border rounded-lg text-center cursor-pointer ${
                selectedTypes.some((e) => e.en === t.en)
                  ? "border-blue-200 bg-blue-100"
                  : "border-gray-300"
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
