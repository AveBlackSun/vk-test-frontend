"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
  return <Form type="Create" apiUrl="api/create_post/" />;
};

export default CreatePost;
