import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

type Props = {}

function Header({}: Props) {
  return (
    <header className='flex justify-between max-w-7xl mx-auto'>
        <div className='px-10 py-5 flex items-center space-x-20'>
         <Link href="/posts">
           <Image
            className="object-contain cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/51/51221.png"
            width={50}
            height={50}
            alt="/"
           />
         </Link>
         <div className='hidden md:inline-flex items-center space-x-5 font-semibold'>
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className='text-white bg-red-400 rounded-full px-4 py-1'>Follow</h3>
         </div>
        </div>

        <div className='flex space-x-5 items-center text-red-600 font-semibold px-20'>
          <h3>Sign In</h3>
          <h3 className='border border-red-400 px-4 py-1 rounded-full'>Get Started</h3>
        </div>

    </header>
  )
}

export default Header;