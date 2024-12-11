import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" absolute right-[1px] w-[1280px]">
        <Navbar />
        {children}
      </div>
      <Sidebar />
    </>
  );
}
