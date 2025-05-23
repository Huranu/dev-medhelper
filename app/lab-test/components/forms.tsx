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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MedicalFormData = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  symptoms?: string;
};

interface FormsProps {
  onSubmit: (data: MedicalFormData) => void;
}

export default function Forms({ onSubmit }: FormsProps) {
  const form = useForm<MedicalFormData>({
    defaultValues: {
        age: 0,
        gender: "",
        height: 0,
        weight: 0,
        symptoms: "",
    },
  });

  const handleSubmit = (data: MedicalFormData) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
    
    
      <h1 className="text-2xl font-bold mb-6 text-center">Ерөнхий мэдээлэл</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Age Field */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Нас</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Select */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Хүйс</FormLabel>
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

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Өндөр</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Өндрийг оруулна уу..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Жин</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Жинг оруулна уу..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
  type="submit"
  className="bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 cursor-pointer mt-5 w-50 h-15 mt-auto mx-auto block"
>
  <p className="text-lg">Үргэлжлүүлэх</p>
</Button>

        </form>
      </Form>
    </div>
  );
}
