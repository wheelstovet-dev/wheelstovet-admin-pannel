'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { setLocalStorageItem, getLocalStorageItem } from '@/utils/localStorage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import { useRouter } from 'next/navigation';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const router=useRouter();
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const defaultActiveItem = '/dashboard';
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string>(defaultActiveItem);

  const handleExpand = (href: string) => {
    let newExpandedItems;
    if (expandedItems.includes(href)) {
      newExpandedItems = expandedItems.filter(item => item !== href);
    } else {
      newExpandedItems = [...expandedItems, href];
    }
    setExpandedItems(newExpandedItems);
    setLocalStorageItem('expandedItems', newExpandedItems);
  };

  const handleLogout = () => {
    // Remove any session data (for example, clear localStorage or sessionStorage)
    localStorage.clear();
    sessionStorage.clear();
  
    // Redirect to login page or home page after logout
    router.push('/auth/login');
  };

  const handleClick = (href: string) => {
    setActiveItem(href);
    setLocalStorageItem('activeItem', href);
    if (setOpen) setOpen(false);
  };

  useEffect(() => {
    const storedExpandedItems = getLocalStorageItem<string[]>('expandedItems');
    const storedActiveItem = getLocalStorageItem<string>('activeItem');

    if (storedExpandedItems) {
      setExpandedItems(storedExpandedItems);
    }

    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    } else {
      setActiveItem(defaultActiveItem);
    }
  }, []);

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 overflow-y-auto max-h-[80vh] no-scrollbar">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          const isExpanded = expandedItems.includes(item.href || '');
          const isActive = activeItem === item.href;

          if (item.title === 'Log Out') {
            return (
              <div key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={handleLogout} // Trigger the logout function on click
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer', // Added cursor-pointer class here
                        isActive ? 'bg-accent text-black' : 'transparent'
                      )}
                    >
                      <Icon className="ml-3 size-5" />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            );
          }
          

          return (
            <div key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {item.subItems ? (
                    <div
                      onClick={() => handleExpand(item.href || '')}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 mb-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        isActive ? 'bg-accent text-black' : '',
                        item.disabled && 'cursor-not-allowed'
                      )}
                    >
                      <Icon className="ml-3 size-5" />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.disabled ? '/' : item.href || '/'}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        isActive ? 'bg-accent text-black' : 'transparent',
                        item.disabled && 'cursor-not-allowed'
                      )}
                      onClick={() => handleClick(item.href || '/')}
                    >
                      <Icon className="ml-3 size-5" />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
              {item.subItems && isExpanded && (
                <div className="ml-6 space-y-1">
                  {item.subItems.map((subItem, subIndex) => {
                    const SubIcon = Icons[subItem.icon || 'arrowRight'];
                    const isSubActive = activeItem === subItem.href;
                    return (
                      <Tooltip key={subIndex}>
                        <TooltipTrigger asChild>
                          {subItem.href ? (
                            <Link
                              href={subItem.href}
                              className={cn(
                                'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                isSubActive ? 'bg-accent text-black' : 'transparent'
                              )}
                              onClick={() => handleClick(subItem.href || '')}
                            >
                              <SubIcon className="ml-3 size-5" />
                              {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                <span className="mr-2 truncate">{subItem.title}</span>
                              ) : (
                                ''
                              )}
                            </Link>
                          ) : (
                            <div
                              className={cn(
                                'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium cursor-not-allowed'
                              )}
                            >
                              <SubIcon className="ml-3 size-5" />
                              {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                <span className="mr-2 truncate">{subItem.title}</span>
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TooltipTrigger>
                        <TooltipContent
                          align="center"
                          side="right"
                          sideOffset={8}
                          className={!isMinimized ? 'hidden' : 'inline-block'}
                        >
                          {subItem.title}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
