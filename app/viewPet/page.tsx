'use client';
import React, { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ViewPets } from '@/components/forms/view-pets/view-pets';

const breadcrumbItems = [{ title: 'View', link: '/user-management/page.tsx' }];

export default function View() {

    return (
        <MainLayout meta={{ title: 'View Pets' }}>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    <BreadCrumb items={breadcrumbItems} />
                    <Suspense fallback={<div>Loading...</div>}>
                    <ViewPets />
                    </Suspense>
                </div>
            </ScrollArea>
        </MainLayout>
    );
}
