'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Eye, EyeOff, KeyRound, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EmployeeFormType {
  initialData: any | null;
  isEnabled?: boolean;
}

 const employeeFormSchema = z.object({
  aadharNo: z.string().min(12, 'Aadhar number must be 12 digits').max(12, 'Aadhar number must be 12 digits'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  contactInformation: z.object({
    emailId: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
  }),
  totalExperience: z.number().nonnegative('Total Experience must be a positive number'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  gender: z.string().min(1, 'Gender is required'),
  dob: z.date({
    required_error: 'Date of Birth is required.',
  }),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),
  role: z.string().min(1, 'Role is required'),
});

 export const CreateEmployeeForm: React.FC<EmployeeFormType> = ({ initialData , isEnabled}) => {
  const [loading, setLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const title = initialData && isEnabled ? "View Detail" : initialData ? "Edit Detail" : "Create New Employee";
  const description = initialData && isEnabled 
    ? "View the Employee details." : initialData ? "Edit the Employee details."
    : "To create a new Employee, fill in the required information.";
 
    const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData || {
      aadharNo: '',
      fullName: '',      
      contactInformation: {
        emailId: '',
        phone: '',
      },
      totalExperience: 0,
      password: '',
      dob: new Date(),
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
      },
      role: '',
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof employeeFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing employee
      } else {
        // Create new employee
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const generatePassword = () => {
  //   const generatedPassword = Math.random().toString(36).slice(-8);
  //   form.setValue('password', generatedPassword);
  // };

  return (
    <>
    <div className="flex items-center justify-between">
    <Heading title={title} description={description} />
    {initialData && (
      <Button
        disabled={isEnabled || loading}
        variant="destructive"
        size="sm"
      >
        <Trash className="h-4 w-4" />
      </Button>
    )}
  </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            
          

            {/* First Name */}
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter First Name" {...field} />
                  </FormControl>
                 
                </FormItem>
              )}
            />
  
            {/* Last Name
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter Last Name" {...field} />
                  </FormControl>
                 
                </FormItem>
              )}
            /> */}

            {/* Email */}
            <FormField
              control={control}
              name="contactInformation.emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="emailId" disabled={isEnabled ||loading} placeholder="Enter Email" {...field} />
                  </FormControl>
                
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={control}
              name="contactInformation.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter Phone" {...field} />
                  </FormControl>
                 
                </FormItem>
              )}
            />
{/* Aadhar Number */}
<FormField
              control={control}
              name="aadharNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled || loading} placeholder="Enter Aadhar Number" {...field} />
                  </FormControl>
                 
                </FormItem>
              )}
            />
            {/* Total Experience */}
            <FormField
              control={control}
              name="totalExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Experience (in years)</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isEnabled ||loading} placeholder="Enter Total Experience" {...field} />
                  </FormControl>
                  
                </FormItem>
              )}
            />

            {/* Password
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex justify-between items-center">
                    <FormControl>
                      <div className="relative w-full me-3">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          disabled={isEnabled ||loading}
                          placeholder="Enter Password"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <Button type="button" onClick={generatePassword}>
                      <KeyRound height={16} width={16} className="me-2 animate-bounce mt-1" /> Generate
                    </Button>
                  </div>
               
                </FormItem>
              )}
            /> */}

            {/* Gender */}
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select disabled={isEnabled ||loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  
                </FormItem>
              )}
            />

            {/* Street Address */}
            <FormField
              control={control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter Street Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter City" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter State" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isEnabled ||loading} placeholder="Enter Role" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={isEnabled ||loading} />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

            {/* Form Actions */}
            <div className="flex justify-end">
          { (!isEnabled)  && <Button
              type="submit"
              disabled={isEnabled || loading}
              className="ml-4 w-full"
            >
              {action}
            </Button>
}
          </div>
        </form>
      </Form>
     </>
  );
};
