"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!data.error) {
        router.push("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (e) {
      setError("Invalid username or password");
      return;
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center max-w-sm m-auto bg-white py-8 px-4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-medium mb-4">Login</h1>
        {error && <div className="text-red-500">{error}</div>}
        <form className="w-full" onSubmit={submitHandler}>
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
          <div className="justify-between flex items-center">
            <button className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300">
              Login
            </button>

            <Link
              href="/register"
              className="text-blue-500 text underline hover:no-underline"
            >
              Regiser
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
