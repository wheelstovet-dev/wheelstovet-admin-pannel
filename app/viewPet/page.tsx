'use client';
import React, { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ViewPetClient } from '@/components/forms/view-pets/client';
import ProtectedRoute from '@/components/protectedRoute';


const breadcrumbItems = [{ title: 'User-Management', link: '/user-management/' },
    { title: 'View Details', link: '' }];
  

export default function View() {

    return (
        <ProtectedRoute>
        <MainLayout meta={{ title: 'View Pets' }}>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    <BreadCrumb items={breadcrumbItems} />
                    <Suspense fallback={<div>Loading...</div>}>
                    <ViewPetClient />
                    </Suspense>
                </div>
            </ScrollArea>
        </MainLayout>
        </ProtectedRoute>
    );
}
