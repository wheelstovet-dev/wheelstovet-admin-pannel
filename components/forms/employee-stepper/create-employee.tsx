'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nullable, z } from 'zod';
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
import { Separator } from '@/components/ui/separator';
import { AssignedClient } from '@/components/tables/assignedCases-table/client';
import { AssignedSubscriptionClient } from '@/components/tables/assigned-subscription-table/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

// Employee form schema for validation
const employeeFormSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  MobileNo: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^(?!(\d)\1{5,})\d{10}$/, 'Phone number must be 10 digits and cannot have repetitive patterns'), // 10 digits and no repetitive patterns,
  Email: z.string().email('Invalid email format').min(1, 'Email is required'),
  AadharNo: z.string().length(12, 'Aadhar number must be 12 digits'),
  Gender: z.string().min(1, 'Gender is required'),
  // DateOfBirth: z.date().min(1, 'Date of Birth is required'),
  DateOfBirth: z
    .date({ required_error: "Date of Birth is required" })
    .refine((date) => date <= new Date(), {
      message: "Date of Birth cannot be in the future",
    }),
  //  DateOfBirth: z
  // .date({ required_error: 'Date of Birth is required' })
  // .refine((date) => date instanceof Date, {
  //   message: 'Invalid Date of Birth',
  // }),
  StreetAddress: z.string().min(1, 'Street is required'),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  Role: z.string().min(1, 'Role is required'),
  // Rating: z.string().optional(),

  /*------When backend is configured for ratings use the below schema for rating and remove above one*/

  Rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot exceed 5" })
    .nullable(),
});

interface EmployeeFormProps {
  mode?: 'create' | 'view' | 'update';
}

export const CreateEmployeeForm: React.FC<EmployeeFormProps> = ({ mode: propMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [role, setRole] = useState();


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
      DateOfBirth: undefined,
      StreetAddress: '',
      City: '',
      State: '',
      Role: '',
      Rating: undefined,
    },
  });

  useEffect(() => {
    if ((currentMode === 'view' || currentMode === 'update') && employeeId) {
      setLoader(true);
      dispatch(getEmployeeById(employeeId))
        .unwrap()
        .then((data) => {
          setEmployeeData(data.data);
          // console.log(data.data);
          const finalData = data.data;
          if (finalData ) {
            form.reset({
              ...finalData,
              DateOfBirth: finalData.DateOfBirth ? new Date(finalData.DateOfBirth) : undefined,
              Rating: finalData.Rating ?? "4", // Set default rating to 4 if not provided
            });
          }
          setRole(data?.data?.Role);
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
    const formattedData = {
      ...data,
      DateOfBirth: data.DateOfBirth ? data.DateOfBirth.toISOString() : null,
    }
    dispatch(setLoading(true));

    try {
      let resultAction: any;

      if (currentMode === 'create') {
        resultAction = await dispatch(createEmployee(formattedData));
      } else if (currentMode === 'update') {
        resultAction = await dispatch(updateEmployee({ id: employeeId, employeeData: formattedData }));
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
    <>
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
                    <Input type="number" placeholder="Enter Mobile Number" {...field} disabled={currentMode === 'view'} />
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

              {/* <FormField control={control} name="DateOfBirth" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Enter Date of Birth" {...field} disabled={currentMode === 'view'} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.DateOfBirth)}</FormMessage>
                </FormItem>
              )} /> */}
              <FormField
              control={control}
              name="DateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Of Birth</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={currentMode === 'view'}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={currentMode === 'view'}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>{errors.DateOfBirth?.message}</FormMessage>
                </FormItem>
              )}
            />

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

              <FormField
                control={control}
                name="Rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Rating"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage>{renderErrorMessage(errors.Rating)}</FormMessage>
                  </FormItem>
                )}
              />

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
      <Separator />
      {currentMode === 'view' && (role === 'Pet Taxi' ? <AssignedClient /> : <AssignedSubscriptionClient />)}
    </>
  );
};
