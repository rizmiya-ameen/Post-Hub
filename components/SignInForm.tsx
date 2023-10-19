"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

const SignInForm = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Sign in</h1>

      <div className="m-4 p-4 flex flex-col items-center justify-center gap-4">
        <button 
          onClick={() => signIn("github")}
          className="flex items-center border p-4 rounded-md gap-4 hover:bg-slate-100/50 transition"
        > 
          <span>
            <Image 
              src={"/github-logo.svg"}
              alt='GitHub Logo'
              width={30}
              height={30}
            />
          </span>
          Sign In with GitHub
        </button>


        <button 
          onClick={() => signIn("google")}
          className="flex items-center border p-4 rounded-md gap-4 hover:bg-slate-100/50 transition"
        > 
          <span>
            <Image 
              src={"/google-logo.svg"}
              alt='Google Logo'
              width={30}
              height={30}
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </div>
  )
}

export default SignInForm