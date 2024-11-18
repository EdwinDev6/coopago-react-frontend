import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useCallback, useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  })
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <main className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
