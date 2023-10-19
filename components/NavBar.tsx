"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const NavBar = () => {

  const { status } = useSession()

  return (
    <nav className="flex justify-between pb-4 border-b mb-4">
      <div>
        <Link href="/">Posting Site</Link>
      </div>

      {
        status === 'authenticated' ? 
        (
          <div>
            <button 
              onClick={() => signOut()}
              className="bg-slate-300 px-4 py-2 rounded-md font-semibold hover:scale-105 transition"
            >
              Sign Out
            </button>
          </div>
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