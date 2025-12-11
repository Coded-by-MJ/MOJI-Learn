import Navbar from "@/components/global/Navbar";

export default function ConsumerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <Navbar />
      {children}
    </>
  )
}