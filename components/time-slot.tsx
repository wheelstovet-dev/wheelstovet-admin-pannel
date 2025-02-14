import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBookedSlots } from "@/app/redux/actions/dashboardAction";

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

const AvailableSlots: React.FC = () => {
  //const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  // const [bookedSlots, setBookedSlots] = useState<{ petTaxi: string[]; petWalking: string[] }>({
  //   petTaxi: [],
  //   petWalking: [],
  // });
  const { bookedSlots, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );
  console.log("bookedSlots",bookedSlots);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch today's cases when the component mounts
    useEffect(() => {
      dispatch(getBookedSlots())
        .unwrap()
        .catch((err: any) => {
          const errorMessage = 'Failed to fetch booked Slot';
          
        });
    }, [dispatch]);
  

  if (loading) return <p className="text-center text-gray-600">Loading slots...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full lg:w-3/3 lg:me-3 mb-4">
      <Card className="bg-gradient-to-r rounded-xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Available Slots for Today
          </CardTitle>
        </CardHeader>

        {/* Legend Section */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2 ml-6">
            <div className="w-5 h-5 bg-yellow-400 rounded"></div>
            <span className="text-sm font-medium">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-400 rounded"></div>
            <span className="text-sm font-medium">Booked</span>
          </div>
        </div>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PET Taxi Card */}
          <Card className="p-4 rounded-xl border border-yellow-400">
            <h3 className="text-lg font-semibold mb-4 text-center text-black">
              Pet Taxi
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => {
                const isBooked = bookedSlots.petTaxi.includes(slot);
                //const isSelected = selectedSlot === slot;

                return (
                  <li
                    key={index}
                    className={`p-2 text-sm rounded-lg text-center font-medium cursor-pointer transition-all
                    ${
                      isBooked
                        ? "bg-green-400 text-white cursor-not-allowed" // Booked slot (Green)
                        : "bg-yellow-300 text-black hover:bg-yellow-500" // Free slot (Yellow)
                    }`}
                    //onClick={() => !isBooked && setSelectedSlot(slot)}
                  >
                    {slot}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* PET Walking Card */}
          <Card className="p-4 rounded-xl shadow-md border border-yellow-400">
            <h3 className="text-lg font-semibold mb-4 text-center text-black">
              Pet Walking
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot, index) => {
                const isBooked = bookedSlots.petWalking.includes(slot);
                //const isSelected = selectedSlot === slot;

                return (
                  <li
                    key={index}
                    className={`p-2 text-sm rounded-lg text-center font-medium cursor-pointer transition-all
                    ${
                      isBooked
                        ? "bg-green-400 text-white cursor-not-allowed" // Booked slot (Green)
                        : "bg-yellow-300 text-black hover:bg-yellow-500" // Free slot (Yellow)
                    }`}
                    //onClick={() => !isBooked && setSelectedSlot(slot)}
                  >
                    {slot}
                  </li>
                );
              })}
            </ul>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailableSlots;
