import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-black p-5 flex justify-between items-center '>
            <div className='text-3xl font-bold'>
                <img src="src\app\public\logo.png" alt="" /> CHAI
            </div>
            <ul className='flex gap-6 '>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/signup">SignUp</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
