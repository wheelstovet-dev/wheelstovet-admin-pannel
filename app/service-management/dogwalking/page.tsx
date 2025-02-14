"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getDogWalkPlans, updateDogPlan } from '@/app/redux/actions/servicesAction';
import ProtectedRoute from '@/components/protectedRoute';
import { ToastAtTopRight } from '@/lib/sweetalert';

export default function DogWalkingPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { dogPlans = [], loading, error } = useSelector((state: RootState) => state.service);

  const [plans, setPlans] = useState<any>([]);
  const [totalCharges, setTotalCharges] = useState<number>(0);
  const [sundayCharge, setSundayCharge] = useState<number>(200);
  const [modifiedPlans, setModifiedPlans] = useState<Set<string>>(new Set());

  useEffect(() => {
    dispatch(getDogWalkPlans());
  }, [dispatch]);

  useEffect(() => {
    setPlans(dogPlans);
  }, [dogPlans]);

  useEffect(() => {
    const total = plans.reduce((sum: number, plan: any) => sum + (plan.BasePrice || 0), 0);
    const extraCharge = plans[0]?.ExtraChargePer15Min || 0;
    setTotalCharges(total + sundayCharge + extraCharge);
  }, [plans, sundayCharge]);

  const handleInputChange = (planId: string, field: string, value: any) => {
    setPlans((prevPlans: any) =>
      prevPlans.map((plan: any) =>
        plan._id === planId ? { ...plan, [field]: value } : plan
      )
    );
    setModifiedPlans((prev) => new Set(prev).add(planId));
  };

  const handleSave = async () => {
    try {
      const updatePromises = Array.from(modifiedPlans).map(async (planId) => {
        const updatedPlan = plans.find((plan: any) => plan._id === planId);
        console.log("updatedPlan",updatedPlan);
        const planData = {
          BasePrice: updatedPlan.BasePrice,
          ExtraChargePer15Min: updatedPlan.ExtraChargePer15Min,
        };
        await dispatch(updateDogPlan({ id: planId, planData }));
        setPlans((prevPlans: any) =>
          prevPlans.map((plan: any) => (plan._id === planId ? { ...plan, ...planData } : plan))
        );
      });
      await Promise.all(updatePromises);
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Dog Walking Plans updated successfully!',
      });
      setModifiedPlans(new Set());
    } catch (error) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to update Dog Walking Plans',
      });
    }
  };

  const handleCancel = () => {
    setPlans(dogPlans);
    setSundayCharge(200);
    setModifiedPlans(new Set());
    ToastAtTopRight.fire({
      icon: 'info',
      title: 'Changes have been reset',
    });
  };

  return (
    <ProtectedRoute>
      <MainLayout meta={{ title: 'Service Management' }}>
        <ScrollArea className="h-full">
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Service Management</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-8">Dog Walking</h2>
              <div className="space-y-8">
                {loading && <p>Loading plans...</p>}
                {error && <p>Error: {error}</p>}
                {['Daily', 'Weekly', 'Monthly'].map((type) => (
                  <div key={type}>
                    <h3 className="text-2xl font-semibold mb-4">{type} Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plans.filter((plan: any) => plan.Name === type).map((plan: any) => (
                        <div key={plan._id} className="flex items-center border p-4 rounded-lg">
                          <label className="block font-bold text-gray-700 w-full">
                            {plan.Frequency} time dog walking per day
                          </label>
                          <input
                            type="number"
                            value={plan.BasePrice}
                            onChange={(e) => handleInputChange(plan._id, 'BasePrice', Number(e.target.value))}
                            className="mt-1 block w-20 border rounded p-2"
                          />
                          <span className="ml-2 font-bold">INR</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Additional Charges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center border p-4 rounded-lg">
                      <label className="block font-bold text-gray-700 w-full">Extra Charge Per 15 Min</label>
                      <input
                        type="number"
                        value={plans[0]?.ExtraChargePer15Min || 0}
                        onChange={(e) => handleInputChange(plans[0]?._id, 'ExtraChargePer15Min', Number(e.target.value))}
                        className="mt-1 block w-20 border rounded p-2"
                      />
                      <span className="ml-2 font-bold">INR</span>
                    </div>
                    <div className="flex items-center border p-4 rounded-lg">
                      <label className="block font-bold text-gray-700 w-full">Additional Charges for Sunday</label>
                      <input
                        type="number"
                        value={sundayCharge}
                        onChange={(e) => setSundayCharge(Number(e.target.value))}
                        className="mt-1 block w-20 border rounded p-2"
                      />
                      <span className="ml-2 font-bold">INR</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-8">
                <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4" onClick={handleCancel}>Cancel</button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded" onClick={handleSave}>Save Changes</button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </MainLayout>
    </ProtectedRoute>
  );
}
