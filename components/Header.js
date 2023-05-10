"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { NextAuth, nextAuthClient } from "next-auth/next";

const Header = () => {
  const { data: session } = useSession();
  const [userName, setUserName] = useState(session?.user?.name || "");

  useEffect(() => {
    setUserName(session?.user?.name || "");
  }, [session]);

  return (
    <header className="sticky bg-black text-white py-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-3xl font-bold">Козлов АМ тест</div>
        <div className="">
          {session?.user ? (
            <div className="flex items-center relative">
              <div className="p-2 uppercase font-bold">{userName}</div>

              <button
                onClick={() => signOut()}
                className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center ">
              <Link
                href="/login"
                className="block cursor-pointer bg-stone-500 text-base text-white  py-2 px-4 hover:bg-blue-600 duration-300"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
