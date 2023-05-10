"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Post = ({ post }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/${post.creatorid}`);
  };

  return (
    <div className="post w-96  border-t-2 p-4 flex justify-between">
      <div className="flex flex-col">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          {post.creatorimage && (
            <img
              src={`http://localhost:4000/uploads/${post.creatorimage}`}
              alt="Profile image"
              className="w-10 h-10 object-cover rounded-full mr-2"
            />
          )}
          <h3 className="font-semibold text-gray-900">{post?.creatorname}</h3>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.text}</p>
      </div>

      {post.image && (
        <img
          src={`http://localhost:4000/uploads/${post.image}`}
          alt="Post image"
          className=" max-h-96 w-1/3 object-cover block "
        />
      )}
    </div>
  );
};

export default Post;
