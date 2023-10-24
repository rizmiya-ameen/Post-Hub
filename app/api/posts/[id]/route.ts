import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET (req: Request, {params} : {params : {id: string}}) {
  try {
    const id = params.id;
    //console.log(id)

    //we get a specific post based on id
    const post = await prisma.post.findUnique({where: { id }})
    return NextResponse.json(post) 

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Couldnt fetch post"}, {status: 500})
  }
}

export async function PUT(req: Request, {params} : {params : { id: string}}) {

  //to check whether the author is authenticated
  const session = getServerSession(authOptions)

   if (!session) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401})
   }

  const {title, content, links, imageUrl, publicId, catName} = await req.json();
  const id = params.id

  try {
     //we edit the post based on id
    const post = await prisma.post.update({
      where: { id },
      data: {
        title, content, links, imageUrl, publicId, catName
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error"}, {status: 500})
  }
}

export async function DELETE (req: Request, {params} : {params : { id : string }}) {

  //to check whether the author is authenticated
  const session = getServerSession(authOptions)

   if (!session) {
      return NextResponse.json({error: "Not authenticated"}, {status: 401})
   }

  const id = params.id

  try {
    const post =  await prisma.post.delete({where: { id }})
    //we delete the post based on id
    return NextResponse.json(post)

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "error deleting the post"})
  }
}