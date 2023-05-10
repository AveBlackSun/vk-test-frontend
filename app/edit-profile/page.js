"use client";
import { useSession, mutate } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const EditProfilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    born: "",
    city: "",
    university: "",
  });

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setFormData({
        name: session.user.name,
        email: session.user.email,
        born: session.user.born || "",
        city: session.user.city || "",
        university: session.user.university || "",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(session.user._id);
    if (!session.user || !session.user._id) {
      console.log("Session is not set. Please login before uploading a file.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user-photo/${session.user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      session.user.image = response.data.imgPath;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete formData["file"];
    console.log(session.user._id);
    try {
      const response = await axios.patch(
        `http://localhost:4000/user/${session.user._id}`,
        formData
      );
      console.log(response.data);
      session.user.name = formData.name;
      session.user.email = formData.email;
      session.user.born = formData.born;
      session.user.city = formData.city;
      session.user.university = formData.university;
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          name="born"
          placeholder="Date of Birth"
          value={formData.born}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="university"
          placeholder="University"
          value={formData.university}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileUpload}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {/* <img src={createObjectURL} alt="photo" children="w-full" /> */}
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfilePage;
