import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Form = ({ type }) => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.user.token;

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", post);
    formData.append("creator", session?.user._id);

    try {
      const response = await fetch(`http://localhost:4000/api/save/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full min-w-96 max-w-full flex-start flex-col">
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-2xl flex flex-col gap-7   "
      >
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write your post here"
          rows={8}
          required
          className="focus:outline-none focus:ring-2 focus:ring-blue-500  p-3 border"
        />

        <div className=" mb-5 gap-4">
          <div className="flex">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2  bg-stone-600 text-base text-white disabled:bg-gray-400 disabled:cursor-not-allowed  hover:bg-green-600"
            >
              {submitting ? `${type}ing...` : type}
            </button>
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
          </div>

          <div className="w-32 inline-block mt-5">
            <img src={createObjectURL} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Form;
