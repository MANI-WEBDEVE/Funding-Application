import React from "react";
import "@/app/globals.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-start gap  p-6 h-[60vh] mt-2">
        <h1 className="text-8xl font-bold uppercase amaz w-[70%]">Welcome to Join <br/>me a Chai <br/> fans!</h1>
        <div className="flex items-center justify-start  ">
        <Image src={"/logo.png"} alt="logo" width={350} height={350} />

        </div>
      </div>
      <div className="flex items-center justify-start px-7 mt-6">
        <button type="button" className="text-white bg-[#050708] hover:text-black hover:font-semibold  hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 rounded-lg text-md transition-all duration-500 px-7 py-3 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 font-semibold ">Start Now</button>
        <button type="button" className="text-white bg-[#050708] hover:text-black hover:font-semibold  hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 rounded-lg text-md transition-all duration-500 px-7 py-3 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 font-semibold ">Read More</button>
      </div>
    </>
  );
}
