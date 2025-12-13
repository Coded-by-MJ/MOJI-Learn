import { UserNavbar } from "@/components/global/Navbar";

export default function ConsumerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  );
}
