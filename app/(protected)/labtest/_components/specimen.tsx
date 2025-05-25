"use client";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import Image from "next/image";


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
type Props = {
  selected: string | null
  setSelected: (value: string) => void
}
const SpecimenSelection: React.FC<Props> = ({ selected, setSelected }) => {
  // const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-full max-w-md mx-auto space-y-6 sm:mb-0 mb-30">
      <div className="p-4">
        <Image
          src="/specimen.png"
          alt="Lab Icon"
          className="mx-auto mb-2"
          width={90}
          height={90}
        />
        <h1 className="text-2xl font-bold mb-6 text-center">Сорьцын төрлийг сонгоно уу.</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
          {specimens.map((specimen) => (
            <div
              key={specimen.en}
              className={`p-3 text-lg border rounded-lg text-center cursor-pointer ${selected === specimen.en
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

      {/* <div className="flex justify-between px-4">
        <Button className="mt-5 w-50 h-15" variant="outline" onClick={onBack}>

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

export default SpecimenSelection;
