"use client";
// import Post from "./Post";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProfilePage = ({ params }) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.API}/user/${params.id}`);
      const userData = await res.json();
      setUserData(userData);
    };
    fetchUser();
  }, []);

  return (
    <Profile name={userData.name} data={userData} id={params.id}></Profile>
  );
};

export default ProfilePage;
