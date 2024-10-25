'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { createEmployee } from '@/app/redux/actions/employeeAction';
import { setLoading } from '@/app/redux/slices/authslice';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppDispatch } from '@/app/redux/store';

// Employee form schema for validation
const employeeFormSchema = z.object({
  Name: z.string().min(1, 'Name is required'),
  MobileNo: z.string().min(1, 'Mobile Number is required'),
  Email: z.string().email('Invalid email format').min(1, 'Email is required'),
  AadharNo: z.string().length(12, 'Aadhar number must be 12 digits'),
  Gender: z.string().min(1, 'Gender is required'),
  DateOfBirth: z.string().min(1, 'Date of Birth is required'),
  StreetAddress: z.string().min(1, 'Street is required'),
  City: z.string().min(1, 'City is required'),
  State: z.string().min(1, 'State is required'),
  Role: z.string().min(1, 'Role is required'),
});

// type EmployeeFormValue = z.infer<typeof employeeFormSchema>;

export default function CreateEmployeeForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<any>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      Name: '',
      MobileNo: '',
      Email: '',
      AadharNo: '',
      Gender: '',
      DateOfBirth:'',
      StreetAddress: '',
      City: '',
      State: '',
      Role: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<any> = async (data:any) => {
    dispatch(setLoading(true));
    try {
      const resultAction:any = await dispatch(createEmployee(data));
      //console.log("result action - " resultAction,);

      if (resultAction.type==='employees/create/fulfilled') {
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Employee created successfully!',
        });
        router.push('/dashboard');
      } else {
        throw new Error(resultAction.payload.message);
      }
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.message || 'Failed to create employee',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return null;
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Create Employee</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Name */}
            <FormField
              control={control}
              name="Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Full Name" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Name)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Mobile Number */}
            <FormField
              control={control}
              name="MobileNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.MobileNo)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Email)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Aadhar Number */}
            <FormField
              control={control}
              name="AadharNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Aadhar Number" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.AadharNo)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Gender */}
            <FormField
              control={control}
              name="Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
              )}
            />
            {/* Date of Birth */}
            <FormField
              control={control}
              name="DateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Enter Date of Birth" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.DateOfBirth)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Street Address */}
            <FormField
              control={control}
              name="StreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Street Address" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.StreetAddress)}</FormMessage>
                </FormItem>
              )}
            />
            {/* City */}
            <FormField
              control={control}
              name="City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.City)}</FormMessage>
                </FormItem>
              )}
            />
            {/* State */}
            <FormField
              control={control}
              name="State"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.State)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Role */}
            <FormField
              control={control}
              name="Role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pet Walking">Pet Walking</SelectItem>
                        <SelectItem value="Dog Walking">Dog Walking</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.Role)}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating...' : 'Create Employee'}
          </Button>
        </form>
      </Form>
    </>
  );
}
