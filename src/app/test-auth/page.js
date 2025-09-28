'use client';

import { useSession } from "next-auth/react";

export default function TestAuth() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Auth Test</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}