'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function TestPage() {
  const { data: session } = useSession();
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
      {session ? (
        <div>
          <p>Signed in as {session.user?.name}</p>
          <button 
            onClick={() => signOut()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <p>Not signed in</p>
          <button 
            onClick={() => signIn("github")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign In with GitHub
          </button>
        </div>
      )}
    </div>
  );
}