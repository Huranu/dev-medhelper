import Header from "@/components/partails/header";
import SideBar from "@/components/partails/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="sm:hidden flex flex-col flex-grow h-screen overflow-hidden">
        <Header />
        {children}
      </div>
      <div className="sm:flex hidden flex-grow h-screen overflow-hidden">
        <SideBar />
        <div className="flex-1 bg-[#F2F8FC] overflow-auto max-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
