import React from "react";
import "@/app/globals.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-start gap-7  p-6 h-[60vh] mt-6">
        <h1 className="text-8xl font-bold uppercase amaz">Welcome <br/>to Give Me<br/> a Chai</h1>
        <div className="flex items-center justify-center w-full">
        <Image src={"/logo.png"} alt="logo" width={330} height={330} />

        </div>
      </div>
    </>
  );
}
