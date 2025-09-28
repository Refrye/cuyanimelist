'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in, redirect to home page
  if (!session) {
    router.push('/');
    return null;
  }

  return null;
}
