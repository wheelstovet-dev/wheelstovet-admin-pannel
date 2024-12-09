// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/login'); // Redirects to /auth/login when the root URL is accessed
  return null; // Stops rendering
}
