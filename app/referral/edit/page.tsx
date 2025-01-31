// 'use client';
// import React, { Suspense } from 'react';
// import BreadCrumb from '@/components/breadcrumb';
// import MainLayout from '@/components/layout/main-layout';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { ViewUser } from '@/components/forms/view-user/view-user';
// import ProtectedRoute from '@/components/protectedRoute';
// import { ReferralUpdateForm } from '@/components/forms/referral-stepper/page';




// const breadcrumbItems = [{ title: 'Referral-Management', link: '/referral/' },
//   { title: 'View Details', link: '' }];

// export default function Edit() {
//   return (
//     <ProtectedRoute>
//     <MainLayout meta={{ title: 'View User' }}>
//       <ScrollArea className="h-full">
//         <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
//           <BreadCrumb items={breadcrumbItems} />
//           <Suspense fallback={<div>Loading...</div>}>
//           <ReferralUpdateForm/>
//           </Suspense>
//         </div>
//       </ScrollArea>
//     </MainLayout>
//     </ProtectedRoute>
//   );
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
