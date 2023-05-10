"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useSession } from "next/router";

const Regiser = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post("http://localhost:4000/users/", {
        name,
        email,
        password,
      });

      if (data) {
        router.push("/login");
      }
    } catch (e) {
      setErrorMessage(`${e}`);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center max-w-sm m-auto bg-white py-8 px-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-medium mb-4">Regiser</h1>
        <div className="text-red-800">{errorMessage}</div>
        <form className="w-full" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm"
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full py-2 px-3 border border-gray-400 rounded-md shadow-sm"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300">
              Regiser
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Regiser;
