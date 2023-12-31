//method for adding data to the database

import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {

   //to check whether the author is authenticated
   const session = await getServerSession(authOptions)

   if (!session) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401})
   }

   const {title, content, links, imageUrl, publicId, selectedCategory} = await req.json();

   const authorEmail= session?.user?.email as string


   if (!title || !content) {
      return NextResponse.json({error: "Title and Content are required"}, {status: 500})
   }

   try {
      const newPost = await prisma.post.create({ data: {
         title, content, links, imageUrl, publicId, catName: selectedCategory, authorEmail,
      }})

      console.log("post created")
      return NextResponse.json(newPost)
   } catch (error) {
      return NextResponse.json("couldnt create post")
   }
}

export async function GET () {
   try {
      const posts = await prisma.post.findMany({
         include: {author: {select: {name: true}}},
         orderBy: {
            createdAt: 'desc',
         }
      });
      //findmany will get all the posts
      //we also need to get author name, which is inside another model called User


      //latest post will be displayed first
      return NextResponse.json(posts)

   } catch (error) {
      console.log(error)
      return NextResponse.json({message: "Some error occured"}, {status: 500})
   }
}