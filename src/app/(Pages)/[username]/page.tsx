"use client";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { username: string } }): JSX.Element => {
  const users = [
    { username: "johnDoe", id: 1, payment: 1000 },
    { username: "janeDoe", id: 2, payment: 2000 },
    { username: "bobSmith", id: 3, payment: 3000 },
    { username: "aliceJohnson", id: 4, payment: 4000 },
    { username: "mikeDavis", id: 5, payment: 5000 },
  ];

  return (
    <>
      <div className="cover w-full relative text-black">
        <img
          className="w-full h-[350px] object-cover"
          src="https://camo.githubusercontent.com/5119ee303e5e49cdf23def653b737bede0da49a859a34714d62d9ab518afbbb2/68747470733a2f2f63646e2e6472696262626c652e636f6d2f75736572732f313136323037372f73637265656e73686f74732f333834383931342f70726f6772616d6d65722e676966"
          alt=""
        />
        <div className="absolute -bottom-[13%] right-[46%] border-[1px] border-black rounded-full">
          <img
            src="/logo.png"
            className="rounded-full"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-2 my-12">
        <div className="font-bold text-xl text-center">@{params.username}</div>
        <div className="text-sm font-light text-gray-600">
          We are building a funding app for content creators.
        </div>
        <div className="text-sm text-gray-600">
          9000 members . 200 posts . $15,430/release
        </div>
      </div>
      <div className=" flex justify-center items-center gap-4 text-black w-[80%]">
        <div className="listUser bg-slate-100 p-4">
          <ul>
            {users.map((items) => (
             <li key={items.id}>{items.username} <span>{items.payment}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-red-900"></div>
      </div>
    </>
  );
};

export default page;
