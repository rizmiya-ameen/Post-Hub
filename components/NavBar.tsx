"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"]})

const NavBar = () => {

  const { status, data: session } = useSession()
  const [ isPopupVisible, setIsPopupVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      //checking whether popupRef is set to a DOM element, then checking, if the click occured was outside the popupRef, and if its true setting the value to false
      if(popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false)
      }
    };

    document.addEventListener("click", handleClickOutside)

    if(!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isPopupVisible])



  return (
    <nav className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href="/" className={`${redressed.className} font-bold text-4xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-transparent bg-clip-text`}>PostHub</Link>
        <p className="font-light text-[11px] text-slate-600">Tech Tales Unleashed</p>
      </div>

      {
        status === 'authenticated' ? 
        (
          <>
            <div ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopupVisible ? "flex" : "hidden"}`}>

              <div className="font-bold">{session?.user?.name}</div>

              <div>{session?.user?.email}</div>

              <Link href='/dashboard' className="hover:underline" onClick={() => setIsPopupVisible(false)}> 
                Dashboard
              </Link>

              <Link href='/create-post' className="hover:underline" onClick={() => setIsPopupVisible(false)}> 
                Create Post
              </Link>

              <button 
                onClick={() => signOut()}
                className="bg-slate-300 px-4 py-2 rounded-md font-semibold hover:scale-105 transition"
              >
                Sign Out
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <Link 
                href="create-post"
                className="hidden md:flex gap-2 items-center mr-6"
              >
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>

                <span>Create new</span>
              </Link>

              <Image 
                src={session?.user?.image || ""}
                alt="Profile Image"
                width={36}
                height={36}
                className="rounded-full cursor-pointer"
                onClick={() => setIsPopupVisible(prev => !prev)}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center">
           <Link href='/sign-in'>
              <button className="bg-slate-300 px-4 py-2 rounded-md font-semibold hover:scale-105 transition">Sign In</button>
            </Link>
          </div>
        )
      }

      
    </nav>
  )
}

export default NavBar