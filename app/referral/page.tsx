'use client'
// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import ProtectedRoute from '@/components/protectedRoute';
import { ComplaintManagementClient } from '@/components/tables/complaint-management-tables/client';
import { ReferralManagementClient } from '@/components/tables/referral-management-tables/client';
import { ReferralManagementViewClient } from '@/components/tables/referral-management-view-tables/client';
import ComplaintManagementUserPage from '@/components/tables/user-complaint-management-tables/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { getAllReferrals } from '../redux/actions/referralAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
const breadcrumbItems = [{ title: 'Referral Management', link: '/dashboard/referral' }];

export default function ReferralManagementPage() {

  // -------Api integration--------
  const dispatch = useDispatch<AppDispatch>();
  const { Referral, loading, error } = useSelector(
    (state: RootState) => state.referrals
  );

  console.log("refferal", Referral);

  useEffect(() => {
    dispatch(getAllReferrals({ page: 1, limit: 20 }))
      .unwrap()
      .catch((err: any) => {
        const errorMessage = err.message || 'Failed to fetch Referrals';
        ToastAtTopRight.fire({
          icon: 'error',
          title: typeof errorMessage === 'string' ? errorMessage : 'An error occurred',
        });
      });
  }, [dispatch]);

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Referral Management' }}>
              <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ReferralManagementClient initialData={[]} loading={false}/>
        <ReferralManagementViewClient initialData={Referral} loading={loading}/>
        {/* <ComplaintManagementUserPage  /> */}
      
      </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}