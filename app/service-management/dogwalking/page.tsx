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

  const [plans, setPlans] = useState<any>([]); // Local state for editable plans
  const [totalCharges, setTotalCharges] = useState<number>(0); // State for preview of total charges
  const [sundayCharge, setSundayCharge] = useState<number>(200); // State for Sunday additional charge
  const [modifiedPlans, setModifiedPlans] = useState<Set<string>>(new Set()); // Track modified plans

  useEffect(() => {
    // Set plans from Redux state
    setPlans(dogPlans);
  }, [dogPlans]);

  useEffect(() => {
    // Fetch dog walking plans from API
    dispatch(getDogWalkPlans());
  }, [dispatch]);

  useEffect(() => {
    // Calculate preview of total charges
    const total = plans.reduce((sum: number, plan: any) => sum + (plan.BasePrice || 0), 0);
    const extraCharge = plans[0]?.ExtraChargePer15Min || 0;
    setTotalCharges(total + sundayCharge + extraCharge); // Include ExtraChargePer15Min in total
  }, [plans, sundayCharge]);

  const handleInputChange = (planId: string, field: string, value: any) => {
    setPlans((prevPlans: any) =>
      prevPlans.map((plan: any) =>
        plan._id === planId ? { ...plan, [field]: value } : plan
      )
    );
    setModifiedPlans((prev) => new Set(prev).add(planId)); // Mark this plan as modified
  };

  const handleSave = async () => {
    try {
      for (const planId of Array.from(modifiedPlans)) {
        const updatedPlan = plans.find((plan: any) => plan._id === planId);
        const planData = {
          BasePrice: updatedPlan.BasePrice,
          ExtraChargePer15Min: updatedPlan.ExtraChargePer15Min, // Include updated ExtraChargePer15Min
        };

        await dispatch(updateDogPlan({ id: planId, planData })).unwrap();

        // Immediately update the local plans state after successful API call
        setPlans((prevPlans: any) =>
          prevPlans.map((plan: any) =>
            plan._id === planId ? { ...plan, ...planData } : plan
          )
        );
      }

      setModifiedPlans(new Set()); // Clear modified plans after saving
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Dog Walking Plans updated successfully!',
      });
    } catch (error) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Failed to update Dog Walking Plans',
      });
    }
  };

  const handleCancel = () => {
    // Reset to original plans from Redux state
    setPlans(dogPlans);
    setSundayCharge(200); // Reset Sunday charge to default
    setModifiedPlans(new Set()); // Clear modified plans
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

                {/* Render plans grouped by type */}
                {['Daily', 'Weekly', 'Monthly'].map((type) => (
                  <div key={type}>
                    <h3 className="text-2xl font-semibold mb-4">{type} Plans</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {plans
                        .filter((plan: any) => plan.Name === type)
                        .map((plan: any) => (
                          <div
                            key={plan._id}
                            className="flex items-center border p-4 rounded-lg"
                          >
                            <label className="block font-bold text-gray-700 w-full">
                              {plan.Frequency} time dog walking per day
                            </label>
                            <input
                              type="number"
                              value={plan.BasePrice}
                              onChange={(e) =>
                                handleInputChange(plan._id, 'BasePrice', Number(e.target.value))
                              }
                              className="mt-1 block w-20 border rounded p-2"
                            />
                            <span className="ml-2 font-bold">INR</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                {/* Extra Charges Section */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-4">Additional Charges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center border p-4 rounded-lg">
                      <label className="block font-bold text-gray-700 w-full">
                        Extra Charge Per 15 Min
                      </label>
                      <input
                        type="number"
                        value={plans[0]?.ExtraChargePer15Min || 0} // Bind to the local editable state
                        onChange={(e) => {
                          const updatedValue = Number(e.target.value);
                          handleInputChange(plans[0]?._id, 'ExtraChargePer15Min', updatedValue); // Update the state
                        }}
                        className="mt-1 block w-20 border rounded p-2"
                      />
                      <span className="ml-2 font-bold">INR</span>
                    </div>
                    <div className="flex items-center border p-4 rounded-lg">
                      <label className="block font-bold text-gray-700 w-full">
                        Additional Charges for Sunday
                      </label>
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

                {/* Preview of Total Charges */}
                {/* <div className="mt-8">
                  <h3 className="text-2xl font-bold">
                    Total Charges: <span className="text-yellow-500">{totalCharges} INR</span>
                  </h3>
                </div> */}
              </div>

              <div className="flex justify-start mt-8">
                <button
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </MainLayout>
    </ProtectedRoute>
  );
}