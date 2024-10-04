import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className=' p-5 flex justify-between items-center text-black mx-auto'>
            <div className='text-3xl font-bold'>
              CHAI
            </div>
            <ul className='flex gap-6 font-semibold m-2  h-6'>
                <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 ' ><Link href="/">Home</Link></li>
                <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/about">About</Link></li>
                <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/contact">Contact</Link></li>
                <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/signup">SignUp</Link></li>
                <li className='hover:border-black transition-all ease-in-out duration-300  hover:border-b-2 '><Link href="/login">Login</Link></li>
            </ul>
        </nav>
    ) 
}

export default Navbar
