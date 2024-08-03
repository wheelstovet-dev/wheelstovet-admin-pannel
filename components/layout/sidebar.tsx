'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import backgroundImage from '@/public/images/navbarFrame.png';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
 

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r pt-4 md:block sidebar object-contain`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="flex flex-col items-center justify-start py-0">
        <Link href="/">
          <img src="/images/Group 20.png" alt="Logo" className="h-11 mb-4" />
        </Link>
      </div>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
      <img src="/images/navbarFrame.png" alt="Logo" className="absolute top-0 h-screen w-full object-fill z-[-1] mb-4" />
    </nav>
  );
}
