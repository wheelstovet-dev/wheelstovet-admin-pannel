import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/app/redux/store';
import { ToastAtTopRight } from '@/lib/sweetalert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getComplaintById, updateComplaint } from '@/app/redux/actions/complaintAction';
import { TextBox } from '@/components/ui/textbox';

// Define the form schema
const complaintFormSchema = z.object({
  ComplaintType: z.string().min(1, 'Complaint Type is required'),
  ComplaintBy: z.string().min(1, 'Complaint By is required'),
  Description: z.string().min(1, 'Description is required'),
  Status: z.string().min(1, 'Status is required'),
  Priority: z.string().min(1, 'Priority is required'),
  Resolution: z.string().min(1, 'Resolution is required'),
  ResolvedAt: z.string().optional(),
});

type ComplaintFormData = z.infer<typeof complaintFormSchema>;

interface ComplaintFormProps {
  mode?: 'view' | 'update';
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ mode: propMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlMode = searchParams.get('mode');
  const complaintId: any = searchParams.get('id');

  const [currentMode, setCurrentMode] = useState<'view' | 'update'>(propMode || (urlMode as 'view' | 'update') || 'view');
  const [complaintData, setComplaintData] = useState<ComplaintFormData | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (urlMode) {
      setCurrentMode(urlMode as 'view' | 'update');
    } else if (propMode) {
      setCurrentMode(propMode);
    }
    //console.log("Current Mode:", currentMode);  // Debug this
  }, [urlMode, propMode]);
  

  const form = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: complaintData || {
      ComplaintType: '',
      ComplaintBy: '',
      Description: '',
      Status: '',
      Priority: '',
      Resolution: '',
      ResolvedAt: '',
    },
  });

  useEffect(() => {
    if (currentMode === 'view' || currentMode === 'update') {
      setLoader(true);
      dispatch(getComplaintById(complaintId))
        .unwrap()
        .then((data: any) => {
          //console.log("Fetched complaint data:", data.data);
          // Sanitize ResolvedAt to avoid null values
          const sanitizedData = {
            ...data.data,
            ResolvedAt: data.data.ResolvedAt ?? '',  // Replace null with an empty string
          };
          setComplaintData(sanitizedData);
          form.reset(sanitizedData);

        })
        .catch((error: any) => {
          ToastAtTopRight.fire({
            icon: 'error',
            title: 'Error fetching complaint data',
            text: error.message,
          });
        })
        .finally(() => setLoader(false));
    }
  }, [currentMode, complaintId, dispatch]);

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<ComplaintFormData> = async (data) => {
    //console.log("Update button clicked");
    //console.log("Form data submitted:", data);
  
    try {
      setLoader(true);
  
      //console.log("Dispatching updateComplaint action with data:", { id: complaintId, complaintData: data });
  
      const response = await dispatch(updateComplaint({ id: complaintId, complaintData: data }));
  
      //console.log("Dispatch result (raw):", response);
  
      if (response.meta.requestStatus === 'fulfilled') {
        //console.log("Redux action fulfilled with payload:", response.payload);
  
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Complaint updated successfully!',
        });
  
        router.push('/complaint-management');
      } else {
        //console.error("Redux action rejected:", response.error);
        ToastAtTopRight.fire({
          icon: 'error',
          title: 'Error updating complaint',
          //text: response.error?.message || 'Failed to update complaint',
        });
      }
    } catch (error: any) {
      //console.error("Error during complaint update:", error);
      ToastAtTopRight.fire({
        icon: 'error',
        title: 'Error updating complaint',
        text: error.message || 'Failed to update complaint',
      });
    } finally {
      setLoader(false);
    }
  };
  
  
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      //console.log("Validation Errors:", errors);  // Log any validation errors
    }
  }, [errors]);
  

  

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    return error.message || null;
  };

  if (loader) return <div>Loading...</div>;

  return (
              <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">
                  {currentMode === 'view' ? 'View Complaint' : 'Update Complaint'}
                </h2>

                <Form {...form}>
                <form 
              onSubmit={handleSubmit((data) => {
                //console.log("Form submitted with data:", data);  // Log form data here
                onSubmit(data);  // Call your actual submit logic
              })} 
              className="space-y-6"
            >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">

            <FormField control={control} name="ComplaintType" render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint Type</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Complainant Type" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.ComplaintType)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="ComplaintBy" render={({ field }) => (
              <FormItem>
                <FormLabel>Complaint By</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Complainant" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.ComplaintBy)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Description" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Description)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Status" render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ''} disabled={currentMode === 'view'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Status)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Priority" render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value || ''} disabled={currentMode === 'view'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Priority)}</FormMessage>
              </FormItem>
            )} />

            <FormField control={control} name="Resolution" render={({ field }) => (
              <FormItem>
                <FormLabel>Resolution</FormLabel>
                <FormControl>
                  <TextBox placeholder="Enter Resolution" {...field} disabled={currentMode === 'view'} />
                </FormControl>
                <FormMessage>{renderErrorMessage(errors.Resolution)}</FormMessage>
              </FormItem>
            )} />

            {/* <FormField control={control} name="ResolvedAt" render={({ field }) => (
            <FormItem>
              <FormLabel>Resolved At</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Resolved Date"
                  {...field}
                  value={field.value ?? ''}  // Ensure empty string is shown if null
                  disabled={currentMode === 'view'}
                />
              </FormControl>
              <FormMessage>{errors.ResolvedAt?.message}</FormMessage>
            </FormItem>
          )} /> */}


          </div>
            
  
          {currentMode === 'update' && (
           <Button type="submit" >
           Update Complaint
         </Button>                 
          )}

          {currentMode === 'view' && (
            <Button type="button" disabled>
              View Complaint
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
