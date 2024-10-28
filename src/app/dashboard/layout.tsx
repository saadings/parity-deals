import type { PropsWithChildren } from "react";
import NavBar from "./_components/Navbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-accent/5">
      <NavBar />
      <div className="container py-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
