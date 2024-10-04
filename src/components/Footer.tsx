import { FacebookIcon, Instagram, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-[4.1rem] border-t dark:border-gray-600 p-4 ">
     
      <div className="flex space-x-6 mt-2">
        <a href="https://twitter.com/givemeachai" target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="w-6 h-6 dark:text-black" />
        </a>
        <a href="https://www.facebook.com/givemeachai" target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="w-6 h-6 dark:text-black" />
        </a>
        <a href="https://www.instagram.com/givemeachai/" target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="w-6 h-6 dark:text-black" />
        </a>
      </div>
      <p className="text-sm  mt-4">Copyright © 2022 Give Me a Chai. All rights reserved.</p>
    </footer>
  )
}

export default Footer
