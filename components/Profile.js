"use client";

import Post from "./Post";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Form from "./Form";

const Profile = ({ name, data }) => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const isUserOnOwnProfile = session?.user?._id === data._id;

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users_posts/${data._id}`
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (data._id) {
      fetchPosts();
    }
  }, [data._id]);

  return (
    <div className="flex w-full">
      <div className="flex flex-col mr-10">
        {data.image && (
          <Image
            src={`http://localhost:4000/uploads/${data.image}`}
            width="130"
            height="130"
            alt="Profile image"
            className="w-full mb-4"
          />
        )}

        <p className="font-bold text-xl mb-2">{name}</p>
        <p className="text-gray-700">{data.email}</p>

        {data.born && <p className="text-gray-700">{data.born.slice(0, 10)}</p>}
        {data.city && <p className="text-gray-700">{data.city}</p>}
        {data.university && <p className="text-gray-700">{data.university}</p>}
      </div>

      <div className="flex flex-col">
        {!isUserOnOwnProfile && (
          <button
            // onClick={handleAddFriend}
            className="block cursor-pointer bg-stone-500 text-base text-white py-2 px-4 hover:bg-blue-600 duration-300"
          >
            Add friend
          </button>
        )}
        {/* {isUserOnOwnProfile && <Form type="Write" apiUrl="api/create_post/" />} */}

        {posts.length === 0 && <p>No posts found.</p>}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
