import { StaticImageData } from "next/image";
import petTaxi from '@/public/images/taxi.png'
// import shop2 from '@/public/assets/icons/shop2.png'
// import shop3 from '@/public/assets/icons/shop3.png'
// import shop4 from '@/public/assets/icons/shop4.png'
// import shop5 from '@/public/assets/icons/shop5.png'
// import potato from '@/public/assets/icons/potato.png'
import handle from '@/public/images/handle.png'
import salon from '@/public/images/salon.png'
import vetiniary from '@/public/images/rescue.png'
import user1 from '@/public/images/user1.jpg'
import user2 from '@/public/images/user2.png'
import user3 from '@/public/images/user3.jpg'
// Define the Sale interface
export interface Case {
    avatar: StaticImageData;  
    name: string;
    paymentStatus?: string;
    time: string;
  }
  
  // Array of Sale data
  export const caseData: Case[] = [
    {
      avatar: user1, // Placeholder, replace with actual path or variable holding the avatar image
      name: 'John Doe',
      // paymentStatus: 'Paid',
      time: '10 AM - 12 PM'
    },
    {
      avatar: user2,
      name: 'Deepak Singh',
      // paymentStatus: 'Paid',
      time: '2 PM - 4 PM '
    },
    {
      avatar: user3,
      name: 'Shivam Kumar',
      // paymentStatus: 'Paid',
      time: '10 AM - 12 PM'
    },
    {
      avatar: user2,
      name: 'Arya Singh',
      // paymentStatus: 'Paid',
      time: '5 PM - 7 PM'
    },
    {
      avatar: user1,
      name: 'Kartik Singh',
      // paymentStatus: 'Paid',
      time: '10 AM - 12 PM'
    }
  ];
  
  export const unassignedData: Case[] = [
    {avatar: petTaxi, name: 'Pet taxi',  time: '10 AM - 12 PM' },
    { avatar: salon, name: 'Salon Visit',  time: '2 PM - 4 PM ' },
    { avatar: vetiniary, name: 'Vetinary Visit',  time: '5 PM - 7 PM' },
    { avatar: handle,name: 'Outing with pets', time: '10 AM - 12 PM' }
  ];

   export const petData: Case[] = [
    {avatar: petTaxi,paymentStatus: 'Paid', name: 'Pet taxi',  time: '10 AM - 12 PM' },
    { avatar: salon,paymentStatus: 'Paid', name: 'Salon Visit',  time: '2 PM - 4 PM ' },
    { avatar: vetiniary, paymentStatus: 'Paid', name: 'Vetinary Visit',  time: '5 PM - 7 PM' },
    { avatar: handle, paymentStatus: 'Paid',name: 'Outing with pets', time: '10 AM - 12 PM' }
  ];
