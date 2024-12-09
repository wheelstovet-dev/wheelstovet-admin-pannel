import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createClinic,
  createHostel,
  createSalon,
  getAllClinic,
  getAllHostels,
  getAllSalons,
  getAllServices,
  getDogWalkPlans,
  updateDogPlan,
  updateService
} from '../actions/servicesAction';
import { AxiosResponse } from 'axios';

interface ServiceState {
  loading: boolean;
  services: any[];
  selectedService: any | null;
  selectedPlan: any | null;
  dogPlans: any[];
  salons: any[];
  hostels: any[];
  clinics: any[];
  totalSalons: number;
  currentPage: number;
  totalPages: number;
  error: string | null;
}

const initialState: ServiceState = {
  loading: false,
  services: [],
  selectedService: null,
  selectedPlan: null,
  dogPlans: [],
  salons: [],
  hostels: [],
  clinics: [],
  totalSalons: 0,
  currentPage: 1,
  totalPages: 1,
  error: null
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Update currentPage in state
    }
  },
  extraReducers: (builder) => {
    builder

      //get all services
      .addCase(getAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllServices.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(getAllServices.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get all dog walk plans
      .addCase(getDogWalkPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDogWalkPlans.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.dogPlans = action.payload;
        }
      )
      .addCase(
        getDogWalkPlans.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // update dog walk plans
      .addCase(updateDogPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateDogPlan.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const updateDogPlan = action.payload.data;
          // Ensure state.services is an array before attempting to map over it
          if (Array.isArray(state.services)) {
            state.dogPlans = state.services.map((dogPlans) =>
              dogPlans._id === updateDogPlan._id ? updateDogPlan : dogPlans
            );
          }
          state.selectedPlan = updateDogPlan;
        }
      )
      .addCase(updateDogPlan.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Salons
      .addCase(getAllSalons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSalons.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.salons = action.payload;
        }
      )
      .addCase(getAllSalons.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Case for creating a new salon
      .addCase(createSalon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSalon.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const newSalon = action.payload.data; // Access new salon data from the response
          state.salons.push(newSalon); // Add the new salon to the list
        }
      )
      .addCase(createSalon.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clinics [vet visit]
      .addCase(getAllClinic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllClinic.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.clinics = action.payload;
        }
      )
      .addCase(getAllClinic.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Case for creating a new Clinic [vet visit]
      .addCase(createClinic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createClinic.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const newClinic = action.payload.data; // Access new clinic data from the response
          state.clinics.push(newClinic); // Add the new clinic to the list
        }
      )
      .addCase(createClinic.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // console.log(action);
        state.error = action.payload.message.fields;
      })

      // update service slice
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateService.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const updatedService = action.payload.data;
          // Ensure state.services is an array before attempting to map over it
          if (Array.isArray(state.services)) {
            state.services = state.services.map((service) =>
              service._id === updatedService._id ? updatedService : service
            );
          }
          state.selectedService = updatedService;
        }
      )
      .addCase(updateService.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Case for creating a new hostel
      .addCase(createHostel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createHostel.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any>>) => {
          state.loading = false;
          const newHostel = action.payload.data; // Access new hostel data from the response
          state.hostels.push(newHostel); // Add the new hostel to the list
        }
      )
      .addCase(createHostel.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get all hostels 
      .addCase(getAllHostels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllHostels.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.hostels = action.payload;
        }
      )
      .addCase(getAllHostels.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default serviceSlice.reducer;
