import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <div className="bg-card rounded-lg border p-6">
        <p className="mb-4">This is a protected page that can only be accessed by authenticated users.</p>
        <p>Welcome, <strong>{session.user?.name}</strong>!</p>
        <p className="mt-2 text-sm text-muted-foreground">User ID: {session.user?.id}</p>
      </div>
    </div>
  );
}