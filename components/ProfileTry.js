"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  QueryClientProvider,
  useQuery,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Form from "./Form";
import Post from "./Post";

const Profile = ({ name, udata, id }) => {
  const { data: session } = useSession();
  const token = udata.token;
  const [aposts, asetPosts] = useState([]);
  const [post, setPost] = useState("");
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      console.log(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const { data: posts = [] } = useQuery(["posts"], async () => {
    const res = await axios.get(`http://localhost:4000/api/users_posts/${id}`);
    console.log(res);
    return res.data;
  });

  const queryClient = new QueryClient();

  const { mutate: createPost } = useMutation(
    async () => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("text", post);
      formData.append("creator", id);
      const res = await axios.post(
        `http://localhost:4000/api/create_post/`,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(res, res.data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        setPost("");
        asetPosts((posts) => [data, ...posts]);

        queryClient.invalidateQueries("posts");
      },
      onError: (error) => {
        console.log(error);
        // alert("Error while saving the post. Please try again later.");
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", post);
    formData.append("creator", id);
    createPost(formData);
  };

  const handleNewPostChange = (event) => {
    setPost(event.target.value);
  };

  const isUserOnOwnProfile = session && session.user.email === udata.email;

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h2>{name}</h2>
        {isUserOnOwnProfile && (
          <section className="w-full min-w-96 max-w-full flex-start flex-col">
            <form
              onSubmit={handleSubmit}
              className=" w-full max-w-2xl flex flex-col gap-7   "
            >
              <textarea
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Write your post here"
                rows={7}
                required
                className="focus:outline-none focus:ring-2 focus:ring-blue-500  p-3 border"
              />
              <div className=" mb-5 gap-4">
                <div className="flex">
                  <label className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      name="myImage"
                      onChange={uploadToClient}
                    />
                    Upload Image
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2  bg-stone-600 text-base text-white disabled:bg-gray-400 disabled:cursor-not-allowed  hover:bg-green-600"
                  >
                    Send
                  </button>
                </div>
                <div className="w-32 inline-block mt-5">
                  <img src={createObjectURL} />
                </div>
              </div>
            </form>
          </section>
        )}
        {posts.length === 0 && <p>No posts </p>}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </QueryClientProvider>
  );
};

export default Profile;
