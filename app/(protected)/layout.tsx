import SideBar from "@/components/partails/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-grow h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 bg-[#F2F8FC] overflow-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}
