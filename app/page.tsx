"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!session) {
    return (
      <div>
        <h2>Need to Login</h2>
      </div>
    );
  }

  router.push(`/profile/${session?.user._id}`);
  return (
    <div>
      <h2>Redirecting</h2>
    </div>
  );
}
