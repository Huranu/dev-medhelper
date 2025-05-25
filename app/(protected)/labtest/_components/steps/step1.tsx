"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
type MedicalFormData = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  symptoms?: string;
};

export default function Step1() {
  const form = useForm<MedicalFormData>({
    defaultValues: {
      age: 21,
      gender: "male",
      height: 170,
      weight: 63,
      symptoms: "",
    },
  });


  return (
    <div className=" w-5/10 mx-auto">
      <Image
        src="/info.png"
        alt="Lab Icon"
        className="mx-auto mb-2"
        width={90}
        height={90}
      />
      <h1 className="text-2xl font-bold mb-6 text-center">Ерөнхий мэдээлэл</h1>

      <div className="grid grid-cols-2 gap-x-10 gap-y-6 overflow-y-auto">
        <Form {...form}>

          <div className="mb-4 font-bold">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Нас</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 font-bold">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Хүйс</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Хүйс сонгоно уу..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Эрэгтэй</SelectItem>
                      <SelectItem value="female">Эмэгтэй</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 font-bold">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Өндөр</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Өндрийг оруулна уу..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-4 font-bold">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-xl">Жин</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Жинг оруулна уу..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button
    type="submit"
    className="bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 cursor-pointer mt-5 w-50 h-15 mt-auto mx-auto block"
  >
    <p className="text-lg">Үргэлжлүүлэх</p>
  </Button> */}

        </Form>
      </div>
    </div>
  );
}
