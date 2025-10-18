import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-200/10 blur-3xl blob-animation"></div>
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-200/10 blur-3xl blob-animation"></div>
      </div>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;