"use client";
import { Facebook } from "lucide-react";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";

const page = () => {
    const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <div className="bg-red- py-16 container mx-auto ">
        <h2 className="text-4xl font-bold uppercase text-center ">
          Let Connect <span className="font-extrabold">CHAI</span> Fans
        </h2>
        <div className="flex gap-4 flex-col items-center justify-center mt-8    ">
          <button
            type="button"
            className=" text-black  font-medium rounded-lg w-80 text-md px-6 py-1 text-center inline-flex items-center  me-2 mb-2 border-[1px] border-black"
          >
            <Facebook size={29} color="#0060fa" />
            Sign in with Facebook
          </button>
          <button
            type="button"
            className="text-white bg-black   font-medium rounded-lg w-80 text-md px-8 py-2 text-center inline-flex items-center gap-2  me-2 mb-2"
          >
            <BsTwitterX className="fill-white w-6 h-6" />
            Sign in with Twitter
          </button>
          <button 
            onClick={() => signIn("github")}
            type="button"
            className="text-white bg-[#24292F]   font-medium rounded-lg w-80 text-md px-8 py-2 text-center inline-flex items-center gap-2   me-2 mb-2"
          >
            <FaGithub className="w-6 h-6" />
            Sign in with Github
          </button>
          <button
            type="button"
            className="text-black border-[1px] border-black gap-2   font-medium rounded-lg w-80 text-md px-7 py-2 text-center inline-flex items-center me-2 mb-2"
          >
            <FcGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
