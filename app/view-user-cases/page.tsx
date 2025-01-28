'use client';
import React, { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ViewPetClient } from '@/components/forms/view-pets/client';
import ProtectedRoute from '@/components/protectedRoute';
import UserCasesClient from '@/components/tables/view-user-cases/client';

const breadcrumbItems = [{ title: 'View Cases', link: '/viewCases' }];

export default function ViewUserCasePage() {

    return (
        <ProtectedRoute>
        <MainLayout meta={{ title: 'View Cases' }}>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                    <BreadCrumb items={breadcrumbItems} />
                    <Suspense fallback={<div>Loading...</div>}>
                    <UserCasesClient/>
                    </Suspense>
                </div>
            </ScrollArea>
        </MainLayout>
        </ProtectedRoute>
    );
}


