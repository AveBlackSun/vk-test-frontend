"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <aside className="flex flex-col min-w-max mt-10 mr-10">
          <Link href="/">Home</Link>
          <Link href="/edit-profile">Edit Profile</Link>
          <Link href="/create-post">Create post</Link>
          {/* <Link href="/upload_img">Upload img</Link> */}
          <Link href="/all-posts">Feed</Link>
        </aside>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default Sidebar;
