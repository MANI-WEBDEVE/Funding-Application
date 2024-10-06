"use client";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session, status } = useSession();

if (status === "loading") {
  return <p>Loading...</p>;
}

if (session) {
  console.log(session.user?.name); // Should show the username
  console.log(session.user?.email); // Should show the email
} else {
  console.log("No session found");
}
  return (
    <>
      <nav className=" p-5 flex justify-between items-center text-black mx-auto ">
        <div className="text-3xl font-bold"><Link href={'/'}>CHAI</Link></div>
        <div className="flex items-center justify-end w-full ">
          <ul className="flex  gap-6 font-semibold mr-7  h-6">
            <li className="hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 ">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 ">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 ">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex gap-4 items-center justify-center">
            {session ? (
              <>
                {session.user?.image ? (
                  <>
                    <div className="px-3 rounded-full  ">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                          <img
                            src={session.user?.image}
                            className="w-14  rounded-full border-[1px] border-black object-cover "
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            {session.user?.name}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={"/dashboard"}>DashBoard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/${session.user?.name}`}>Your Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button onClick={() => signOut()}>Logout</Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-3 rounded-full  ">
                      <DropdownMenu >
                        <DropdownMenuTrigger >
                          <p>{session.user?.name?.charAt(0).toUpperCase()}</p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            {session.user?.name}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={"/dashboard"}>DashBoard</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {session.user?.email}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button onClick={() => signOut()}>Logout</Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                )}
              </>
            ) : (
              <button className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-2 border hover:border-black transition-all ease-in-out duration-300 rounded-lg ">
                <Link href="/login">Login</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
// <div className="w-8 h-8 rounded-full bg-slate-600 text-black">
//  {session.user?.name?.charAt(0).toUpperCase()}
//  </div>
