'use client'
import { Suspense } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { CreateCaseForm } from '@/components/forms/case-stepper/createCase';
import MainLayout from '@/components/layout/main-layout';
// import CaseFinanceClient from '@/components/tables/case-financial-table/client';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '@/components/protectedRoute';

const breadcrumbItems = [{ title: 'Case', link: '/dashboard/case' }];

export default function CaseForm() {
  // const dispatch = useDispatch<AppDispatch>();
  
  // const searchParams = useSearchParams();
  // const serviceId = searchParams.get('id');

  // const { cases: caseData, loading } = useSelector((state: RootState) => state.caseManagement);
  // const isEnabled = true;

  // useEffect(() => {
  //   if (serviceId) {
  //     // Fetch the case data by ID
  //     dispatch(getCaseById(serviceId));
  //   }
  // }, [serviceId, dispatch]);

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Subscription' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <Suspense fallback={<div>Loading...</div>}>
            <CreateCaseForm />
            </Suspense>
          {/* <CaseFinanceClient /> */}
        </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}
