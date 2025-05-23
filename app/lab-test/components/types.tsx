"use client";
import { useState } from "react";

interface Types {
  en: string;
  mn: string;
}

interface TypeSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

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

const TypeSelection: React.FC<TypeSelectionProps> = ({ onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState<Types[]>([]);

  const toggleType = (type: Types) => {
    setSelectedTypes((prev) =>
      prev.some((t) => t.en === type.en)
        ? prev.filter((t) => t.en !== type.en)
        : [...prev, type]
    );
  };

  return (
    <div className="h-full space-y-6">
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">
          Шинжилгээний төрлийг сонгоно уу
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
          {types.map((t) => (
            <div
              key={t.en}
              className={`p-3 text-sm border rounded-lg text-center cursor-pointer ${
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

      <div className="flex justify-between px-4">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Буцах
        </button>
        <button
          onClick={onNext}
          disabled={selectedTypes.length === 0}
          className={`px-4 py-2 rounded text-white ${
            selectedTypes.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Дараах
        </button>
      </div>
    </div>
  );
};

export default TypeSelection;
