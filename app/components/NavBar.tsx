"use client"

import Image from 'next/image';
import React, { Children, FC, useState } from 'react'
import imgLogo from "@/public/logo.png";
import imgProfile from "@/public/profileImg.png";
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

interface navbarProps {
  children: React.ReactNode
}

const NavBar: FC<navbarProps> = ({ children }) => {
    const router = useRouter();
    const path = usePathname()
    const handleButtonClick = (path: string) => {
        router.push(path)
      };
  return (
    <div className='h-screen w-full flex flex-col pt-10 px-10'>
      <div className="bg-white flex items-center rounded-2xl">
          <div className="w-fit">
            <Image className="ml-10 mr-10" src={imgLogo} alt="logo" height={80} />
          </div>
          <div className="w-full flex justify-between">
            <div
              className={clsx("w-full hover:bg-blue-400 p-10 text-center font-bold cursor-pointer", path== '/' && 'bg-neutral-300')}
              onClick={() => handleButtonClick("/")}
            >
              Matches
            </div>
            <div
              className={clsx("w-full hover:bg-blue-400 p-10 text-center font-bold cursor-pointer", path== '/pools' && 'bg-neutral-300')}
              onClick={() => handleButtonClick("/pools")}

            >
              Pools
            </div>
            <div
              className={clsx("w-full hover:bg-blue-400 p-10 text-center font-bold cursor-pointer",path== '/knockout' && 'bg-neutral-300')}
              onClick={() => router.push('/predictions')}
            >
              Knockout
            </div>
            <div
              className={clsx("w-full hover:bg-blue-400 p-10 text-center font-bold cursor-pointer", path== '/predictions' && 'bg-neutral-300')}
              onClick={() => router.push('/predictions')}
            >
              Predictions
            </div>
          </div>
          <div className="right-image">
            <button>
              <Image
                className="ml-10 mr-10"
                src={imgProfile}
                alt="profilePic"
                height={60}
              />
            </button>
          </div>
        </div>
        {children}
      </div>
  )
}

export default NavBar;