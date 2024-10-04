"use client"
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
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
            <nav className=' p-5 flex justify-between items-center text-black mx-auto '>
                <div className='text-3xl font-bold'>
                    CHAI
                </div>
                <div className='flex items-center justify-end w-full '>

                <ul className='flex  gap-6 font-semibold m-2  h-6'>
                    <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 ' ><Link href="/">Home</Link></li>
                    <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/about">About</Link></li>
                    <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/contact">Contact</Link></li>

                </ul>
                </div>
                <div>
                    <div className='flex gap-2'>

                        <button className='bg-transparent hover:bg-[#050708]/30 text-black font-semibold hover:text-white py-2 px-2 border hover:border-black transition-all ease-in-out duration-300 rounded-lg'><Link href="/signup">SignUp</Link></button>
                        <button className='bg-transparent hover:bg-[#050708]/30 text-black font-semibold hover:text-white py-2 px-2 border hover:border-black transition-all ease-in-out duration-300 rounded-lg'><Link href="/login">Login</Link></button>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
