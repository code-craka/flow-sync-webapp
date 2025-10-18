import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import AppHeader from '@/components/layout/AppHeader';
import AiAssistantButton from '@/components/shared/AiAssistantButton';
import ShoppingCart from '@/components/ShoppingCart';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setIsCartOpen={setIsCartOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <AiAssistantButton />
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </div>
  );
};

export default AppLayout;