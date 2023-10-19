"use client"
import { categoriesData } from "@/data"
import { useState } from "react"
import Link from "next/link"

const CreatePostForm = () => {

  const [ links, setLinks] = useState<string[]>([])
  const [ linkInput, setLinkInput] = useState<string>("")

  const addLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (linkInput.trim() !== "") {
      setLinks((prev) => [...prev, linkInput])
      setLinkInput("")
    }
    
  }

  const deleteLink = (index: number) => {
    setLinks(prev => prev.filter((_,i) => i !== index))
  }

  console.log(links)

  return (
    <div>
      <h2>Create Post</h2>

      <form className="flex flex-col gap-2">
        <input 
          type="text" 
          placeholder="Title" 
          className=" px-4 py-2 border border-slate-700 rounded-md"
          
        />
        <textarea placeholder="Content" className=" px-4 py-2 border border-slate-700 rounded-md h-36"/>

        {links && links.map((link, index) => (
          <div key={index} className="flex flex-row items-center gap-4">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>

            </span>
            <Link className="text-purple-500 font-bold" href={link}>{link}</Link>

            <span 
              className="cursor-pointer"
              onClick={() => deleteLink(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>

            </span>
          </div>
        ))}

        <div className="flex flex-row gap-2">
          <input 
            type="text" 
            placeholder="Paste the link and click on Add" 
            className=" px-4 py-2 border border-slate-700 rounded-md flex-1"
            value={linkInput}
            onChange={e => setLinkInput(e.target.value)}
          />
          <button 
            onClick={addLink}
            className="flex gap-2mitems-center px-4 py-2 bg-slate-200  rounded-md"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>

            Add
          </button>
        </div>

        <select className="p-3 rounded-md border ">
          <option value="">Select a category</option>
          {categoriesData && categoriesData.map(item => (
            <option key={item.id} value={item.name}>{item.name}</option>
          ))}
        </select>

        <button type="submit" className="px-4 py-2 bg-slate-700 text-white rounded-md">Create Post</button>

        <div className="p-2 text-red-500 font-bold">Error Message</div>
      </form>
    </div>
  )
}

export default CreatePostForm