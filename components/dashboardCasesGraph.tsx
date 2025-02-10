'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
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
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const DashboardCasesGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
      fill: true;
    }[];
  }>({
    labels,
    datasets: [],
  });
  
  const [selectedCase, setSelectedCase] = useState('Pet Taxi');
  const [apiData, setApiData] = useState<{ service: string; data: number[] }[]>([]);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://15.206.246.97:3001/admin/dashboard/monthlyCases`);
        const result = await response.json();
        
        if (result.status) {
          setApiData(result.data); // Store API data
          updateGraphData(selectedCase, result.data); // Set default data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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


  // Update Graph when a service is selected
  const updateGraphData = (caseType: string, dataSource = apiData) => {
    const selectedService = dataSource.find(item => item.service === caseType);
    
    if (selectedService) {
      setGraphData({
        labels,
        datasets: [
          {
            label: caseType,
            data: selectedService.data,
            borderColor: getColor(caseType),
            backgroundColor: getColor(caseType, true),
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    }
  };

  const handleCaseChange = (caseType: string) => {
    setSelectedCase(caseType);
    updateGraphData(caseType);
  };

  const getColor = (service: string, isBackground = false) => {
    const colors: { [key: string]: string } = {
      'Pet Taxi': '255, 165, 0', // Orange
      'Salon Visit': '0, 0, 255', // Blue
      'Vet Visit': '0, 255, 0', // Green
      'To Hostel': '128, 0, 128', // Purple
    };
    return isBackground ? `rgba(${colors[service]}, 0.2)` : `rgb(${colors[service]})`;
  };
  
  const maxData = Math.max(...apiData.flatMap(item => item.data), 10); // Ensure a minimum scale

  
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="col-span-1">
        <CardHeader >
          <CardTitle className="text-2xl font-bold text-black">
          Transportation Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-4">
            {['Pet Taxi', 'Salon Visit', 'Vet Visit', 'To Hostel'].map(service => (
              <button
                key={service}
                className={`px-4 py-2 rounded ${selectedCase === service ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCaseChange(service)}
              >
                {service}
              </button>
            ))}
          </div>
          <div className="w-full h-auto">
            <Line data={graphData}
            options={getDynamicOptions(maxData)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCasesGraph;
