import { Facebook } from "lucide-react";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
const page = () => {
  return (
    <>
      <div className="bg-red- py-16 text-center container mx-auto ">
        <h2 className="text-4xl font-bold uppercase">
          Let Connect <span className="font-extrabold">CHAI</span> Fans
        </h2>
        <div className="flex gap-4 flex-col items-center justify-center mt-4">
          <button
            type="button"
            className=" text-black  font-medium rounded-lg text-md px-6 py-1 text-center inline-flex items-center  me-2 mb-2 border-[1px] border-black"
          >
            <Facebook size={29} color="#0060fa" />
            Sign in with Facebook
          </button> 
          <button
            type="button"
            className="text-white bg-black   font-medium rounded-lg text-md px-8 py-2 text-center inline-flex items-center gap-2  me-2 mb-2"
          >
            <BsTwitterX className="fill-white w-6 h-6" />
            Sign in with Twitter
          </button>
          <button
            type="button"
            className="text-white bg-[#24292F]   font-medium rounded-lg text-md px-8 py-2 text-center inline-flex items-center gap-2   me-2 mb-2"
          >
            <FaGithub className="w-6 h-6" />
            Sign in with Github
          </button>
          <button
            type="button"
            className="text-black border-[1px] border-black gap-2   font-medium rounded-lg text-md px-7 py-2 text-center inline-flex items-center me-2 mb-2"
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
