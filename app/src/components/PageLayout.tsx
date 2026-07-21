import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
