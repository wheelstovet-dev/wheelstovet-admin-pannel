'use client'; // Add this directive at the top

import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Import Filler for area chart
} from 'chart.js';
import { RecentCases } from '@/components/recent-cases';
import { caseData, petData, unassignedData } from '@/constants/casesData';
import { EmployeeEsclatedClient } from '@/components/tables/employee-esclation-tables/client';
import { EnquiryClient } from '@/components/tables/enquiry-management-table/client';
import ProtectedRoute from '@/components/protectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getAllEnquiries, getPendingSubscriptions, getTodaysCases } from '../redux/actions/dashboardAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { PendingSubscriptionClient } from '@/components/tables/pending-subscription-table/client';
import CaseManagementClient from '@/components/tables/cases-tables/client';
import UnassignedCasesClient from '@/components/tables/unassigned-cases-dashboard-table/client';
import TimeSlotSelector from '@/components/time-slot';
import AvailableSlots from '@/components/time-slot';
import DashboardCasesGraph from '@/components/dashboardCasesGraph';
import DashboardSubscriptionChart from '@/components/dashboardSubscriptionGraph';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler
);

interface GaugeChartProps {
  percentage: number;
  color: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ percentage, color }) => {
  const circumference = 2 * Math.PI * 15.9155;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
      <svg className="h-20 w-20" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.8"
        />
        <path
          className={color}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

interface CardComponentProps {
  title: string;
  subtitle: string;
  image: string;
  color: string;
  defaultDropdown: string;
  initialPercentage: number;
  onClick: () => void; // Add onClick prop
  
}

const CardComponent: React.FC<CardComponentProps> = ({ title, subtitle, image, color, defaultDropdown, initialPercentage,onClick }) => {
  const [dropdownValue, setDropdownValue] = useState(defaultDropdown);
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <Card className="w-full md:w-auto cursor-pointer" onClick={onClick}>
      <CardHeader className="flex flex-col space-y-1 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </CardTitle>
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-gray-600 border border-gray-300 rounded px-2 py-1">
              {dropdownValue} <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {['Daily', 'Weekly', 'Monthly'].map((value) => (
                <DropdownMenuItem key={value} onClick={() => setDropdownValue(value)}>
                  {value}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
        <CardTitle className="text-lg font-bold">
          {subtitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between p-2">
        <img src={image} alt={subtitle} className="h-20 w-20" />
        <div className="flex flex-col items-center">
          <GaugeChart percentage={percentage} color={color} />
        </div>
      </CardContent>
    </Card>
  );
};


export default function Page() {
  const [selectedCard, setSelectedCard] = useState(""); // Track selected card
  //const [graphData, setGraphData] = useState(initialData);
  //const [graphDropdownValue, setGraphDropdownValue] = useState('Monthly');
  const [selectedCase, setSelectedCase] = useState('Dog Walking');


  const enquiryRef = useRef<HTMLDivElement>(null);
const petTaxiRef = useRef<HTMLDivElement>(null);
const dogWalkingRef=useRef<HTMLDivElement>(null);
const handleCardClick = (card: string) => {
  setSelectedCard(card); // Selected card ko update karein

  // Scroll to respective section
  if (card === "enquiry" && enquiryRef.current) {
    enquiryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (card === "petTaxi" && petTaxiRef.current) {
    petTaxiRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  else if (card === "dogWalking" && dogWalkingRef.current) {
    dogWalkingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};



  // -----------------------API INTEGRATION---------------

  const dispatch = useDispatch<AppDispatch>();
  
  const {pendingSubscriptions, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  // ========== PENDING SUBSCRIPTION SECTION ==============
  const getPendingSubs = async()=>{
    await dispatch(getPendingSubscriptions({ page: 1, limit: 20 }))
    .unwrap()
    .catch((err: any) => {
      //const errorMessage = err.message || 'Failed to fetch Pending Subscription';
      // ToastAtTopRight.fire({
      //   icon: 'error',
      //   title: typeof errorMessage === 'string' ? errorMessage : 'An error occurred',
      // });
    });
       
  }

  useEffect(() => {
    //get all Enquiries
    //getEnqueries();

    //get all Pending Subscriptions
    getPendingSubs();
  }, [dispatch]);

  console.log(pendingSubscriptions);

  // const handleCardClick = (card: string) => {
  //   setSelectedCard(card); // Update selected card
  // };

  return (
    <ProtectedRoute>
    <MainLayout meta={{ title: 'Dashboard' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                <CardComponent
                  title="CASE"
                  subtitle="DOG WALKING"
                  image="/images/Frame (2).png"
                  color="text-red-500"
                  defaultDropdown="Daily"
                  initialPercentage={25}
                  onClick={() => handleCardClick('dogWalking')}
                />
                <CardComponent
                  title="CASE"
                  subtitle="ENQUIRY"
                  image="/images/Frame (3).png"
                  color="text-green-500"
                  defaultDropdown="Weekly"
                  initialPercentage={50}
                  onClick={() => handleCardClick('enquiry')}
                />
                {/* <CardComponent
                  title="CASE"
                  subtitle="CLIENT ESCALATED"
                  image="/images/Frame (4).png"
                  color="text-yellow-500"
                  defaultDropdown="Daily"
                  initialPercentage={20}
                />
                <CardComponent
                  title="CASE"
                  subtitle="PET HANDLING"
                  image="/images/handle.png"
                  color="text-purple-500"
                  defaultDropdown="Weekly"
                  initialPercentage={30}
                /> */}
                <CardComponent
                  title="CASE"
                  subtitle="PET TAXI"
                  image="/images/taxi.png"
                  color="text-red-500"
                  defaultDropdown="Monthly"
                  initialPercentage={40}
                  onClick={() => handleCardClick('petTaxi')}
                />
                 {/* <CardComponent
                  title="CASE"
                  subtitle="ASSOCIATED SALON"
                  image="/images/salon.png"
                  color="text-red-500"
                  defaultDropdown="Monthly"
                  initialPercentage={40}
                /> */}
              </div>
              
              {/* Graph for dashboard */}
              <DashboardSubscriptionChart/>
              <DashboardCasesGraph/>
              
              <div className="flex flex-wrap my-2 justify-between mx-3">
                {/* Card 1: Cases for Today */}
                <Card className="w-full lg:w-3/3 lg:me-3 mb-4">
                  {/*  */}
                  <CardContent>
                    <RecentCases/>
                  </CardContent>
                </Card>

                
                  {/* Available Slots for today */}
                  
                    <AvailableSlots/>
            
                

                {/* Card 2: Unassigned Cases */}
                {/* <Card className="w-full lg:w-3/3 lg:me-3 mb-4">
                  <CardHeader>
                    <CardTitle>Unassigned Cases</CardTitle>
                    <CardDescription>
                      You have 26 Unassigned Cases.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentCases cases={unassignedData} />
                  </CardContent>
                </Card> */}

              </div>

                <div className="flex  justify-between mx-3 lg:flex-nowrap flex-wrap ">
                <div className="">
                <div ref={petTaxiRef}>
                  <UnassignedCasesClient />
                </div>
                <div ref={enquiryRef}>
                  <EnquiryClient/>
                </div>
                <div ref={dogWalkingRef}>
                <PendingSubscriptionClient initialData={pendingSubscriptions} loading={loading} />
                </div>

                  {/* <EnquiryClient initialData={Enquiries} loading={loading}/> */}
                  <EmployeeEsclatedClient />

                </div>
                 
                  
                </div>
                
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </MainLayout>
    </ProtectedRoute>
  );
}
