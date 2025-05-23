"use client";
import { useState } from "react";

interface SpecimenProps {
  onNext: () => void;
  onBack: () => void;
}

const specimens = [
  { en: "blood", mn: "Цус" },
  { en: "urine", mn: "Шээс" },
  { en: "stool", mn: "Өтгөн" },
  { en: "saliva", mn: "Шүлс" },
  { en: "sputum", mn: "Цэр" },
  { en: "tissue", mn: "Эд эс" },
  { en: "fluid", mn: "Шингэн" },
  { en: "swab", mn: "Тампон" },
];

const SpecimenSelection: React.FC<SpecimenProps> = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full space-y-6">
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">Сорьцын төрлийг сонгоно уу</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
          {specimens.map((specimen) => (
            <div
              key={specimen.en}
              className={`p-3 text-sm border rounded-lg text-center cursor-pointer ${
                selected === specimen.en
                  ? "border-blue-200 bg-blue-100"
                  : "border-gray-300"
              }`}
              onClick={() => setSelected(specimen.en)}
            >
              {specimen.mn}
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
          disabled={!selected}
          className={`px-4 py-2 rounded text-white ${
            selected ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
          }`}
        >
          Дараах
        </button>
      </div>
    </div>
  );
};

export default SpecimenSelection;
