import { Button } from "@/components/ui/button";

export default function Response() {
  return (
    <div className="w-full h-[77vh] p-4 bg-white rounded-xl shadow space-y-4 flex flex-col justify-between">
      <h2>Response</h2>
      <p></p>
      <Button className="w-32 flex flex-cols items-center justify-center hover:bg-blue-500 bg-blue-700" >
        Ойлголоо.
        </Button>
    </div>
  );
}