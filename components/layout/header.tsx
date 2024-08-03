'use client';
import React from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { useAuthContext } from '@/provider/auth.provider';
import { IAuthContext } from '@/types';
import { Search, Bell, HelpCircle } from 'lucide-react'; // Import necessary icons
import Image from 'next/image'; // Assuming next/image for optimized image loading

const Header = () => {
  const { user } = useAuthContext() as IAuthContext;

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex items-center bg-white  ml-72">
      <nav className="flex h-16 items-center justify-between w-full px-4">
        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-96 p-2 pl-10 rounded-md text-grey border border-gray-300"
            />
            <Search className="absolute top-2 left-2 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <HelpCircle className="h-6 w-6 text-gray-600 cursor-pointer" />
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
          <UserNav user={user} />
<<<<<<< HEAD
          <ThemeToggle />
=======
         <ThemeToggle />
>>>>>>> 1bdecbcec0d41e49114f6c13918437b0ac1965ca
        </div>

        {/* Mobile Sidebar Toggle (Optional) */}
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
      </nav>
    </div>
  );
};

export default Header;
