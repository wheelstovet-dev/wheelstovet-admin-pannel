'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getSessionStorageItem } from '@/utils/localStorage';
// import Logout from '../logout/logout';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


// Function to generate a random background color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function UserNav() {
  const router = useRouter();

  // Retrieve user data from sessionStorage using the token key
  const user: any = getSessionStorageItem('token');
  // console.log(user); // Inspect the user object

  // If user or user data is missing, return null
  if (!user || !user?.admin?.Name) {
    return null; // Or return a loading state if needed
  }

  // Extract the first letter of the user's name
  const firstLetter = user?.admin.Name.charAt(0).toUpperCase();

  

   // Handle logout redirection
   const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Clear session storage (or local storage) to remove user data
        sessionStorage.removeItem('token'); // Adjust if you're using a different key for the session

        // Optional: If you have an API endpoint to invalidate the session, you can call it here
        // fetch('/api/logout', { method: 'POST' })
        //   .then(() => {
        //     console.log('User logged out');
        //   })
        //   .catch((error) => console.error('Logout failed', error));

        // 2. Redirect to the login page after logout
        router.push('/auth/login');
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <div className="flex items-center">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ backgroundColor: getRandomColor(), color: 'white' }}
            >
              {firstLetter || ''}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.admin.Name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.admin.Email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
