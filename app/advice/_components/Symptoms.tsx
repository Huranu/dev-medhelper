"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Trash } from 'lucide-react';
import { ScanHeart } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select"
import { useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const symptoms = [
  { value: "tolgoi-uvduh", label: "Толгой өвдөх" },
  { value: "hanialgah", label: "Ханиалгах" },
  { value: "haluurah", label: "Халуурах" },
  { value: "noos-goojih", label: "Нус гоожих" },
  { value: "amissgal-dutagdah", label: "Амьсгал давчдах" },
  { value: "dotor-muuhairah", label: "Дотор муухайрах" },
  { value: "setgel-gutrah", label: "Сэтгэл гутрал" },
]

 function Combobox({
  onSymptomSelect,
}: {
  onSymptomSelect?: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const selected = symptoms.find((symptom) => symptom.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border-gray-100 w-[450px] justify-between"
        >
          {selected ? selected.label : "Шинж тэмдэг сонгох"}
          <ChevronsUpDown className="h-4 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-gray-100 ml-2 w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Шинж тэмдэг хайх..." />
          <CommandList>
            <CommandEmpty>Илэрц олдсонгүй.</CommandEmpty>
            <CommandGroup>
              {symptoms.map((symptom) => (
                <CommandItem
                  key={symptom.value}
                  value={symptom.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue
                    setValue(newValue)
                    setOpen(false)
                    onSymptomSelect?.(newValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === symptom.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {symptom.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function SymptomDuration({ onAdd }: { onAdd: (duration: number, unit: string) => void }) {
  const [duration, setDuration] = useState<number | "">("")
  const [unit, setUnit] = useState("hours")

  return (
    <Card className=" border-gray-100 ml-2 w-[512px]">
      <CardHeader>
        <CardTitle className="text-sm">
          Таны шинж тэмдэг хэр удаан үргэлжилсэн бэ?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-end space-x-4">
        <Input className="w-20"
          id="duration"
          type="number"
          min={0}
          placeholder="0"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Сонгох..." />
          </SelectTrigger>
          <SelectContent className="border-gray-100">
            <SelectItem value="minutes">Минут</SelectItem>
            <SelectItem value="hours">Цаг</SelectItem>
            <SelectItem value="days">Өдөр</SelectItem>
            <SelectItem value="weeks">Долоо хоног</SelectItem>
            <SelectItem value="months">Сар</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-sky-500 hover:bg-sky-700 text-white"
          onClick={() => {
            if (duration !== "") onAdd(Number(duration), unit)
          }}
        >
          Нэмэх
        </Button>
      </CardContent>
    </Card>
  )
}


    export default function SymptomsForm() {
    const [selectedSymptom, setSelectedSymptom] = useState("")
    const [addedSymptoms, setAddedSymptoms] = useState<
      { symptom: string; duration: number; unit: string }[]
    >([]);
    const [showOptions, setShowOptions] = useState(false)

    const handleAddSymptom = (duration: number, unit: string) => {
      if (selectedSymptom) {
        setAddedSymptoms((prev) => [
          ...prev,
          { symptom: selectedSymptom, duration, unit },
        ])
        setSelectedSymptom("")
        setShowOptions(true)
      }
    }

    const handleAddMore = () => {
        setShowOptions(false)
    }

    function getUnitLabel(unit: string) {
    switch (unit) {
      case "minutes": return "минут";
      case "hours": return "цаг";
      case "days": return "өдөр";
      case "weeks": return "долоо хоног";
      case "months": return "сар";
      default: return unit;
    }
  }

  const handleDelete = (index: number) => {
  setAddedSymptoms((prev) => prev.filter((_, i) => i !== index))
}



    return (
  <div className="w-full h-[77vh] p-4 bg-white rounded-xl shadow space-y-4 flex flex-col justify-start items-center">
    <div className="flex flex-row justify-items-center items-center space-x-2
 text-lg text-sky-600 font-semibold"><ScanHeart className=" mr-2"/>Танд ямар шинж тэмдгүүд илэрч байна вэ?</div>
    <div className=" grid grid-cols-3 gap-4">
      {addedSymptoms.map((s, i) => (
        <Card key={i} className="border-gray-100 relative w-[170px] ">
          <button
            onClick={() => handleDelete(i)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <Trash className="w-4 h-4" />
          </button>

          <CardContent>
            <div className="mr-4 font-medium">
              {symptoms.find((sym) => sym.value === s.symptom)?.label ?? s.symptom}
            </div>
            <div className="text-sm text-muted-foreground">
              {s.duration} {getUnitLabel(s.unit)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Combobox and SymptomDuration at the bottom */}
    {!selectedSymptom && !showOptions && (
      <Combobox onSymptomSelect={setSelectedSymptom} />
    )}

    {selectedSymptom && (
      <div className="animate-in fade-in duration-300">
        <SymptomDuration onAdd={handleAddSymptom} />
      </div>
    )}

    {/* Finish & Add more buttons */}
    {showOptions && (
      <div className="space-x-2">
        <Button className="hover:bg-gray-200" variant="secondary" onClick={() => alert("Duusgah")}>
          Дуусгах
        </Button>
        <Button className="bg-sky-500 hover:bg-sky-700" onClick={handleAddMore}>Шинж тэмдэг нэмэх</Button>
      </div>
    )}
  </div>
)

}