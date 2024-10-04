import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
