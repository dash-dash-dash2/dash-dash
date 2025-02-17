"use client";

import Dashboard from "./pages/Dashboard";
import WorkSpace from "./pages/workSpace";
import Form from "./home/page";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
const Delivery: React.FC = () => {
  const pathname = usePathname();

  const renderPage = () => {
    switch (pathname) {
      case "/delivery/dashboard":
        return <Dashboard />;
      case "/delivery/workSpace":
        return <WorkSpace />;
      case "/delivery/form":
        return <Form />;
      default:
        return <Dashboard />; // Default to Dashboard
    }
  };

  return <div>{renderPage()}</div>;
};

export default Delivery;
