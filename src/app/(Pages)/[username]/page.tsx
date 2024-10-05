"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
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
      <div className=" flex gap-4 text-black w-[80%] mt-6 ">
        <div className="suppoter  w-1/2 p-10">
        <h1 className="text-2xl font-bold py-4 uppercase">Suppoters </h1>
          <ul>
            {users.map((items) => (

              <>
              <div key={items.id}  className="flex items-center justify-between">
                <div>
                  <li className="py-4 flex gap-2 items-center" key={items.id}><FaRegUserCircle className="w-6 h-6"/> {items.username} </li>
                </div>
                <div>{items.payment}</div>
              </div>
                <div className="border-b border-black"></div>
              </>
             
            ))}
          </ul>
        </div>
        <div className=" w-1/2 p-10">
          <h1 className="text-2xl uppercase font-bold py-4">Make a Payment</h1>
          <div className="flex flex-col gap-3">
            {/* create a three input filed first payment amount second username third email and then make a Button */}
            <Input type="text" placeholder="Amount" className="p-3 rounded-md" />
            <Input type="text" placeholder="Username" className="p-3 rounded-md" />
            <Input type="text" placeholder="Email" className="p-3 rounded-md" />
            <Button className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold">Make a Payment</Button>
          </div>
          {/* choose for this amount create a button */}
          <div className="flex  gap-3 mt-4">
            <Button className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2">10$</Button>
            <Button className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2">20$</Button>
            <Button className="text-white bg-black hover:bg-slate-800 p-3 rounded-md shadow-xl font-bold px-4 py-2">30$</Button>
          </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default page;
{/* <FaRegUserCircle /> */}