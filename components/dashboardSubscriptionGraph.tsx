'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ArrowDown, ArrowUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

const DashboardSubscriptionChart: React.FC = () => {
  const [subscriptionsData, setSubscriptionsData] = useState<number[]>(Array(12).fill(0));
  const [inquiriesData, setInquiriesData] = useState<number[]>(Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subscriptionsRes, inquiriesRes] = await Promise.all([
          fetch('http://15.206.246.97:3001/admin/dashboard/monthlySubscriptions', {
            method: 'GET',
          }),
          fetch('http://15.206.246.97:3001/admin/dashboard/monthlyEnquiries', {
            method: 'GET',
          })
        ]);
  
        const subscriptionsJson = await subscriptionsRes.json();
        const inquiriesJson = await inquiriesRes.json();
  
        if (subscriptionsJson.status) setSubscriptionsData(subscriptionsJson.data);
        if (inquiriesJson.status) setInquiriesData(inquiriesJson.data);
        
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Calculate yearly totals
  const totalSubscriptions = subscriptionsData.reduce((a, b) => a + b, 0);
  const totalInquiries = inquiriesData.reduce((a, b) => a + b, 0);

  // Find max values dynamically
  const maxSubscriptions = Math.max(...subscriptionsData, 10); // Ensure a minimum scale
  const maxInquiries = Math.max(...inquiriesData, 10);

  // Dynamically adjust Y-axis scale
  const getDynamicOptions = (maxValue: number) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { font: { size: 14 }, color: '#64748B' },
        suggestedMax: maxValue + maxValue * 0.1 // Add 10% padding for better visualization
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 14 }, color: '#64748B' }
      }
    }
  });

  
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      {/* Walking Subscriptions */}
      <Card className="shadow-lg rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-md font-bold text-black-800">
            Walking Subscriptions <span className="text-md text-gray-800">({totalSubscriptions})</span>
            
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="w-full">
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      label: 'Subscriptions',
                      data: subscriptionsData,
                      backgroundColor: 'rgba(75, 192, 192, 0.7)',
                      borderRadius: 6,
                      borderWidth: 0
                    }
                  ]
                }}
                options={getDynamicOptions(maxSubscriptions)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Inquiries */}
      <Card className="shadow-lg rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-md font-bold text-black-800">
            New Inquiries <span className="text-md text-gray-800">({totalInquiries})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="w-full">
              <Bar
                data={{
                  labels,
                  datasets: [
                    {
                      label: 'Inquiries',
                      data: inquiriesData,
                      backgroundColor: 'rgba(255, 99, 132, 0.7)',
                      borderRadius: 6,
                      borderWidth: 0
                    }
                  ]
                }}
                options={getDynamicOptions(maxInquiries)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSubscriptionChart;
