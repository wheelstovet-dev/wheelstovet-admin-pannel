'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/app/redux/store';
import { setLoading } from '@/app/redux/slices/authslice';
import { createEmployee, getEmployeeById, updateEmployee } from '@/app/redux/actions/employeeAction';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';

// Employee form schema for validation
const employeeFormSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  MobileNo: z.string().min(1, 'Mobile Number is required'),
  Email: z.string().email('Invalid email format').min(1, 'Email is required'),
  AadharNo: z.string().length(12, 'Aadhar number must be 12 digits'),
  Gender: z.string().min(1, 'Gender is required'),
  DateOfBirth:z.string().min(1, 'Date of Birth is required'),
  //  DateOfBirth: z
  // .date({ required_error: 'Date of Birth is required' })
  // .refine((date) => date instanceof Date, {
  //   message: 'Invalid Date of Birth',
  // }),
  StreetAddress: z.string().min(1, 'Street is required'),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  Role: z.string().min(1, 'Role is required'),
});

interface EmployeeFormProps {
  mode?: 'create' | 'view' | 'update';
}

export const CreateEmployeeForm: React.FC<EmployeeFormProps> = ({ mode: propMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const searchParams = useSearchParams();
  const urlMode = searchParams.get('mode');
  const employeeId: any = searchParams.get('id');

  const [currentMode, setCurrentMode] = useState<'create' | 'view' | 'update'>(propMode || (urlMode as 'create' | 'view' | 'update') || 'create');
  const [employeeData, setEmployeeData] = useState();
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (urlMode) {
      setCurrentMode(urlMode as 'create' | 'view' | 'update');
    } else if (propMode) {
      setCurrentMode(propMode);
    }
  }, [urlMode, propMode]);

  const form = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employeeData || {
      Name: '',
      MobileNo: '',
      Email: '',
      AadharNo: '',
      Gender: '',
      DateOfBirth: '',
      StreetAddress: '',
      City: '',
      State: '',
      Role: '',
    },
  });

  useEffect(() => {
    if ((currentMode === 'view' || currentMode === 'update') && employeeId) {
      setLoader(true);
      dispatch(getEmployeeById(employeeId))
        .unwrap()
        .then((data) => {
          setEmployeeData(data.data);
          form.reset(data.data);
        })
        .catch((error) => {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error fetching employee data',
            text: error.message,
          });
        })
        .finally(() => setLoader(false));
    }
  }, [currentMode, employeeId, dispatch]);

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log("Form data to be submitted:", data);
    dispatch(setLoading(true));

    try {
      let resultAction: any;

      if (currentMode === 'create') {
        resultAction = await dispatch(createEmployee(data));
      } else if (currentMode === 'update') {
        resultAction = await dispatch(updateEmployee({ id: employeeId, employeeData: data }));
      }

      if (resultAction.type.endsWith('/fulfilled')) {
        ToastAtTopRight.fire({
          icon: 'success',
          title: `Employee ${currentMode === 'create' ? 'created' : 'updated'} successfully!`,
        });
        router.push('/employee-management');
      } else {
        throw new Error(resultAction.payload.message);
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || `Failed to ${currentMode} employee`,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    return error.message || null;
  };

  if (loader) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {currentMode === 'create' ? 'Create Employee' : currentMode === 'view' ? 'View Employee' : 'Update Employee'}
      </h2>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            <FormField control={control} name="Name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Full Name" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Name)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="MobileNo" render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Mobile Number" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.MobileNo)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Email)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="AadharNo" render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhar Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Aadhar Number" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.AadharNo)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Gender" render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ''} disabled={currentMode === 'view'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Gender)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="DateOfBirth" render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Enter Date of Birth" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.DateOfBirth)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="StreetAddress" render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Street Address" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.StreetAddress)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="City" render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter City" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.City)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="State" render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter State" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.State)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Role" render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ''} disabled={currentMode === 'view'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pet Walking">Pet Walking</SelectItem>
                      <SelectItem value="Pet Taxi">Pet Taxi</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Role)}</FormMessage>
              </FormItem>
            )} />
          </div>

          {currentMode === 'create' && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Create Employee
            </Button>
          )}

          {currentMode === 'update' && (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Update Employee
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
