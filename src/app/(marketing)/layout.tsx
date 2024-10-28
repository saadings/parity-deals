import type { PropsWithChildren } from "react";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="selection:bg-[hsl(320,65%,52%,20%)]">
      <Navbar />
      {children}
    </div>
  );
};

export default MarketingLayout;
